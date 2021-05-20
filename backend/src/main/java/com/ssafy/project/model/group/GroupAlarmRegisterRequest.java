package com.ssafy.project.model.group;

import java.util.ArrayList;
import java.util.List;
import lombok.Data;

@Data
public class GroupAlarmRegisterRequest {

	private ArrayList<String> uids;

	private double endX;

	private double endY;

	private String arriveTime;

	private String endAddress;

	private String alarmName;
	
	private int timetype;
	
}
