package com.ssafy.project.service.route;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.ssafy.project.dao.route.SubscribeDao;

@Service
public class SubscribeServiceImpl implements SubscribeService{
	
	@Autowired
	private SubscribeDao subscribeDao;

	public static final Logger logger = LoggerFactory.getLogger(SubscribeServiceImpl.class);
	
}
