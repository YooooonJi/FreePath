package com.ssafy.project.service.route;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.URL;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.StringTokenizer;

import javax.net.ssl.HttpsURLConnection;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.ssafy.project.model.api.ApiProperties;
import com.ssafy.project.model.route.RouteFindRequest;

@Service
public class FinalRouteServiceImpl implements FinalRouteService{
	
	@Autowired
	private ApiProperties apiProperties;

	/*
	 * 막차 계산하기 위한 루틴 
	 * 1. 각 경로의 전체 경로 확인 O 
	 * 2. 마지막 경로부터 확인하는데 마지막 도로 경로일 경우 제외 O 
	 * 3. 경로마다 출발지에서 도착지까지 가는 막차 시간 구하기 
	 * 4. 각 경로의 가장 늦게 출발할 수 있는 시간 저장 
	 * 4-1. 지하철 막차 시간 구하기
	 * 4-2. 버스 막차 시간 구하기
	 * 4-3. 도로 시간은 현재 시간에서 빼기
	 * 5. 가장 늦게 출발할 수 있는 순으로 정렬 => 가장 늦게 탈 수 있는 경로 전달(마지막 차가 동일한 경우에는 더 짧은 경우를 전달)
	 * sectionTime => 각 구간 이동 소요 시간 
	 * trafficType => 1-지하철, 2-버스, 3-도보
	 * wayCode => 1: 상행, 2: 하행
	 */
	@Override
	public ResponseEntity<Map<String, Object>> findLast(RouteFindRequest routeFindRequest) {

		HttpStatus status = null;
		Map<String, Object> resultMap = new HashMap<String, Object>();

		final String openUrl = "https://api.odsay.com/v1/api/searchPubTransPathT?lang=0&SX="
				+ routeFindRequest.getStartX() + "&SY=" + routeFindRequest.getStartY() + "&EX="
				+ routeFindRequest.getEndX() + "&EY=" + routeFindRequest.getEndY() + "&apiKey="
				+ apiProperties.getKey();

		try {
			URL url = new URL(openUrl);

			HttpsURLConnection urlConnection = (HttpsURLConnection) url.openConnection();
			urlConnection.setRequestMethod("GET");

			BufferedReader br = new BufferedReader(new InputStreamReader(urlConnection.getInputStream(), "UTF-8"));

			JSONParser parser = new JSONParser();
			JSONObject obj = (JSONObject) parser.parse(br);
			JSONObject response = (JSONObject) obj.get("result");
			JSONArray path = (JSONArray) response.get("path");

			Calendar cal = Calendar.getInstance(); // 오늘 날짜 => 요일을 확인하기 위해서
			int dayOfWeek = cal.get(Calendar.DAY_OF_WEEK); // 1: 일요일 ~ 7: 토요일

			int lastOneIdx = 0; // 가장 늦게 탈 수 있는 경로의 번호
			int lastOneTime = Integer.MIN_VALUE; // 가장 늦게 탈 수 있는 경로의 출발 시간 (1245 => 12시 45분 출발)

			for (int i = 0; i < path.size(); i++) {
//				System.out.println("===============" + i + "=================");
				JSONObject paths = (JSONObject) path.get(i);

				/* pathType => 1: 지하철, 2: 버스, 3: 지하철&버스 --> 이후 개인화 과정에서 필요 */
				int pathType = Integer.parseInt(String.valueOf(paths.get("pathType")));
//				System.out.println("pathType: " + pathType);

				/* 경로의 전반적인 정보 */
				JSONObject info = (JSONObject) paths.get("info");
//				System.out.println("info: " + info);

				/* 각 전체 경로 확인 */
				JSONArray subPath = (JSONArray) paths.get("subPath");
				int subPathStartTime = 2800; // 해당 경로의 출발 시간 => 막차 시간이기 때문에 시작 시간을 새벽 4시로 우선 설정

				for (int j = subPath.size() - 1; j >= 0; j--) {
					JSONObject smallSubPath = (JSONObject) subPath.get(j);
					int trafficType = Integer.parseInt(String.valueOf(smallSubPath.get("trafficType")));

					if (j == subPath.size() - 1 && trafficType == 3) // 마지막 도보 경로 Skip
						continue;

//					System.out.println("smallSubPath : " + smallSubPath);

					if (trafficType == 1) { // 지하철
//						System.out.println("-------------지하철-------------");
						int subwayStartId = Integer.parseInt(String.valueOf(smallSubPath.get("startID"))); // 출발역의 ID
						int subwayCode = Integer.parseInt(String.valueOf(smallSubPath.get("wayCode"))); // 상, 하행 정보

						/* 지하철 막차의 출발 시간 반환 */
						subPathStartTime = findSubwayStartTime(subwayStartId, subwayCode, subPathStartTime, dayOfWeek);
					} else if (trafficType == 2) { // 버스
//						System.out.println("-------------버스-------------");

					} else if (trafficType == 3) { // 도보
//						System.out.println("-------------도보-------------");
						subPathStartTime -= Integer.parseInt(String.valueOf(smallSubPath.get("sectionTime")));
					}
				}

				/* 가장 늦게 탈 수 있는 경로 확인 */
				if (lastOneTime < subPathStartTime) {
					lastOneIdx = i;
					lastOneTime = subPathStartTime;
				}
			}

			if (lastOneTime >= 2400) lastOneTime -= 2400;
			resultMap.put("lastTime", lastOneTime);
			resultMap.put("lastOne", (JSONObject) path.get(lastOneIdx));

			urlConnection.disconnect();
			status = HttpStatus.OK;
		} catch (Exception e) {
			e.printStackTrace();
		}

		return new ResponseEntity<Map<String, Object>>(resultMap, status);
	}
	
