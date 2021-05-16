package com.ssafy.project.model.user;

import lombok.Data;

@Data
public class CustomRequest {
	
	private String uid;

	private int speed;
	
	private int favorites;
	
	private int priority;
	
	private int sparetime;
	
}
