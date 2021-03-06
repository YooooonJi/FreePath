package com.ssafy.project.service.route;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.URL;
import java.net.URLEncoder;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import javax.net.ssl.HttpsURLConnection;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.ssafy.project.dao.route.SubscribeDao;
import com.ssafy.project.dao.user.CustomDao;
import com.ssafy.project.model.api.ApiProperties;
import com.ssafy.project.model.route.Subscribe;
import com.ssafy.project.model.route.SubscribeRequest;
import com.ssafy.project.model.route.SubscribeWithoutRequest;
import com.ssafy.project.model.user.Custom;

@Service
public class SubscribeServiceImpl implements SubscribeService {

	@Autowired
	private SubscribeDao subscribeDao;

	@Autowired
	private CustomDao customDao;

	@Autowired
	private ApiProperties apiProperties;

	public static final Logger logger = LoggerFactory.getLogger(SubscribeServiceImpl.class);
	static int startBusStationIdx = 0;

	@Override
	public ResponseEntity<Map<String, Object>> findSubscribeWithoutUser(SubscribeWithoutRequest subscribeWithoutRequest) {

		HttpStatus status = null;
		Map<String, Object> resultMap = new HashMap<String, Object>();

		String encodingStationName = "";
		try {
			encodingStationName = URLEncoder.encode(subscribeWithoutRequest.getStationname(), "UTF-8");
		} catch (UnsupportedEncodingException e1) {
			e1.printStackTrace();
		}

		final String openUrl = "https://api.odsay.com/v1/api/searchStation?lang=0&stationName=" + encodingStationName + "&apiKey=" + apiProperties.getKey();

		try {
			URL url = new URL(openUrl);

			HttpsURLConnection urlConnection = (HttpsURLConnection) url.openConnection();
			urlConnection.setRequestMethod("GET");

			BufferedReader br = new BufferedReader(new InputStreamReader(urlConnection.getInputStream(), "UTF-8"));

			String startTime = "";

			Calendar today = Calendar.getInstance(); // ????????????
			String start[] = subscribeWithoutRequest.getStartTime().split(" ");

			int spareTime = 0;

			if (subscribeWithoutRequest.getType() == 1) { // ?????? ????????? ??????
				JSONParser parser = new JSONParser();
				JSONObject obj = (JSONObject) parser.parse(br);
				JSONObject response = (JSONObject) obj.get("result");
				JSONArray station = (JSONArray) response.get("station");

				// ?????? ????????? ??????
				for (int i = 0; i < station.size(); i++) {
					JSONObject infos = (JSONObject) station.get(i);

					String arsID = String.valueOf(infos.get("arsID"));
					String tmpStationID = subscribeWithoutRequest.getStationid();
					String stringStationID = tmpStationID.substring(0, 2) + "-" + tmpStationID.substring(2, 5);

					// ????????? ??? ???????????? ????????? ??????????????????
					if (arsID.equals(stringStationID)) {
						int stationID = Integer.parseInt(String.valueOf(infos.get("stationID")));
						int busID = searchBusId(subscribeWithoutRequest.getBusno());

						startTime = CalculateTime(RealTimeBus(busID, stationID, start[1]), spareTime, 2);

						break;
					}
				}

				urlConnection.disconnect();
			} else if (subscribeWithoutRequest.getType() == 2) { // ????????? ??? ??????
				startTime = CalculateTime(TimeTableSubway(Integer.parseInt(subscribeWithoutRequest.getStationid()), subscribeWithoutRequest.getUpdown(), start[1]), spareTime, 2);
			}

			/* ?????? ?????? ?????? ????????? */
			StringBuilder sb = new StringBuilder();
			sb.append(start[0] + " "); // ???-???-???
			sb.append(startTime); // ??????

			Date date = new SimpleDateFormat("yyyy-MM-dd hh:mm").parse(sb.toString());
			Calendar lastDate = Calendar.getInstance();
			lastDate.setTime(date);

			long remainSecond = (lastDate.getTimeInMillis() - today.getTimeInMillis()) / 1000;

			resultMap.put("inputtime", subscribeWithoutRequest.getStartTime());
			resultMap.put("arrivetime", sb.toString());
			resultMap.put("totaltime", remainSecond);
			
//			if (remainSecond > 0) {
//				resultMap.put("arrivetime", sb.toString());
//				resultMap.put("totaltime", remainSecond);
//			} else {
//				Date dateInput = new SimpleDateFormat("yyyy-MM-dd hh:mm").parse(subscribeWithoutRequest.getStartTime());
//				Calendar inputDate = Calendar.getInstance();
//				inputDate.setTime(dateInput);
//				
//				resultMap.put("arrivetime", today);
//				resultMap.put("totaltime", (inputDate.getTimeInMillis() - today.getTimeInMillis()) / 1000);
//			}

			status = HttpStatus.OK;
		} catch (Exception e) {
			logger.error("??????/????????? ?????? ????????? ?????? ?????? : {}", e);
			status = HttpStatus.INTERNAL_SERVER_ERROR;
		}
		return new ResponseEntity<Map<String, Object>>(resultMap, status);
	}

