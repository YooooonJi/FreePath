package com.ssafy.project.dao.group;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.ssafy.project.model.group.GroupAlarm;
import com.ssafy.project.model.group.GroupAlarmId;

@Repository
public interface GroupAlarmDao extends JpaRepository<GroupAlarm, GroupAlarmId> {

	@Query(value = "select count(*) from groupalarm group by groupid", nativeQuery = true)
	long countAllGroupByGroupId();

	GroupAlarm findGroupAlarmByGroupalarmidUid(String uid);
}
