package br.circle.dto;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

import lombok.Data;

@Data
public class UsuarioDTO implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 7473020398496922625L;

	
	String email;
	
	String nome;

	@JsonInclude(value = Include.NON_EMPTY)
	String senha;

}
