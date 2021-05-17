package com.ssafy.project.controller.user;

import java.util.List;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.ssafy.project.model.user.Custom;
import com.ssafy.project.model.user.Location;
import com.ssafy.project.model.user.LocationRequest;
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

	@ApiOperation(value = "사용자 회원가입시, 장소 즐겨찾기 및 추가 정보 등록")
	@PostMapping("/join/{uid}")
	public ResponseEntity<String> join(@PathVariable("uid") String uid) {
		return profileService.join(uid);
	}

	@ApiOperation(value = "사용자의 장소 즐겨찾기 정보 전달")
	@GetMapping("/location/{uid}")
	public ResponseEntity<List<Location>> getLocation(@PathVariable("uid") String uid) {
		return profileService.getLocation(uid);
	}

	@ApiOperation(value = "사용자의 추가 정보 전달")
	@GetMapping("/custom/{uid}")
	public ResponseEntity<Custom> getCustom(@PathVariable("uid") String uid) {
		return profileService.getCustom(uid);
	}

	@ApiOperation(value = "사용자의 추가 정보 수정")
	@PutMapping("/update/custom/")
	public ResponseEntity<Custom> updateCustom(@Valid @RequestBody Custom customRequest) {
		return profileService.updateCustom(customRequest);
	}

	@ApiOperation(value = "사용자의 장소 즐겨찾기 수정")
	@PutMapping("/update/location")
	public ResponseEntity<Location> updateLocation(@Valid @RequestBody LocationRequest locationRequest) {
		return profileService.updateLocation(locationRequest);
	}
	
	@ApiOperation(value = "사용자의 정보 삭제")
	@DeleteMapping("/delete/{uid}")
	public ResponseEntity<String> delete(@PathVariable("uid") String uid) {
		return profileService.delete(uid);
	}
}
