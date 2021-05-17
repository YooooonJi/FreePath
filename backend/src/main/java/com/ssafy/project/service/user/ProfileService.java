package com.ssafy.project.service.user;

import java.util.List;
import org.springframework.http.ResponseEntity;
import com.ssafy.project.model.user.Custom;
import com.ssafy.project.model.user.Location;
import com.ssafy.project.model.user.LocationRequest;

public interface ProfileService {

	public ResponseEntity<String> join(String uid);

	public ResponseEntity<Custom> getCustom(String uid);

	public ResponseEntity<List<Location>> getLocation(String uid);

	public ResponseEntity<Custom> updateCustom(Custom customRequest);

	public ResponseEntity<Location> updateLocation(LocationRequest locationRequest);
	
	public ResponseEntity<String> delete(String uid);
}
