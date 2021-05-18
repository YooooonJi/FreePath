package com.ssafy.project.service.group;

import org.springframework.http.ResponseEntity;
import com.ssafy.project.model.group.GroupAlarm;
import com.ssafy.project.model.group.GroupRequest;

public interface GroupAlarmService {

	public ResponseEntity<Integer> makeGroup(GroupRequest groupRequest);

	public ResponseEntity<GroupAlarm> takeGroup(String uid);
	
}
