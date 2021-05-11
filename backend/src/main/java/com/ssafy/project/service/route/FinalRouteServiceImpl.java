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
public class FinalRouteServiceImpl implements FinalRouteService {

	@Autowired
	private ApiProperties apiProperties;

	/*
	 * 막차 계산하기 위한 루틴 
	 * 1. 각 경로의 전체 경로 확인 O
	 * 2. 마지막 경로부터 확인하는데 마지막 도로 경로일 경우 제외 O
	 * 3. 경로마다 출발지에서 도착지까지 가는 막차 시간 구하기 O
	 * 4. 각 경로의 가장 늦게 출발할 수 있는 시간 저장 O
	 * 4-1. 지하철 막차 시간 구하기 O 
	 * 4-2. 버스 막차 시간 구하기 O
	 * 4-3. 도로 시간은 현재 시간에서 빼기 O 
	 * 5. 가장 늦게 출발할 수 있는 순으로 정렬 => 가장 늦게 탈 수 있는 경로 전달(마지막 차가 동일한 경우에는 더 짧은 경우를 전달) O 
	 * sectionTime => 각 구간 이동 소요 시간 
	 * trafficType => 1-지하철, 2-버스, 3-도보 
	 * wayCode => 1: 상행, 2: 하행
	 */
	@Override
	public ResponseEntity<Map<String, Object>> findLast(RouteFindRequest routeFindRequest) {

		HttpStatus status = null;
		Map<String, Object> resultMap = new HashMap<String, Object>();

		final String openUrl = "https://api.odsay.com/v1/api/searchPubTransPathT?lang=0&SX=" + routeFindRequest.getStartX() + "&SY=" + routeFindRequest.getStartY() + "&EX="
				+ routeFindRequest.getEndX() + "&EY=" + routeFindRequest.getEndY() + "&apiKey=" + apiProperties.getKey();

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
//					System.out.println("smallSubPath : " + smallSubPath);
					int trafficType = Integer.parseInt(String.valueOf(smallSubPath.get("trafficType")));

					/* 모든 TrafficType에 대해서 구간 시간을 뺀 뒤 그 시간에 탈 수 있는 막차를 구해야함! */
					subPathStartTime -= Integer.parseInt(String.valueOf(smallSubPath.get("sectionTime")));
					if (subPathStartTime % 100 >= 60)
						subPathStartTime -= 40;
					
					if (trafficType == 1) { // 지하철
//						System.out.println("-------------지하철-------------");
						int subwayStartId = Integer.parseInt(String.valueOf(smallSubPath.get("startID"))); // 출발역의 ID
						int subwayCode = Integer.parseInt(String.valueOf(smallSubPath.get("wayCode"))); // 상, 하행 정보

						/* 지하철 막차의 출발 시간 반환 */
						subPathStartTime = findSubwayLastStartTime(subwayStartId, subwayCode, subPathStartTime, dayOfWeek);
					} else if (trafficType == 2) { // 버스
//						System.out.println("-------------버스-------------");
						int busStationStartId = Integer.parseInt(String.valueOf(smallSubPath.get("startID"))); // 출발 정류장 ID

						JSONArray laneInfos = (JSONArray) smallSubPath.get("lane");
						JSONObject laneInfo = (JSONObject) laneInfos.get(0);
						int busId = Integer.parseInt(String.valueOf(laneInfo.get("busID")));

						subPathStartTime = findBusLastStartTime(busStationStartId, busId, subPathStartTime, dayOfWeek);
					}
				}
				
//				System.out.println("subPathStartTime : " + subPathStartTime);

				/* 가장 늦게 탈 수 있는 경로 확인 */
				if (lastOneTime < subPathStartTime) {
					lastOneIdx = i;
					lastOneTime = subPathStartTime;
				}
			}

			if (lastOneTime >= 2400)
				lastOneTime -= 2400;
			
