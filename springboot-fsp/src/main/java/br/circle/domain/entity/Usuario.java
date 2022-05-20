package br.circle.domain.entity;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.Data;

@Entity
@Data
public class Usuario implements Serializable {

	private static final long serialVersionUID = -6964883374059497280L;
	
	@Id
	private String email;
	
	private String nome;
	
	private String senha;

}
