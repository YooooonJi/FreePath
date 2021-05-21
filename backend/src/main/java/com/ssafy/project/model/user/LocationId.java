package com.ssafy.project.model.user;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@Data
@Embeddable
@NoArgsConstructor
public class LocationId implements Serializable {

	private static final long serialVersionUID = 1L;

	@Column(name = "locationtype")
	private int lacationtype;

	@Column(name = "uid")
	private String uid;

}