//			System.out.println("lastOneTime : " + lastOneTime);
			resultMap.put("lastTime", lastOneTime); // 전달 방식을 바꿀 여지가 있음
			resultMap.put("lastOne", (JSONObject) path.get(lastOneIdx));

			urlConnection.disconnect();
			status = HttpStatus.OK;
		} catch (Exception e) {
			e.printStackTrace();
		}

		return new ResponseEntity<Map<String, Object>>(resultMap, status);
	}

	public int findBusLastStartTime(int busStationStartId, int busId, int startTime, int dayOfWeek) {

//		System.out.println("startTime : " + startTime);

		StringTokenizer st = null;
		int newTime = 0;

		final String busRouteInfoOpenUrl = "https://api.odsay.com/v1/api/busLaneDetail?lang=0&busID=" + busId + "&apiKey=" + apiProperties.getKey();

		try {
			URL busUrl = new URL(busRouteInfoOpenUrl);

			HttpsURLConnection busUrlConnection = (HttpsURLConnection) busUrl.openConnection();
			busUrlConnection.setRequestMethod("GET");

			BufferedReader br = new BufferedReader(new InputStreamReader(busUrlConnection.getInputStream(), "UTF-8"));

			JSONParser parser = new JSONParser();
			JSONObject obj = (JSONObject) parser.parse(br);
			JSONObject response = (JSONObject) obj.get("result");

			/* 해당 노선의 막차 시간 가져오기 */
			String busLastTime = (String) response.get("busLastTime");
//			System.out.println("busLastTime : " + busLastTime);

			st = new StringTokenizer(busLastTime, ":");
			newTime += Integer.parseInt(st.nextToken()) * 100; // 시
			newTime += Integer.parseInt(st.nextToken()); // 분

			/* 요일에 따른 버스 간격 결정 */
			int busIntevalWeek = 0;
			if (dayOfWeek == 1) { // 일요일
				busIntevalWeek = Integer.parseInt(String.valueOf(response.get("bus_Interval_Sun")));
			} else if (dayOfWeek == 7) { // 토요일
				busIntevalWeek = Integer.parseInt(String.valueOf(response.get("bus_Interval_Sat")));
			} else { // 평일
				busIntevalWeek = Integer.parseInt(String.valueOf(response.get("bus_Interval_Week")));
			}

			/* 버스 출발 정거장의 위치를 확인 후 막차 시간 계산 */
			JSONArray stationList = (JSONArray) response.get("station");
			for (int i = 0; i < stationList.size(); i++) {
				JSONObject station = (JSONObject) stationList.get(i);

				if (Integer.parseInt(String.valueOf(station.get("stationID"))) == busStationStartId) {
					int stationDistance = Integer.parseInt(String.valueOf(station.get("stationDistance")));

					/* 서울 버스의 평균 속도를 20km/h라는 가정을 하고 막차 시간 계산 */
					newTime += (int) Math.ceil((stationDistance * 60) / 20000);
				}
			}
			
			// 분이 60을 넘어가는 경우
			if (newTime % 100 >= 60)
				newTime += 40;
			
			/* 확인된 막차 시간에서 interval을 빼면서 startTime보다 작은 가장 늦은 시간 전달 */
			while (newTime > startTime) {
				newTime -= busIntevalWeek;
				
				if (newTime % 100 >= 60)
					newTime -= 40;
			}
			
			busUrlConnection.disconnect();
		} catch (Exception e) {
			e.printStackTrace();
		}

//		System.out.println("newTime : " + newTime);
		return newTime;
	}

	public int findSubwayLastStartTime(int subwayStartId, int subwayCode, int startTime, int dayOfWeek) {

//		System.out.println("startTime : " + startTime);

		StringTokenizer st = null;
		int newTime = 0;

		final String subwayStationInfoOpenUrl = "https://api.odsay.com/v1/api/subwayTimeTable?lang=0&stationID=" + subwayStartId + "&wayCode=" + subwayCode + "&apiKey=" + apiProperties.getKey();

		try {
			URL subwayUrl = new URL(subwayStationInfoOpenUrl);

			HttpsURLConnection subwayUrlConnection = (HttpsURLConnection) subwayUrl.openConnection();
			subwayUrlConnection.setRequestMethod("GET");

			BufferedReader br = new BufferedReader(new InputStreamReader(subwayUrlConnection.getInputStream(), "UTF-8"));

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
			// System.out.println(wayList.toString());

			/* 가장 마지막 시간의 지하철 시간 받아오기 */
			JSONArray timeList = (JSONArray) wayList.get("time");
			o: for (int i = timeList.size() - 1; i >= 0; i--) {
				JSONObject lastTimeList = (JSONObject) timeList.get(i);

				int hour = Integer.parseInt(String.valueOf(lastTimeList.get("Idx"))); // 시간
//				 System.out.println("hour : " + hour);

				if (hour <= (startTime / 100)) { // 우선 동일한 시간인 경우를 확인
					if ((startTime / 100) == hour && (startTime % 100) == 0) // 시간이 같은데 0분이 경우는 무조건 전 시간 가장 늦은 애로!
						continue;

					// 1. 시 정하기
					newTime += hour * 100;

					// 2. 분 정하기
					String minute = (String) lastTimeList.get("list");
					// System.out.println("minute : " + minute);
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
							if ((startTime % 100) >= minuteList.get(j)) {
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
