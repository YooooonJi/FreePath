package com.ssafy.project.dao.route;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.ssafy.project.model.route.Route;

@Repository
public interface RouteDao extends JpaRepository<Route, Integer> {

	@Query(value = "select * from route where uid like %:uid% and groupinfo = 0 ", nativeQuery = true)
	List<Route> findAllByUidWithoutGroupInfo(@Param("uid") String uid);

	@Query(value = "select * from route where uid like %:uid% and groupinfo != 0 ", nativeQuery = true)
	List<Route> findAllByUidWithGroupInfo(@Param("uid") String uid);

	Route findRouteByRouteid(int routeId);
}
