package com.ssafy.project.model.user;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "ggomjilak")
public class Ggomjilak {

	@Id
	@Column(name = "uid")
	private String uid;

	@Column(name = "email")
	private String email;

	@Column(name = "nickname")
	private String nickname;

}
