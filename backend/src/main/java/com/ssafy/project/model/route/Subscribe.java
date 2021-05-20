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
@Table(name = "subscribe")
public class Subscribe {

	@Column(name = "subscribeid")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Id
	private int subscribeid;

	@Column(name = "uid")
	private String uid;

	@Column(name = "totaltime")
	private int totaltime;

	@Column(name = "busno")
	private int busno;
	
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

	@Column(name = "arrivetime")
	private String arrivetime;
	
}
