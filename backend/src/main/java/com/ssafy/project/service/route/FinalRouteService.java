package com.ssafy.project.service.route;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import com.ssafy.project.model.group.GroupAlarmRegisterRequest;
import com.ssafy.project.model.route.Route;
import com.ssafy.project.model.route.RouteFindRequest;
import com.ssafy.project.model.route.RouteFindWithoutRequest;

public interface FinalRouteService {

	public ResponseEntity<Map<String, Object>> findLastWithoutUser(RouteFindWithoutRequest routeFindWithoutRequest);

	public ResponseEntity<Route> findLastWithUser(RouteFindRequest routeFindRequest);

	public int findSubwayLastStartTime(int subwayStartId, int subwayCode, int startTime, int dayOfWeek);

	public int findBusLastStartTime(int busStationStartId, int busId, int startTime, int dayOfWeek);

	public ResponseEntity<List<Object>> info(String uid);

	public ResponseEntity<List<Route>> infoGroup(String uid);

	public ResponseEntity<String> delete(int routeId);

	public ResponseEntity<String> registerLast(GroupAlarmRegisterRequest groupAlarmRegisterRequest);
}
