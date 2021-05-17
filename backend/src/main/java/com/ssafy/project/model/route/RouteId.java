package com.ssafy.project.model.route;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@Data
@Embeddable
@NoArgsConstructor
public class RouteId implements Serializable {

	private static final long serialVersionUID = 1L;

	@Column(name = "routeid")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int routeid;

	@Column(name = "uid")
	private String uid;

}
