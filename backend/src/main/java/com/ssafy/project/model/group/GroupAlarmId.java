package com.ssafy.project.model.group;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@Data
@Embeddable
@NoArgsConstructor
public class GroupAlarmId implements Serializable {

	private static final long serialVersionUID = 1L;

	@Column(name = "groupid")
	private int groupid;

	@Column(name = "uid")
	private String uid;

}
