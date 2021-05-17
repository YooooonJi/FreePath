package com.ssafy.project.model.user;

import lombok.Data;

@Data
public class LocationRequest {

	private String uid;

	private int locationtype;

	private String address;

	private double latitude;

	private double longitude;

}
