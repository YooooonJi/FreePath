package com.ssafy.project.dao.user;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.ssafy.project.model.user.Custom;

@Repository
public interface CustomDao extends JpaRepository<Custom, String> {

	Custom findCustomByUid(String uid);

	Optional<Custom> findOptionalByUid(String uid);
}
