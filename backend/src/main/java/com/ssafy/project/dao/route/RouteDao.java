package com.ssafy.project.dao.route;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.ssafy.project.model.route.Route;
import com.ssafy.project.model.route.RouteId;

@Repository
public interface RouteDao extends JpaRepository<Route, RouteId>{

}
