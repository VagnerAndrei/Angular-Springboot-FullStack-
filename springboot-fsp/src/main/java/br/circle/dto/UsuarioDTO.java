package br.circle.dto;

import java.io.Serializable;
import java.util.List;

import javax.validation.constraints.NotBlank;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UsuarioDTO implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 7473020398496922625L;

	@NotBlank
	Integer id;
	
	@NotBlank
	String email;
	
	@NotBlank
	String nome;

	List<String> perfis;
	
	
}