	@Override
	public ResponseEntity<Subscribe> findSubscribeWithUser(SubscribeRequest subscribeRequest) {
		HttpStatus status = null;
		Subscribe resultSubscribe = null;

		String encodingStationName = "";
		try {
			encodingStationName = URLEncoder.encode(subscribeRequest.getStationname(), "UTF-8");
		} catch (UnsupportedEncodingException e1) {
			e1.printStackTrace();
		}

		final String openUrl = "https://api.odsay.com/v1/api/searchStation?lang=0&stationName=" + encodingStationName + "&apiKey=" + apiProperties.getKey();

		try {
			Subscribe subscribe = new Subscribe();

			subscribe.setAlarmname(subscribeRequest.getAlarmname());
			subscribe.setBusno(subscribeRequest.getBusno());
			subscribe.setStationid(Integer.parseInt(subscribeRequest.getStationid()));
			subscribe.setStationname(subscribeRequest.getStationname());
			subscribe.setUid(subscribeRequest.getUid());
			subscribe.setUpdown(subscribeRequest.getUpdown());
			subscribe.setUpdownname(subscribeRequest.getUpdownname());

			URL url = new URL(openUrl);

			HttpsURLConnection urlConnection = (HttpsURLConnection) url.openConnection();
			urlConnection.setRequestMethod("GET");

			BufferedReader br = new BufferedReader(new InputStreamReader(urlConnection.getInputStream(), "UTF-8"));

			String startTime = "";

			Calendar today = Calendar.getInstance(); // ????????????
			String start[] = subscribeRequest.getStartTime().split(" ");

			/* ????????? ?????? ????????? ?????? */
			Custom custom = customDao.findCustomByUid(subscribeRequest.getUid());
			int spareTime = custom.getSparetime();

			if (subscribeRequest.getType() == 1) { // ?????? ????????? ??????

				JSONParser parser = new JSONParser();
				JSONObject obj = (JSONObject) parser.parse(br);
				JSONObject response = (JSONObject) obj.get("result");
				JSONArray station = (JSONArray) response.get("station");

				// ?????? ????????? ??????
				for (int i = 0; i < station.size(); i++) {
					JSONObject infos = (JSONObject) station.get(i);

					String arsID = String.valueOf(infos.get("arsID"));
					String tmpStationID = subscribeRequest.getStationid();
					String stringStationID = tmpStationID.substring(0, 2) + "-" + tmpStationID.substring(2, 5);

					if (arsID.equals(stringStationID)) { // ????????? ??? ???????????? ????????? ??????????????????
						int stationID = Integer.parseInt(String.valueOf(infos.get("stationID")));
						int busID = searchBusId(subscribeRequest.getBusno());

						startTime = CalculateTime(RealTimeBus(busID, stationID, start[1]), spareTime, 2);

						break;
					}
				}

				urlConnection.disconnect();
			} else if (subscribeRequest.getType() == 2) { // ????????? ??? ??????
				startTime = CalculateTime(TimeTableSubway(Integer.parseInt(subscribeRequest.getStationid()), subscribeRequest.getUpdown(), start[1]), spareTime, 2);
			}

			/* ?????? ?????? ?????? ????????? */
			StringBuilder sb = new StringBuilder();

			sb.append(start[0] + " "); // ???-???-???
			sb.append(startTime);// ??????

			Date date = new SimpleDateFormat("yyyy-MM-dd hh:mm").parse(sb.toString());
			Calendar lastDate = Calendar.getInstance();
			lastDate.setTime(date);

			long remainSecond = (lastDate.getTimeInMillis() - today.getTimeInMillis()) / 1000;

			subscribe.setInputtime(subscribeRequest.getStartTime());
			subscribe.setArrivetime(sb.toString());
			subscribe.setTotaltime((int) remainSecond);
			
//			if(remainSecond > 0) {
//				subscribe.setArrivetime(sb.toString());
//				subscribe.setTotaltime((int) remainSecond);
//			}else {
//				Date dateInput = new SimpleDateFormat("yyyy-MM-dd hh:mm").parse(subscribeRequest.getStartTime());
//				Calendar inputDate = Calendar.getInstance();
//				inputDate.setTime(dateInput);
//				
//				subscribe.setArrivetime(startTime);
//				subscribe.setTotaltime((int) (inputDate.getTimeInMillis() - today.getTimeInMillis()) / 1000);
//			}

			resultSubscribe = subscribeDao.save(subscribe);

			status = HttpStatus.OK;
		} catch (Exception e) {
			logger.error("??????/????????? ?????? ????????? ?????? ?????? : {}", e);
			status = HttpStatus.INTERNAL_SERVER_ERROR;
		}
		return new ResponseEntity<Subscribe>(resultSubscribe, status);
	}

