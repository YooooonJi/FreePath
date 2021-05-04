package com.ssafy.project.service.route;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.MalformedURLException;
import java.net.URL;

import javax.net.ssl.HttpsURLConnection;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.project.model.api.ApiProperties;
import com.ssafy.project.model.route.RouteFindRequest;

@Service
public class FinalRouteServiceImpl implements FinalRouteService{
	
	@Autowired
	private static ApiProperties apiProperties;

	/*
	 * 막차 계산하기 위한 루틴 
	 * 1. 각 경로의 전체 경로 확인 O 
	 * 2. 마지막 경로부터 확인하는데 마지막 도로 경로일 경우 제외 O 
	 * 3. 각 경로마다 출발지에서 도착지까지 가는 막차 시간 구하기 
	 * 4. 각 경로의 가장 늦게 출발할 수 있는 시간 저장 
	 * 5. 가장 늦게 출발할 수 있는 순으로 정렬 => 가장 늦게 탈 수 있는 경로 전달(마지막 차가 동일한 경우에는 더 짧은 경우를 전달)
	 * sectionTime => 각 구간 이동 소요 시간 
	 * trafficType => 1-지하철, 2-버스, 3-도보
	 * wayCode => 1: 상행, 2: 하행
	 */
	@Override
	public Object findLast(RouteFindRequest routeFindRequest) {

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

			int lastOneIdx = 0; // 가장 늦게 탈 수 있는 경로의 번호
			int lastOneTime = 0; // 가장 늦게 탈 수 있는 경로의 출발 시간 (1245 => 12시 45분 출발)

			for (int i = 0; i < path.size(); i++) {
//				System.out.println(path.get(i));
				System.out.println("==================================");
				JSONObject paths = (JSONObject) path.get(i);

				/* pathType => 1: 지하철, 2: 버스, 3: 지하철&버스 --> 이후 개인화 과정에서 필요 */
				long pathType = (Long) paths.get("pathType");
//				System.out.println("pathType: " + pathType);

				/* 경로의 전반적인 정보 */
				JSONObject info = (JSONObject) paths.get("info");
//				System.out.println("info: " + info);

				/* 각 전체 경로 확인 */
				JSONArray subPath = (JSONArray) paths.get("subPath");
				int subPathStartTime = 0; // 해당 경로의 출발 시간

				for (int j = subPath.size() - 1; j >= 0; j--) {
					JSONObject smallSubPath = (JSONObject) subPath.get(j);
					long trafficType = (Long) smallSubPath.get("trafficType");

					if (j == subPath.size() - 1 && trafficType == 3L) // 마지막 도보 경로 Skip
						continue;

//					System.out.println(smallSubPath);

					if (trafficType == 1L) { // 지하철
						System.out.println("-------------지하철-------------");
						long subwayStartId = (Long) smallSubPath.get("startID"); // 출발역의 ID
//						System.out.println(subwayStartId);
						long subwayCode = (Long) smallSubPath.get("wayCode"); // 상, 하행 정보
//						System.out.println(subwayCode);

						/* 지하철 막차의 출발 시간 반환 */
						subPathStartTime = findSubwayStartTime(subwayStartId, subwayCode, subPathStartTime);

					} else if (trafficType == 2L) { // 버스
						System.out.println("-------------버스-------------");
					} else if (trafficType == 3L) { // 도보
						System.out.println("-------------도보-------------");
					}
				}

			}

			urlConnection.disconnect();

		} catch (Exception e) {
			e.printStackTrace();
		}

		return "OK";
	}
	
	public static int findSubwayStartTime(long subwayStartId, long subwayCode, int startTime){
		int newStartTime = 0;
		
		String subwayStationInfoOpenUrl = "https://api.odsay.com/v1/api/subwayTimeTable?lang=&stationID="
				+ subwayStartId + "&wayCode=" + subwayCode + "&apiKey=" + apiProperties.getKey();
		
		try {
			URL subwayUrl = new URL(subwayStationInfoOpenUrl);
			
			HttpsURLConnection subwayUrlConnection = (HttpsURLConnection) subwayUrl.openConnection();
			subwayUrlConnection.setRequestMethod("GET");

			BufferedReader br = new BufferedReader(new InputStreamReader(subwayUrlConnection.getInputStream(), "UTF-8"));

			JSONParser parser = new JSONParser();
			JSONObject obj = (JSONObject) parser.parse(br);
			
			
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		
		
		
		return newStartTime;
	}

}
