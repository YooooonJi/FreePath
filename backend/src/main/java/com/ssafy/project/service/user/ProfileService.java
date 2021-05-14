package com.ssafy.project.service.user;

import org.springframework.http.ResponseEntity;

public interface ProfileService {

	public Object findAll();
	
	public ResponseEntity<String> join(String uid);
}
