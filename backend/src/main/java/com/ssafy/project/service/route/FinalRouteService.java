package com.ssafy.project.service.route;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import com.ssafy.project.model.route.Route;
import com.ssafy.project.model.route.RouteFindRequest;
import com.ssafy.project.model.route.RouteFindWithoutRequest;

public interface FinalRouteService {

	public ResponseEntity<Map<String, Object>> findLastWithoutUser(RouteFindWithoutRequest routeFindWithoutRequest);

	public ResponseEntity<Route> findLastWithUser(RouteFindRequest routeFindRequest);

	public ResponseEntity<List<Route>> info(String uid);

	public ResponseEntity<List<Route>> infoGroup(String uid);

	public ResponseEntity<String> delete(int routeId);
}
