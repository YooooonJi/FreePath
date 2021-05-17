package com.ssafy.project.dao.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.ssafy.project.model.user.Ggomjilak;

@Repository
public interface GgomjilakDao extends JpaRepository<Ggomjilak, String> {

	Ggomjilak findGgomjilakByUid(String uid);

}
