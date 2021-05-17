package com.ssafy.project.model.route;

import java.sql.Timestamp;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "subscribe")
public class Subscribe {

	@EmbeddedId
	private SubscribeId subscribeId;

	@Column(name = "totaltime")
	private int totaltime;

	@Column(name = "address")
	private String address;

	@Column(name = "latitude")
	private double latitude;

	@Column(name = "longitude")
	private double longitude;

	@Column(name = "busno")
	private int busno;

	@Column(name = "busid")
	private int busid;

	@Column(name = "stationname")
	private String stationname;

	@Column(name = "stationid")
	private int stationid;

	@Column(name = "updown")
	private int updown;

	@Column(name = "registerdate", insertable = false, updatable = false)
	private Timestamp registerdate;

	@Column(name = "alarmname")
	private String alarmname;

	@Column(name = "groupinfo")
	private int groupinfo;
}
