package com.ssafy.project.model.route;

import lombok.Data;

@Data
public class SubscribeWithoutRequest {

	private int type; // 1: 버스 , 2: 지하철

	private int busno; // 버스번호 or 지하철 호선

	private String stationname; // 버스정류장이름 or 지하철역이름
	private String stationid; // 버스정류장 고유 번호 or 지하철역 번호 arsid

	private int updown; // 1: 상행 , 2: 하행

	private String startTime; // yyyy-mm-dd hh:mm

	private String alarmname; // 알람 이름
}
