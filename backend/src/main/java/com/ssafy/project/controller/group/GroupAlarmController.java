package com.ssafy.project.controller.group;

import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.ssafy.project.model.group.GroupAlarm;
import com.ssafy.project.model.group.GroupAlarmRegisterRequest;
import com.ssafy.project.model.group.GroupRequest;
import com.ssafy.project.service.group.GroupAlarmService;
import com.ssafy.project.service.route.FinalRouteService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@Api(tags = "GroupAlarm", description = "그룹 API")
@CrossOrigin
@RestController
@RequestMapping("/groupalarm")
public class GroupAlarmController {

	@Autowired
	private GroupAlarmService groupAlarmService;
	
	@Autowired
	private FinalRouteService finalRouteService;

	@ApiOperation(value = "그룹 생성시 그룹 정보 등록")
	@PostMapping("/make")
	public ResponseEntity<Integer> makeGroup(@Valid @RequestBody GroupRequest groupRequest) {
		return groupAlarmService.makeGroup(groupRequest);
	}

	@ApiOperation(value = "그룹 정보 전달")
	@GetMapping("/take/{uid}")
	public ResponseEntity<GroupAlarm> takeGroup(@PathVariable("uid") String uid) {
		return groupAlarmService.takeGroup(uid);
	}
	
	@ApiOperation(value = "막차를 위한 그룹 알람 등록")
	@PostMapping("/register/last")
	public ResponseEntity<String> registerLast(@Valid @RequestBody GroupAlarmRegisterRequest groupAlarmRegisterRequest) {
		return finalRouteService.registerLast(groupAlarmRegisterRequest);
	}
	
}
