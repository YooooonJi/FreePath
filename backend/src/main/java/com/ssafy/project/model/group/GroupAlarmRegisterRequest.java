package com.ssafy.project.model.group;

import java.util.List;
import lombok.Data;

@Data
public class GroupAlarmRegisterRequest {

	private List<String> uids;

	private float endX;

	private float endY;

	private String arriveTime;

	private String endAddress;

	private String alarmName;
	
	private int timetype;
	
}
