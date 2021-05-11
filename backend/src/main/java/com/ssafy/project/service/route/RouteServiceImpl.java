package com.ssafy.project.service.route;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.URL;
import java.util.ArrayList;
import java.util.Calendar;
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
	static int startBusStationIdx = 0;

	@Override
	public Object findRoute(RouteFindRequest routeFindRequest) {

		final String openUrl = "https://api.odsay.com/v1/api/searchPubTransPathT?lang=0&SX=" + routeFindRequest.getStartX() + "&SY=" + routeFindRequest.getStartY() + "&EX="
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
				// System.out.println("======================================");
				JSONObject infos = (JSONObject) path.get(i);

				// pathType : 1=지하철, 2=버스, 3=지하철+버스
				long pathType = (Long) infos.get("pathType");
				// System.out.println("pathType: " + pathType);

				// step1.경로 전체 소요시간 구하기
				JSONObject info = (JSONObject) infos.get("info");
				int totalTime = Integer.parseInt(String.valueOf(info.get("totalTime")));

				// step2.출발시간(도착시간-소요시간)구하기
				String startTime = CalculateTime(routeFindRequest.getArriveTime(), totalTime, 2);
				// System.out.println("실시간 반영 전 출발시간 : " + startTime);
				// step3.첫 대중교통의 실시간 정보 반영한 출발시간 구하기

				JSONArray subPath = (JSONArray) infos.get("subPath");
				int walkTime = 0;

				for (int j = 0; j < subPath.size(); j++) {
					JSONObject smallSubPath = (JSONObject) subPath.get(j);
					// trafficType 1:지하철, 2:버스, 3:도보

					long trafficType = (Long) smallSubPath.get("trafficType");

					// 지하철 운행시간 검색
					if (trafficType == 1) {
						int stationID = Integer.parseInt(String.valueOf(smallSubPath.get("startID")));
						int wayCode = Integer.parseInt(String.valueOf(smallSubPath.get("wayCode")));
						String tmpTime = CalculateTime(startTime, walkTime, 1);
						String realStartTime = CalculateTime(TimeTableSubway(stationID, wayCode, tmpTime), walkTime, 2);
						// System.out.println("실시간 시간:" + realStartTime);
						break;
					}

					// 버스 실시간 검색
					else if (trafficType == 2) {
						// System.out.println("버스 실시간 검색");
						int startBusStationId = Integer.parseInt(String.valueOf(smallSubPath.get("startID")));
						JSONArray lane = (JSONArray) smallSubPath.get("lane");
						JSONObject smallLane = (JSONObject) lane.get(0);
						int busID = Integer.parseInt(String.valueOf(smallLane.get("busID")));
						String tmpTime = CalculateTime(startTime, walkTime, 1);
						RealTimeBus(busID, startBusStationId, tmpTime);
						break;
					}

					// 도보일경우 다음 대중교통 체크
					else if (trafficType == 3) {
						int sectionTime = Integer.parseInt(String.valueOf(smallSubPath.get("sectionTime")));
						walkTime += sectionTime;
						continue;
					}

				}

				// System.out.println("======================================");
			}

			urlConnection.disconnect();

		} catch (Exception e) {
			e.printStackTrace();
		}
		return sb.toString();
	}

	// 시간 계산 (type=1 : tmpTime시간 후, type=2 : tmpTime시간 전)
	public String CalculateTime(String nowTime, int tmpTime, int type) {
		String[] time = nowTime.split(":");
		int hour = Integer.parseInt(time[0]);
		int minute = Integer.parseInt(time[1]);
		String resultTime = "";
		if (type == 1) {
			resultTime = (hour * 60 + minute + tmpTime) / 60 + ":" + (hour * 60 + minute + tmpTime) % 60;
		} else if (type == 2) {
			resultTime = (hour * 60 + minute - tmpTime) / 60 + ":" + (hour * 60 + minute - tmpTime) % 60;
		}
		return resultTime;
	}

	// 지하철 타임테이블
	@Override
	public String TimeTableSubway(int stationID, int wayCode, String startTime) {

		final String openUrl = "https://api.odsay.com/v1/api/subwayTimeTable?lang=0&stationID=" + stationID + "&wayCode=" + wayCode + "&apiKey=" + apiKey;

		String realStartTime = "";

		try {

			URL url = new URL(openUrl);
			HttpsURLConnection urlConnection = (HttpsURLConnection) url.openConnection();
			urlConnection.setRequestMethod("GET");

			BufferedReader br = new BufferedReader(new InputStreamReader(urlConnection.getInputStream(), "UTF-8"));

			JSONParser parser = new JSONParser();
			JSONObject obj = (JSONObject) parser.parse(br);
			JSONObject response = (JSONObject) obj.get("result");
			JSONObject OrdList = (JSONObject) response.get("OrdList");
			JSONArray time = new JSONArray();

			// 상행, 하행
			if (wayCode == 1) {
				JSONObject up = (JSONObject) OrdList.get("up");
				time = (JSONArray) up.get("time");
			} else if (wayCode == 2) {
				JSONObject down = (JSONObject) OrdList.get("down");
				time = (JSONArray) down.get("time");
			}

			// 시간 시,분 계산
			String[] tmpTime = startTime.split(":");
			int hour = Integer.parseInt(tmpTime[0]);
			int minute = Integer.parseInt(tmpTime[1]);

			// 세부 경로들 계산
			for (int i = 0; i < time.size() - 1; i++) {
				JSONObject smallTime = (JSONObject) time.get(i);
				int subwayHour = Integer.parseInt(String.valueOf(smallTime.get("Idx")));

				// 버스 시간표 hour과 같을 때, 최소 차이의 minute 구하기
				if (hour == subwayHour) {
					String[] subwayMinute = String.valueOf(smallTime.get("list")).split(" ");
					int min = Integer.MAX_VALUE;

					for (int j = 0; j < subwayMinute.length; j++) {
						int intSubwayMinute = Integer.parseInt(subwayMinute[j].substring(0, 2));
						if (minute >= intSubwayMinute) {
							min = Math.min(min, minute - intSubwayMinute);
						}
					}

					realStartTime = CalculateTime(startTime, min, 2);
					break;
				}

			}

			urlConnection.disconnect();

		} catch (Exception e) {
			e.printStackTrace();
		}
		return realStartTime;
	}


	// 버스 실시간 위치정보
	@Override
	public Object RealTimeBus(int busID, int startBusStationId, String startTime) {

		ArrayList<Integer> busDirTime = BusStationTime(busID, startBusStationId);

		// 시간 시,분 계산
		String[] tmpTime = startTime.split(":");
		int hour = Integer.parseInt(tmpTime[0]);
		int minute = Integer.parseInt(tmpTime[1]);


		Calendar cal = Calendar.getInstance();
		int nowHour = cal.get(Calendar.HOUR_OF_DAY);
		int nowMin = cal.get(Calendar.MINUTE);
		String nowTime = nowHour + ":" + nowMin;

		// 실시간 버스 위치 정보 조회
		final String openUrl = "https://api.odsay.com/v1/api/realtimeRoute?lang=0&busID=" + busID + "&apiKey=" + apiKey;

		try {

			URL url = new URL(openUrl);
			HttpsURLConnection urlConnection = (HttpsURLConnection) url.openConnection();
			urlConnection.setRequestMethod("GET");

			BufferedReader br = new BufferedReader(new InputStreamReader(urlConnection.getInputStream(), "UTF-8"));

			JSONParser parser = new JSONParser();
			JSONObject obj = (JSONObject) parser.parse(br);
			JSONObject response = (JSONObject) obj.get("result");
			JSONArray real = (JSONArray) response.get("real");

			for (int i = 0; i < real.size() - 1; i++) {

				JSONObject realBus = (JSONObject) real.get(i);

				int fromStationIdx = Integer.parseInt(String.valueOf(realBus.get("fromStationSeq")));

				// 현재 목적지 정류장 idx보다 뒤쪽에 있는 버스라면
				if (startBusStationIdx + 1 < fromStationIdx) {
					int busTimeSum = 0;
					// 뒤쪽에 있는 버스가 현재 목적지 정류장에 도착할 시간 구하기
					for (int j = startBusStationIdx; j < fromStationIdx; j++) {
						busTimeSum += busDirTime.get(j);
					}

					String busTmpTime = CalculateTime(nowTime, busTimeSum, 1);
					// 도착한 시간이 현재 출발해야 하는 시간보다 늦다면

				}

			}

			urlConnection.disconnect();

		} catch (Exception e) {
			e.printStackTrace();
		}
		return busDirTime;


	}


	// 버스 정류장 사이 별 소요시간
	public ArrayList<Integer> BusStationTime(int busID, int startBusStationId) {

		// 정류장 사이별 소요시간 list
		ArrayList<Integer> busDirTime = new ArrayList<Integer>();
		startBusStationIdx = 0;

		// 버스노선 상세정보 조회
		final String openUrl = "https://api.odsay.com/v1/api/busLaneDetail?lang=0&busID=" + busID + "&apiKey=" + apiKey;


		try {

			URL url = new URL(openUrl);
			HttpsURLConnection urlConnection = (HttpsURLConnection) url.openConnection();
			urlConnection.setRequestMethod("GET");

			BufferedReader br = new BufferedReader(new InputStreamReader(urlConnection.getInputStream(), "UTF-8"));

			JSONParser parser = new JSONParser();
			JSONObject obj = (JSONObject) parser.parse(br);
			JSONObject response = (JSONObject) obj.get("result");
			JSONArray station = (JSONArray) response.get("station");

			for (int i = 0; i < station.size() - 1; i++) {
				JSONObject smallStation1 = (JSONObject) station.get(i);
				JSONObject smallStation2 = (JSONObject) station.get(i + 1);

				int distance1 = Integer.parseInt(String.valueOf(smallStation1.get("stationDistance")));
				int distance2 = Integer.parseInt(String.valueOf(smallStation2.get("stationDistance")));
				// System.out.println(distance1+" "+distance2);

				int stationId = Integer.parseInt(String.valueOf(smallStation1.get("stationID")));

				if (stationId == startBusStationId) {
					startBusStationIdx = Integer.parseInt(String.valueOf(smallStation1.get("idx")));
				}

				// 정류장 별 거리차이를 m-> km로 변환
				double diffDistance = (double) (distance2 - distance1) / 1000;
				System.out.println("diff:" + diffDistance);

				// 버스 속력 20km/h 로 가정, 반올림 하여 시간 계산
				int diffTime = (int) Math.ceil(diffDistance * 3);
				busDirTime.add(diffTime);
				// System.out.println("difftime:"+diffTime);
			}

			// System.out.println("버스 정류장별 소요시간");
			// for (int i = 0; i < busDirTime.size(); i++) {
			// System.out.println(busDirTime.get(i));
			// }

			urlConnection.disconnect();

		} catch (Exception e) {
			e.printStackTrace();
		}
		return busDirTime;
	}



}
