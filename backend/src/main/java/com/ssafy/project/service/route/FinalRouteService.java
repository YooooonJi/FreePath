package com.ssafy.project.service.route;

import java.util.Map;

import org.springframework.http.ResponseEntity;

import com.ssafy.project.model.route.RouteFindRequest;

public interface FinalRouteService {

	public ResponseEntity<Map<String, Object>> findLast(RouteFindRequest routeFindRequest);

}
