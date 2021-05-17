package com.ssafy.project.model.user;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "custom")
public class Custom {
	
	@Id
	@Column(name = "uid")
	private String uid;
	
	@Column(name = "speed")
	private int speed;
	
	@Column(name = "favorites")
	private int favorites;
	
	@Column(name = "priority")
	private int priority;
	
	@Column(name = "sparetime")
	private int sparetime;
}
