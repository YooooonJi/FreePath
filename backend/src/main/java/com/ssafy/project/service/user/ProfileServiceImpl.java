package com.ssafy.project.service.user;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.ssafy.project.dao.user.CustomDao;
import com.ssafy.project.model.user.Custom;

@Service
public class ProfileServiceImpl implements ProfileService{

	@Autowired
	private CustomDao customDao;
	
	public static final Logger logger = LoggerFactory.getLogger(ProfileServiceImpl.class);
	
	@Override
	public Object findAll() {
		return customDao.findAll();
	}

	@Override
	public ResponseEntity<String> join(String uid) {
		
		String isOk = "등록이 안된 것 같네요!";
		HttpStatus status = null;
		
		Custom aleardyExistCustom = customDao.findCustomByUid(uid);
		
		try {
			/* 가입시, 사용자의 추가 정보 입력 */
			if(aleardyExistCustom == null) {
				Custom custom = new Custom();
				custom.setUid(uid);
				custom.setSpeed(4);
				custom.setSparetime(5);
				customDao.save(custom);
				
				isOk = "등록 완료!";
			}
			
			/* 가입시, 사용자의 기본 정보(장소 즐겨찾기) 등록 */
			
			
			status = HttpStatus.OK;
			
		} catch (Exception e) {
			logger.error("정보 등록 실패 : {}", e);
		}
		
		
		return new ResponseEntity<String>(isOk, status);
	}

	
}
