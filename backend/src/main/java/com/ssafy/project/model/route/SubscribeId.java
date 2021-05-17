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
public class SubscribeId implements Serializable {

	private static final long serialVersionUID = 1L;

	@Column(name = "subscribeid")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int subscribeid;

	@Column(name = "uid")
	private String uid;

}