	@Override
	public int searchBusId(int busNo) {

		final String openUrl = "https://api.odsay.com/v1/api/searchBusLane?lang=0&busNo=" + busNo + "&apiKey=" + apiProperties.getKey();
		int busID = 0;

		try {

			URL url = new URL(openUrl);
			HttpsURLConnection urlConnection = (HttpsURLConnection) url.openConnection();
			urlConnection.setRequestMethod("GET");

			BufferedReader br = new BufferedReader(new InputStreamReader(urlConnection.getInputStream(), "UTF-8"));

			JSONParser parser = new JSONParser();
			JSONObject obj = (JSONObject) parser.parse(br);
			JSONObject response = (JSONObject) obj.get("result");
			// JSONObject totalCityList = (JSONObject) response.get("totalCityList");
			JSONArray lane = (JSONArray) response.get("lane");

			for (int i = 0; i < lane.size(); i++) {
				JSONObject smallLane = (JSONObject) lane.get(i);

				String busCityName = String.valueOf(smallLane.get("busCityName"));

				if (busCityName.equals("??????")) {
					busID = Integer.parseInt(String.valueOf(smallLane.get("busID")));
					break;
				}
			}
			urlConnection.disconnect();

		} catch (Exception e) {
			logger.error("?????? ID ?????? ?????? : {}", e);
		}
		return busID;
	}

	@Override
	public String TimeTableSubway(int stationID, int wayCode, String startTime) {

		final String openUrl = "https://api.odsay.com/v1/api/subwayTimeTable?lang=0&stationID=" + stationID + "&wayCode=" + wayCode + "&apiKey=" + apiProperties.getKey();

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

			// ??????, ??????
			if (wayCode == 1) {
				JSONObject up = (JSONObject) OrdList.get("up");
				time = (JSONArray) up.get("time");
			} else if (wayCode == 2) {
				JSONObject down = (JSONObject) OrdList.get("down");
				time = (JSONArray) down.get("time");
			}

			// ?????? ???,??? ??????
			String[] tmpTime = startTime.split(":");
			int hour = Integer.parseInt(tmpTime[0]);
			int minute = Integer.parseInt(tmpTime[1]);

			// ?????? ????????? ??????
			for (int i = 0; i < time.size() - 1; i++) {
				JSONObject smallTime = (JSONObject) time.get(i);
				int subwayHour = Integer.parseInt(String.valueOf(smallTime.get("Idx")));

				// ?????? ????????? hour??? ?????? ???, ?????? ????????? minute ?????????
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
			logger.error("????????? ????????? ?????? ?????? : {}", e);
		}

		return realStartTime;
	}


