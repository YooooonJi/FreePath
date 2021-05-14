package com.ssafy.project.service.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.ssafy.project.dao.user.CustomDao;

@Service
public class ProfileServiceImpl implements ProfileService{

	@Autowired
	private CustomDao customDao;
	
	@Override
	public Object findAll() {
		return customDao.findAll();
	}

}
