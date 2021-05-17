package com.ssafy.project.controller.route;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.ssafy.project.service.route.SubscribeService;
import io.swagger.annotations.Api;

@Api(tags = "Subscribe", description = "구독 API")
@CrossOrigin
@RestController
@RequestMapping("/subscribe")
public class SubscribeController {

	@Autowired
	private SubscribeService subscribeService;

}
