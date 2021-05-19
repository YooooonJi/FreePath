package com.ssafy.project.service.route;

import java.util.ArrayList;
import java.util.Map;
import org.springframework.http.ResponseEntity;
import com.ssafy.project.model.route.SubscribeRequest;

public interface SubscribeService {
	public Object TimeTableSubway(int stationID, int wayCode, String startTime);

	public Object RealTimeBus(int busID, int startBusStationId, String startTime);

	public ArrayList<Integer> BusStationTime(int busID, int startBusStationId);

	public String CalculateTime(String nowTime, int tmpTime, int type);

	ResponseEntity<Map<String, Object>> findRoute(SubscribeRequest subscribeRequest);

	int searchBusId(int busNo);
}
