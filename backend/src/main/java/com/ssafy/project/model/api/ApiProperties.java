package com.ssafy.project.model.api;

import org.springframework.boot.context.properties.ConfigurationProperties;

import lombok.Data;

@ConfigurationProperties("api")
@Data
public class ApiProperties {

	private String key;
	
}
