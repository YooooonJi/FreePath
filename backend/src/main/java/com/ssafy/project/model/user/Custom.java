package com.ssafy.project.model.user;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "custom")
public class Custom {
	
	@Id
	private String uid;
	
	private int speed;
	private int favorites;
	private int priority;
	private int sparetime;
}
