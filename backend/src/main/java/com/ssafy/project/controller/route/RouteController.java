package com.ssafy.project.controller.route;

import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.ssafy.project.model.route.Route;
import com.ssafy.project.model.route.RouteFindRequest;
import com.ssafy.project.model.route.RouteFindWithoutRequest;
import com.ssafy.project.service.route.FinalRouteService;
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

	@Autowired
	private FinalRouteService finalRouteService;

	@ApiOperation(value = "경로 찾기 api")
	@PostMapping("/find")
	public Object findRoute(@Valid @RequestBody RouteFindRequest routeFindRequest) {
		return routeService.findRoute(routeFindRequest);
	}

	@ApiOperation(value = "막차 경로 찾기 api without User")
	@PostMapping("/findLast/without")
	public ResponseEntity<Map<String, Object>> findLastWithoutUser(@Valid @RequestBody RouteFindWithoutRequest routeFindWithoutRequest) {
		return finalRouteService.findLastWithoutUser(routeFindWithoutRequest);
	}

	@ApiOperation(value = "막차 경로 찾기 api with User")
	@PostMapping("/findLast/with")
	public ResponseEntity<Route> findLastWithUser(@Valid @RequestBody RouteFindRequest routeFindRequest) {
		return finalRouteService.findLastWithUser(routeFindRequest);
	}

	@ApiOperation(value = "그룹 정보를 포함하지 않는 경로 정보 가져오기")
	@GetMapping("/info/{uid}")
	public ResponseEntity<List<Route>> info(@PathVariable("uid") String uid) {
		return finalRouteService.info(uid);
	}

	@ApiOperation(value = "그룹 정보를 포함하는 경로 정보 가져오기")
	@GetMapping("/info/group/{uid}")
	public ResponseEntity<List<Route>> infoGroup(@PathVariable("uid") String uid) {
		return finalRouteService.infoGroup(uid);
	}

	@ApiOperation(value = "경로 정보 삭제하기")
	@DeleteMapping("/delete/{routeId}")
	public ResponseEntity<String> delete(@PathVariable("routeId") int routeId) {
		return finalRouteService.delete(routeId);
	}
}
