package com.ssafy.project.dao.route;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.ssafy.project.model.route.Subscribe;
import com.ssafy.project.model.route.SubscribeId;

@Repository
public interface SubscribeDao extends JpaRepository<Subscribe, SubscribeId>{

}
