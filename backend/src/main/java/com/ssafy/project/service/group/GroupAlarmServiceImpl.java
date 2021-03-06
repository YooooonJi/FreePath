package com.ssafy.project.service.group;

import java.util.ArrayList;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.ssafy.project.dao.group.GroupAlarmDao;
import com.ssafy.project.dao.user.GgomjilakDao;
import com.ssafy.project.model.group.GroupAlarm;
import com.ssafy.project.model.group.GroupAlarmId;
import com.ssafy.project.model.group.GroupRequest;
import com.ssafy.project.model.user.Ggomjilak;

@Service
public class GroupAlarmServiceImpl implements GroupAlarmService {

	@Autowired
	private GroupAlarmDao groupAlarmDao;

	@Autowired
	private GgomjilakDao ggomjilakDao;

	public static final Logger logger = LoggerFactory.getLogger(GroupAlarmServiceImpl.class);

	@Override
	public ResponseEntity<Integer> makeGroup(GroupRequest groupRequest) {

		HttpStatus status = null;
		int tempGroupId = (int) groupAlarmDao.countAllGroupByGroupId() + 1;

		try {
			List<String> uids = groupRequest.getUids();

			for (String uid : uids) {
				GroupAlarmId groupId = new GroupAlarmId(tempGroupId, uid);
				GroupAlarm group = new GroupAlarm();

				group.setGroupalarmid(groupId);
				group.setGalarmcnt(0);

				groupAlarmDao.save(group);
			}

			status = HttpStatus.OK;
		} catch (Exception e) {
			logger.error("그룹 등록 실패 : {}", e);
			status = HttpStatus.INTERNAL_SERVER_ERROR;
		}

		return new ResponseEntity<Integer>(tempGroupId, status);
	}

	@Override
	public ResponseEntity<GroupAlarm> takeGroup(String uid) {
		HttpStatus status = null;
		GroupAlarm groupAlarm = null;

		try {
			groupAlarm = groupAlarmDao.findGroupAlarmByGroupalarmidUid(uid);

			status = HttpStatus.OK;
		} catch (Exception e) {
			logger.error("그룹 등록 실패 : {}", e);
			status = HttpStatus.INTERNAL_SERVER_ERROR;
		}

		return new ResponseEntity<GroupAlarm>(groupAlarm, status);
	}

	@Override
	public ResponseEntity<List<Ggomjilak>> getMember(String uid) {

		HttpStatus status = null;
		List<Ggomjilak> resultList = new ArrayList<Ggomjilak>();

		try {
			GroupAlarm groupAlarm = groupAlarmDao.findGroupAlarmByGroupalarmidUid(uid);
			List<GroupAlarm> groupMemberList = groupAlarmDao.findAllByGroupalarmidGroupid(groupAlarm.getGroupalarmid().getGroupid());

			for (GroupAlarm member : groupMemberList) {
				resultList.add(ggomjilakDao.findGgomjilakByUid(member.getGroupalarmid().getUid()));
			}

			status = HttpStatus.OK;
		} catch (Exception e) {
			logger.error("그룹 멤버 검색 실패 : {}", e);
			status = HttpStatus.INTERNAL_SERVER_ERROR;
		}

		return new ResponseEntity<List<Ggomjilak>>(resultList, status);
	}

}
