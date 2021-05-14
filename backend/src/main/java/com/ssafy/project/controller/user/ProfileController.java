package com.ssafy.project.controller.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.project.service.user.ProfileService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@Api(tags = "Profile", description = "프로필 API")
@CrossOrigin
@RestController
@RequestMapping("/profile")
public class ProfileController {
	
	@Autowired
	private ProfileService profileService;
	
	@ApiOperation(value="test api")
	@GetMapping("/testing")
	public Object test() {
		return profileService.findAll();
	}
	
	@ApiOperation(value="사용자 회원가입시, 기본 및 추가 정보 등록")
	@PostMapping("/join/{uid}")
	public ResponseEntity<String> join(@PathVariable("uid") String uid) {
		return profileService.join(uid);
	}
	
}
