package com.ssafy.project.model.user;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "location")
public class Location {

	@EmbeddedId
	private LocationId locationid;

	@Column(name = "address")
	private String address;

	@Column(name = "latitude")
	private double latitude;

	@Column(name = "longitude")
	private double longitude;

}