	// ?????? ????????? ????????????
	@Override
	public String RealTimeBus(int busID, int startBusStationId, String startTime) {

		ArrayList<Integer> busDirTime = BusStationTime(busID, startBusStationId);
		String realStartTime = "";

		// ?????? ???,??? ??????
		String[] tmpTime = startTime.split(":");
		int hour = Integer.parseInt(tmpTime[0]);
		int minute = Integer.parseInt(tmpTime[1]);

		Calendar cal = Calendar.getInstance();
		int nowHour = cal.get(Calendar.HOUR_OF_DAY);
		int nowMin = cal.get(Calendar.MINUTE);
		String nowTime = nowHour + ":" + nowMin;

		// ????????? ?????? ?????? ?????? ??????
		final String openUrl = "https://api.odsay.com/v1/api/realtimeRoute?lang=0&busID=" + busID + "&apiKey=" + apiProperties.getKey();

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
				// ?????? ????????? ????????? idx?????? ????????? ?????? ????????????
				if (startBusStationIdx + 1 < fromStationIdx) {
					int busTimeSum = 0;
					// ????????? ?????? ????????? ?????? ????????? ???????????? ????????? ?????? ?????????
					for (int j = startBusStationIdx; j < fromStationIdx; j++) {
						busTimeSum += busDirTime.get(j);
					}

					String busTmpTime = CalculateTime(nowTime, busTimeSum, 1);

					String[] busRealTime = busTmpTime.split(":");
					int realHour = Integer.parseInt(busRealTime[0]);
					int realMinute = Integer.parseInt(busRealTime[1]);
					if ((hour * 60 + minute) >= (realHour * 60 + realMinute)) {
						realStartTime = busTmpTime;
						break;
					}
				}
			}
			urlConnection.disconnect();
		} catch (Exception e) {
			logger.error("?????? ????????? ???????????? ?????? ?????? : {}", e);
		}
		return realStartTime;
	}

	// ?????? ????????? ?????? ??? ????????????
	public ArrayList<Integer> BusStationTime(int busID, int startBusStationId) {

		// ????????? ????????? ???????????? list
		ArrayList<Integer> busDirTime = new ArrayList<Integer>();
		startBusStationIdx = 0;

		// ???????????? ???????????? ??????
		final String openUrl = "https://api.odsay.com/v1/api/busLaneDetail?lang=0&busID=" + busID + "&apiKey=" + apiProperties.getKey();


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

				int stationId = Integer.parseInt(String.valueOf(smallStation1.get("stationID")));

				if (stationId == startBusStationId) {
					startBusStationIdx = Integer.parseInt(String.valueOf(smallStation1.get("idx")));
				}

				// ????????? ??? ??????????????? m-> km??? ??????
				double diffDistance = (double) (distance2 - distance1) / 1000;

				// ?????? ?????? 20km/h ??? ??????, ????????? ?????? ?????? ??????
				int diffTime = (int) Math.ceil(diffDistance * 3);
				busDirTime.add(diffTime);
			}

			urlConnection.disconnect();

		} catch (Exception e) {
			logger.error("?????? ????????? ?????? ??? ???????????? ?????? ?????? : {}", e);
		}
		return busDirTime;
	}

	// ?????? ?????? (type=1 : tmpTime?????? ???, type=2 : tmpTime?????? ???)
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

}
