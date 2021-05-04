package com.ssafy.project;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

import com.ssafy.project.model.api.ApiProperties;

@EnableConfigurationProperties(ApiProperties.class)
@SpringBootApplication
public class FinalPjtA104Application {

	public static void main(String[] args) {
		SpringApplication.run(FinalPjtA104Application.class, args);
	}

}
