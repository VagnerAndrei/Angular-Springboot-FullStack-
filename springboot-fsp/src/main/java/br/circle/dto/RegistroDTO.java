package br.circle.dto;

import java.io.Serializable;

import javax.validation.constraints.NotBlank;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegistroDTO implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 7473020398496922625L;

	@NotBlank
	String email;
	
	@NotBlank
	String nome;

	@NotBlank
	@JsonInclude(value = Include.NON_EMPTY)
	String senha;
	
	
}