	public int findSubwayStartTime(int subwayStartId, int subwayCode, int startTime, int dayOfWeek) {
		
//		System.out.println("startTime : " + startTime);
		
		StringTokenizer st = null;
		int newTime = 0;

		final String subwayStationInfoOpenUrl = "https://api.odsay.com/v1/api/subwayTimeTable?lang=0&stationID="
				+ subwayStartId + "&wayCode=" + subwayCode + "&apiKey=" + apiProperties.getKey();

		try {
			URL subwayUrl = new URL(subwayStationInfoOpenUrl);

			HttpsURLConnection subwayUrlConnection = (HttpsURLConnection) subwayUrl.openConnection();
			subwayUrlConnection.setRequestMethod("GET");

			BufferedReader br = new BufferedReader(
					new InputStreamReader(subwayUrlConnection.getInputStream(), "UTF-8"));

			JSONParser parser = new JSONParser();
			JSONObject obj = (JSONObject) parser.parse(br);
			JSONObject response = (JSONObject) obj.get("result");

			/* 지하철 전체 경로 확인 */
			/* 요일 구분 */
			JSONObject subwayList = null;
			if (dayOfWeek == 1) { // 일요일
				subwayList = (JSONObject) response.get("SatList");
			} else if (dayOfWeek == 7) { // 토요일
				subwayList = (JSONObject) response.get("SunList");
			} else { // 평일
				subwayList = (JSONObject) response.get("OrdList");
			}

			/* 상, 하행 구분 */
			JSONObject wayList = null;
			if (subwayCode == 1) { // 상행
				wayList = (JSONObject) subwayList.get("up");
			} else if (subwayCode == 2) { // 하행
				wayList = (JSONObject) subwayList.get("down");
			}
//			System.out.println(wayList.toString());

			/* 가장 마지막 시간의 지하철 시간 받아오기 */
			JSONArray timeList = (JSONArray) wayList.get("time");
			o:for (int i = timeList.size() - 1; i >= 0; i--) {
				JSONObject lastTimeList = (JSONObject) timeList.get(i);

				int hour = Integer.parseInt(String.valueOf(lastTimeList.get("Idx"))); // 시간
//				System.out.println("hour : " + hour);

				if (hour <= (startTime / 100)) { // 우선 동일한 시간인 경우를 확인
					if ((startTime / 100) == hour && (startTime % 100) == 0) // 시간이 같은데 0분이 경우는 무조건 전 시간 가장 늦은 애로!
						continue;

					// 1. 시 정하기
					newTime += hour * 100;

					// 2. 분 정하기
					String minute = (String) lastTimeList.get("list");
//					System.out.println("minute : " + minute);
					st = new StringTokenizer(minute, " ");

					ArrayList<Integer> minuteList = new ArrayList<Integer>();
					while (st.hasMoreTokens()) {
						minuteList.add(Integer.parseInt(st.nextToken().substring(0, 2)));
					}
					Collections.sort(minuteList, Collections.reverseOrder()); // 내림차순 정렬

					if ((startTime % 100) == 0) {
						newTime += minuteList.get(0);
						break o;
					} else {
						for (int j = 0; j < minuteList.size(); j++) {
							if((startTime % 100) >= minuteList.get(j)) {
								newTime += minuteList.get(j);
								break o;
							}
						}
					}

				}
			}

			subwayUrlConnection.disconnect();
		} catch (Exception e) {
			e.printStackTrace();
		}

//		System.out.println("newTime : " + newTime);
		return newTime;
	}
}
