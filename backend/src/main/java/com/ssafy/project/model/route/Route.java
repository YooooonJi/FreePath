package com.ssafy.project.model.route;

import java.sql.Timestamp;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "route")
public class Route {

	@EmbeddedId
	private RouteId routeId;

	@Column(name = "totaltime")
	private int totaltime;

	@Column(name = "startaddress")
	private String startaddress;

	@Column(name = "startlatitude")
	private double startlatitude;

	@Column(name = "longitude")
	private double startlongitude;

	@Column(name = "endaddress")
	private String endaddress;

	@Column(name = "endlatitude")
	private double endlatitude;

	@Column(name = "endlongitude")
	private double endlongitude;

	@Column(name = "registerdate", insertable = false, updatable = false)
	private Timestamp registerdate;

	@Column(name = "alarmname")
	private String alarmname;

	@Column(name = "startname")
	private String startname;

	@Column(name = "endname")
	private String endname;

	@Column(name = "routeinfo")
	private String routeinfo;
}
