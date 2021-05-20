package com.ssafy.project.controller.route;

import java.util.Map;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.ssafy.project.model.route.Subscribe;
import com.ssafy.project.model.route.SubscribeRequest;
import com.ssafy.project.model.route.SubscribeWithoutRequest;
import com.ssafy.project.service.route.SubscribeService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@Api(tags = "Subscribe", description = "구독 API")
@CrossOrigin
@RestController
@RequestMapping("/subscribe")
public class SubscribeController {

	@Autowired
	private SubscribeService subscribeService;

	@ApiOperation(value = "구독 찾기 api")
	@PostMapping("/find/without")
	public ResponseEntity<Map<String, Object>> findSubscribeWithoutUser(@Valid @RequestBody SubscribeWithoutRequest subscribeWithoutRequest) {
		return subscribeService.findSubscribeWithoutUser(subscribeWithoutRequest);
	}
	
	@ApiOperation(value = "구독 찾기 api")
	@PostMapping("/find/with")
	public ResponseEntity<Subscribe> findSubscribeWithUser(@Valid @RequestBody SubscribeRequest subscribeRequest) {
		return subscribeService.findSubscribeWithUser(subscribeRequest);
	}
}
