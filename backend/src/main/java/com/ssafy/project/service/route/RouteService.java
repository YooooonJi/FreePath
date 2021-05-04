package com.ssafy.project.service.route;

import com.ssafy.project.model.route.RouteFindRequest;

public interface RouteService {

	public Object findRoute(RouteFindRequest routeFindRequest);//경로 찾기
	public Object RealTimeBus(int busID);
	public Object TimeTableSubway(int stationID,int wayCode,String startTime);	
	public String CalculateTime(String nowTime, int tmpTime, int type);
	
}
