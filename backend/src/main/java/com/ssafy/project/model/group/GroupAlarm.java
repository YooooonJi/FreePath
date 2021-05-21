package com.ssafy.project.model.group;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "groupalarm")
public class GroupAlarm {

	@EmbeddedId
	private GroupAlarmId groupalarmid;

	@Column(name = "galarmcnt")
	private int galarmcnt;

}
