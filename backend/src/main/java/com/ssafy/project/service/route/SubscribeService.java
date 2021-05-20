package com.ssafy.project.service.route;

import java.util.ArrayList;
import java.util.Map;
import org.springframework.http.ResponseEntity;
import com.ssafy.project.model.route.Subscribe;
import com.ssafy.project.model.route.SubscribeRequest;
import com.ssafy.project.model.route.SubscribeWithoutRequest;

public interface SubscribeService {
	public Object TimeTableSubway(int stationID, int wayCode, String startTime);

	public Object RealTimeBus(int busID, int startBusStationId, String startTime);

	public ArrayList<Integer> BusStationTime(int busID, int startBusStationId);

	public String CalculateTime(String nowTime, int tmpTime, int type);

	public ResponseEntity<Map<String, Object>> findSubscribeWithoutUser(SubscribeWithoutRequest subscribeWithoutRequest);
	
	public ResponseEntity<Subscribe> findSubscribeWithUser(SubscribeRequest subscribeRequest);

	int searchBusId(int busNo);
}
