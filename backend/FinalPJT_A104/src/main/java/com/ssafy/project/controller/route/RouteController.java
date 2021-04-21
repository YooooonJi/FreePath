package com.ssafy.project.controller.route;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.project.service.route.RouteService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@Api(tags = "Route", description = "경로 API")
@CrossOrigin
@RestController
@RequestMapping("/route")
public class RouteController {

	@Autowired
	private RouteService routeService;
	
	@ApiOperation(value = "Api 확인")
	@GetMapping("/api")
	public String readApi() {
		return routeService.readApi();
	}
}
