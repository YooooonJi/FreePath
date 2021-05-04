package com.ssafy.project.service.route;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.URL;
import java.util.StringTokenizer;

import javax.net.ssl.HttpsURLConnection;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.project.model.api.ApiProperties;
import com.ssafy.project.model.route.RouteFindRequest;

@Service
public class RouteServiceImpl implements RouteService {

	@Autowired
	private ApiProperties apiProperties;

	static final String apiKey = "D6BmCrs4iH/PLaOQ390EUYI9%2BAdf8B55184hmV7GpSA";

	@Override
	public Object findRoute(RouteFindRequest routeFindRequest) {

		final String openUrl = "https://api.odsay.com/v1/api/searchPubTransPathT?lang=0&SX="
				+ routeFindRequest.getStartX() + "&SY=" + routeFindRequest.getStartY() + "&EX="
				+ routeFindRequest.getEndX() + "&EY=" + routeFindRequest.getEndY() + "&apiKey=" + apiKey;

		StringBuffer sb = new StringBuffer();

		try {

			URL url = new URL(openUrl);
			HttpsURLConnection urlConnection = (HttpsURLConnection) url.openConnection();
			urlConnection.setRequestMethod("GET");

			BufferedReader br = new BufferedReader(new InputStreamReader(urlConnection.getInputStream(), "UTF-8"));

			JSONParser parser = new JSONParser();
			JSONObject obj = (JSONObject) parser.parse(br);
			JSONObject response = (JSONObject) obj.get("result");
			JSONArray path = (JSONArray) response.get("path");

			// 세부 경로들 계산
			for (int i = 0; i < path.size() - 1; i++) {
				System.out.println("======================================");
				JSONObject infos = (JSONObject) path.get(i);

				// pathType : 1=지하철, 2=버스, 3=지하철+버스
				long pathType = (Long) infos.get("pathType");
				System.out.println("pathType: " + pathType);

				// step1.경로 전체 소요시간 구하기
				JSONObject info = (JSONObject) infos.get("info");
				int totalTime = Integer.parseInt(String.valueOf(info.get("totalTime")));

				// step2.출발시간(도착시간-소요시간)구하기
				String[] time = routeFindRequest.getArriveTime().split(":");
				int hour = Integer.parseInt(time[0]);
				int minute = Integer.parseInt(time[1]);
				String startTime = (hour * 60 + minute - totalTime) / 60 + ":" + (hour * 60 + minute - totalTime) % 60;
				System.out.println("실시간 반영 전 출발시간:" + startTime);

				// step3.첫 대중교통의 실시간 정보 반영한 출발시간 구하기

				JSONArray subPath = (JSONArray) infos.get("subPath");

				for (int j = 0; j < subPath.size(); j++) {
					JSONObject smallSubPath = (JSONObject) subPath.get(j);
					// trafficType 1:지하철, 2:버스, 3:도보
					int walkTime = 0;
					long trafficType = (Long) smallSubPath.get("trafficType");

					// 지하철 운행시간 검색
					if (trafficType == 1) {
						System.out.println("지하철 실시간 검색");
						int stationID = Integer.parseInt(String.valueOf(smallSubPath.get("startID")));

						TimeTableSubway(stationID);
						break;
					}

					// 버스 실시간 검색
					else if (trafficType == 2) {
						System.out.println("버스 실시간 검색");
						JSONArray lane = (JSONArray) smallSubPath.get("lane");
						JSONObject smallLane = (JSONObject) lane.get(0);
						int busID = Integer.parseInt(String.valueOf(smallLane.get("busID")));
						RealTimeBus(busID);
						break;
					}

					// 도보일경우 다음 대중교통 체크
					else if (trafficType == 3) {
						int sectionTime = Integer.parseInt(String.valueOf(smallSubPath.get("sectionTime")));
						walkTime += sectionTime;
						continue;
					}

				}

				System.out.println("======================================");
			}

			urlConnection.disconnect();

		} catch (Exception e) {
			e.printStackTrace();
		}
		return sb.toString();
	}

	// 지하철 타임테이블
	@Override
	public Object TimeTableSubway(int stationID) {

		final String openUrl = "https://api.odsay.com/v1/api/subwayTimeTable?lang=0&stationID=" + stationID + "&apiKey="
				+ apiKey;

		StringBuffer sb = new StringBuffer();
		try {

			URL url = new URL(openUrl);
			HttpsURLConnection urlConnection = (HttpsURLConnection) url.openConnection();
			urlConnection.setRequestMethod("GET");

			BufferedReader br = new BufferedReader(new InputStreamReader(urlConnection.getInputStream(), "UTF-8"));
			sb.append(br.readLine());

			urlConnection.disconnect();

		} catch (Exception e) {
			e.printStackTrace();
		}

		System.out.println(sb);
		return sb.toString();
	}

	// 버스 실시간 위치정보
	@Override
	public Object RealTimeBus(int busID) {

		final String openUrl = "https://api.odsay.com/v1/api/realtimeRoute?lang=0&busID=" + busID + "&apiKey=" + apiKey;

		StringBuffer sb = new StringBuffer();
		try {

			URL url = new URL(openUrl);
			HttpsURLConnection urlConnection = (HttpsURLConnection) url.openConnection();
			urlConnection.setRequestMethod("GET");

			BufferedReader br = new BufferedReader(new InputStreamReader(urlConnection.getInputStream(), "UTF-8"));
			sb.append(br.readLine());
			urlConnection.disconnect();

		} catch (Exception e) {
			e.printStackTrace();
		}

		System.out.println(sb);
		return sb.toString();
	}

	@Override
	public Object findLast(RouteFindRequest routeFindRequest) {
		
		final String openUrl = "https://api.odsay.com/v1/api/searchPubTransPathT?lang=0&SX="
				+ routeFindRequest.getStartX() + "&SY=" + routeFindRequest.getStartY() + "&EX="
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

			for (int i = 0; i < path.size(); i++) {
//				System.out.println(path.get(i));
				System.out.println("==================================");
				JSONObject paths = (JSONObject) path.get(i);

				/* pathType => 1: 지하철, 2: 버스, 3: 지하철&버스 */
				long pathType = (Long) paths.get("pathType");
//				System.out.println("pathType: " + pathType);

				/* 경로 전체 정보 */
				JSONObject info = (JSONObject) paths.get("info");
//				System.out.println("info: " + info);

				/* 막차 정보를 확인하기 위한 각 sub-path 정보 확인 */
				JSONArray subPath = (JSONArray) paths.get("subPath");
				for (int j = 0; j < subPath.size(); j++) {
					JSONObject smallSubPath = (JSONObject) subPath.get(j);
					
					System.out.println(smallSubPath);
				}
			}

			urlConnection.disconnect();

		} catch (Exception e) {
			e.printStackTrace();
		}

		return "OK";
	}

}
