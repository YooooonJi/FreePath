package com.ssafy.project.model.route;

import lombok.Data;

@Data
public class SubscribeRequest {
	
	private String address;
	
	private int busno;//버스번호 or 지하철 호선
	private int busid;//버스 고유 번호
	
	private String stationname;//버스정류장이름 or 지하철역이름
	private int stationid;//버스정류장 고유 번호 or 지하철역 번호
	
	private int updown;//상행 or 하행
	
	private String alarmname; //알람 이름
}
