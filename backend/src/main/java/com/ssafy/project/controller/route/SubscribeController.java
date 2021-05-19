package com.ssafy.project.controller.route;

import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.ssafy.project.model.route.SubscribeRequest;
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

	@ApiOperation(value = "경로 찾기 api")
	@PostMapping("/find")
	public Object findRoute(@Valid @RequestBody SubscribeRequest subscribeRequest) {
		return subscribeService.findRoute(subscribeRequest);
	}
}
