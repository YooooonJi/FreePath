package com.ssafy.project.dao.route;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.ssafy.project.model.route.Subscribe;

@Repository
public interface SubscribeDao extends JpaRepository<Subscribe, Integer> {

	List<Subscribe> findAllByUid(String uid);
	
}
