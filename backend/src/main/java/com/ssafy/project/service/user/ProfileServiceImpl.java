package com.ssafy.project.service.user;

import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.ssafy.project.dao.user.CustomDao;
import com.ssafy.project.dao.user.LocationDao;
import com.ssafy.project.model.user.Custom;
import com.ssafy.project.model.user.Location;
import com.ssafy.project.model.user.LocationId;
import com.ssafy.project.model.user.LocationRequest;

@Service
public class ProfileServiceImpl implements ProfileService {

	@Autowired
	private CustomDao customDao;

	@Autowired
	private LocationDao locationDao;

	public static final Logger logger = LoggerFactory.getLogger(ProfileServiceImpl.class);

	@Override
	public ResponseEntity<String> join(String uid) {

		String isOk = "등록이 안된 것 같네요!";
		HttpStatus status = null;

		Custom aleardyExistCustom = customDao.findCustomByUid(uid);
		List<Location> locationList = locationDao.findAllLocationsByLocationidUid(uid);

		try {
			/* 가입시, 사용자의 추가 정보 입력 */
			if (aleardyExistCustom == null) {
				Custom custom = new Custom();
				custom.setUid(uid);
				custom.setSpeed(4);
				custom.setSparetime(5);
				customDao.save(custom);

				isOk = "등록 완료!";
			}

			/* 가입시, 사용자의 기본 정보(장소 즐겨찾기) 등록 */
			if (locationList.isEmpty()) {
				for (int i = 1; i <= 4; i++) {
					LocationId locationId = new LocationId();
					locationId.setUid(uid);
					locationId.setLacationtype(i);

					Location location = new Location();
					location.setLocationid(locationId);

					locationDao.save(location);
				}
				isOk = "등록 완료!";
			}

			status = HttpStatus.OK;
		} catch (Exception e) {
			logger.error("정보 등록 실패 : {}", e);
			status = HttpStatus.INTERNAL_SERVER_ERROR;
		}

		return new ResponseEntity<String>(isOk, status);
	}

	@Override
	public ResponseEntity<Custom> getCustom(String uid) {

		HttpStatus status = null;
		Custom custom = null;

		try {
			custom = customDao.findCustomByUid(uid);
			status = HttpStatus.OK;
		} catch (Exception e) {
			logger.error("사용자 추가 정보 읽어오기 실패 : {}", e);
			status = HttpStatus.INTERNAL_SERVER_ERROR;
		}

		return new ResponseEntity<Custom>(custom, status);
	}

	@Override
	public ResponseEntity<List<Location>> getLocation(String uid) {

		HttpStatus status = null;
		List<Location> locationList = null;

		try {
			locationList = locationDao.findAllLocationsByLocationidUid(uid);
			status = HttpStatus.OK;
		} catch (Exception e) {
			logger.error("사용자 장소 즐겨찾기 정보 읽어오기 실패 : {}", e);
			status = HttpStatus.INTERNAL_SERVER_ERROR;
		}

		return new ResponseEntity<List<Location>>(locationList, status);
	}

	@Override
	public ResponseEntity<Custom> updateCustom(Custom customRequest) {

		HttpStatus status = null;
		Optional<Custom> customOpt = customDao.findOptionalByUid(customRequest.getUid());
		Custom custom = null;

		try {
			customOpt.ifPresent(selectCustom -> {
				selectCustom.setSpeed(customRequest.getSpeed());
				selectCustom.setFavorites(customRequest.getFavorites());
				selectCustom.setPriority(customRequest.getPriority());
				selectCustom.setSparetime(customRequest.getSparetime());

				customDao.save(selectCustom);
			});

			custom = customDao.findCustomByUid(customRequest.getUid());
			status = HttpStatus.OK;
		} catch (Exception e) {
			logger.error("사용자 추가 정보 업데이트 실패 : {}", e);
			status = HttpStatus.INTERNAL_SERVER_ERROR;
		}

		return new ResponseEntity<Custom>(custom, status);
	}

	@Override
	public ResponseEntity<Location> updateLocation(LocationRequest locationRequest) {

		HttpStatus status = null;
		Location location = null;
		LocationId locationId = new LocationId(locationRequest.getLocationtype(), locationRequest.getUid());
		Optional<Location> locationOpt = locationDao.findOptionalByLocationid(locationId);

		try {
			locationOpt.ifPresent(selectLocation -> {
				selectLocation.setAddress(locationRequest.getAddress());
				selectLocation.setLatitude(locationRequest.getLatitude());
				selectLocation.setLongitude(locationRequest.getLongitude());

				locationDao.save(selectLocation);
			});

			location = locationDao.findLocationByLocationid(locationId);
			status = HttpStatus.OK;
		} catch (Exception e) {
			logger.error("사용자 장소 즐겨찾기 정보 업데이트 실패 : {}", e);
			status = HttpStatus.INTERNAL_SERVER_ERROR;
		}

		return new ResponseEntity<Location>(location, status);
	}

	@Override
	public ResponseEntity<String> delete(String uid) {
		HttpStatus status = null;
		String isDelete = "삭제가 되지 않았습니다.";
		
		Custom custom = customDao.findCustomByUid(uid);
		List<Location> locationList = locationDao.findAllLocationsByLocationidUid(uid);

		try {
			if(custom != null) {
				customDao.delete(custom);
				isDelete = "삭제 완료!";
			}
			
			if(!locationList.isEmpty()) {
				for (Location location : locationList) {
					locationDao.delete(location);
				}
			}
			
			status = HttpStatus.OK;
		} catch (Exception e) {
			logger.error("사용자 정보 삭제 실패 : {}", e);
			status = HttpStatus.INTERNAL_SERVER_ERROR;
		}

		return new ResponseEntity<String>(isDelete, status);

	}


}
