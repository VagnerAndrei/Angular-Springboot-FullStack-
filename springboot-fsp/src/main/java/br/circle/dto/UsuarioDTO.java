package br.circle.dto;

import java.io.Serializable;
import java.util.List;

import javax.validation.constraints.NotBlank;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

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

	Integer id;
	
	@NotBlank
	String email;
	
	@NotBlank
	String nome;

	@NotBlank
	@JsonInclude(value = Include.NON_EMPTY)
	String senha;
	
	List<String> perfis;

	public UsuarioDTO(Integer id, String email, String nome, List<String> perfis) {
		super();
		this.id = id;
		this.email = email;
		this.nome = nome;
		this.perfis = perfis;
	}
	
}
