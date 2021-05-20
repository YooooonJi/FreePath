package com.ssafy.project.service.group;

import java.util.List;
import org.springframework.http.ResponseEntity;
import com.ssafy.project.model.group.GroupAlarm;
import com.ssafy.project.model.group.GroupRequest;
import com.ssafy.project.model.user.Ggomjilak;

public interface GroupAlarmService {

	public ResponseEntity<Integer> makeGroup(GroupRequest groupRequest);

	public ResponseEntity<GroupAlarm> takeGroup(String uid);
	
	public ResponseEntity<List<Ggomjilak>> getMember(String uid);
	
}
