package com.ssafy.project.model.route;

import lombok.Data;

@Data
public class RouteFindRequest {
	
	//출발지 x,y
	private float SX;
	private float SY;
	//도착지 x,y
	private float EX;
	private float EY;
	//도착시간
	private String arriveTime;
}
