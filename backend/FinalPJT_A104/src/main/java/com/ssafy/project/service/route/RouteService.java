package com.ssafy.project.service.route;

import com.ssafy.project.model.route.RouteFindRequest;

public interface RouteService {

	public String readApi();//api 실행 예제
	public Object findRoute(RouteFindRequest routeFindRequest);//경로 찾기
}
