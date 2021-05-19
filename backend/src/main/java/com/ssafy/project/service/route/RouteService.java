package com.ssafy.project.service.route;

import java.util.ArrayList;
import java.util.Map;
import org.springframework.http.ResponseEntity;
import com.ssafy.project.model.group.GroupAlarmRegisterRequest;
import com.ssafy.project.model.route.Route;
import com.ssafy.project.model.route.RouteFindRequest;
import com.ssafy.project.model.route.RouteFindWithoutRequest;

public interface RouteService {

	public ResponseEntity<Map<String, Object>> findRouteWithoutUser(RouteFindWithoutRequest routeFindWithoutRequest);// 경로 찾기
	
	public ResponseEntity<Route> findRouteWithUser(RouteFindRequest routeFindRequest);

	public Object TimeTableSubway(int stationID, int wayCode, String startTime);

	public String CalculateTime(String nowTime, int tmpTime, int type);

	public Object RealTimeBus(int busID, int startBusStationId, String startTime);

	public ArrayList<Integer> BusStationTime(int busID, int startBusStationId);
	
	public ResponseEntity<String> registerRoute(GroupAlarmRegisterRequest groupAlarmRegisterRequest);
}
