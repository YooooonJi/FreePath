package com.ssafy.project.service.user;

import java.util.Map;
import org.springframework.http.ResponseEntity;
import com.ssafy.project.model.user.Custom;
import com.ssafy.project.model.user.Location;
import com.ssafy.project.model.user.LocationRequest;
import com.ssafy.project.model.user.Ggomjilak;

public interface ProfileService {

	public ResponseEntity<String> join(Ggomjilak user);

	public ResponseEntity<Map<String, Object>> getTotal(String uid);

	public ResponseEntity<Custom> updateCustom(Custom customRequest);

	public ResponseEntity<Location> updateLocation(LocationRequest locationRequest);

	public ResponseEntity<String> delete(String uid);
}
