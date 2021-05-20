package com.ssafy.project.model.route;

import java.sql.Timestamp;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "route")
public class Route {

	@Column(name = "routeid")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Id
	private int routeid;

	@Column(name = "uid")
	private String uid;

	@Column(name = "totaltime")
	private int totaltime;

	@Column(name = "startaddress")
	private String startaddress;

	@Column(name = "startlatitude")
	private double startlatitude;

	@Column(name = "startlongitude")
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

	@Column(name = "routeinfo")
	private String routeinfo;

	@Column(name = "groupinfo")
	private int groupinfo;

	@Column(name = "arrivetime")
	private String arrivetime;
	
	@Column(name = "inputtime")
	private String inputtime;
}
