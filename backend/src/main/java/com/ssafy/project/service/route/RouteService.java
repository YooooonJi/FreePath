package com.ssafy.project.service.route;

import java.util.ArrayList;
import com.ssafy.project.model.route.RouteFindRequest;

public interface RouteService {

	public Object findRoute(RouteFindRequest routeFindRequest);// 경로 찾기

	public Object TimeTableSubway(int stationID, int wayCode, String startTime);

	public String CalculateTime(String nowTime, int tmpTime, int type);

	public Object RealTimeBus(int busID, int startBusStationId, String startTime);

	public ArrayList<Integer> BusStationTime(int busID, int startBusStationId);
}
