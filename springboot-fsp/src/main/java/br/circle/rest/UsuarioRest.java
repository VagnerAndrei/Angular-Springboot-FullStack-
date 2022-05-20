package br.circle.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import br.circle.dto.UsuarioDTO;
import br.circle.service.UsuarioService;

@RestController
@RequestMapping("/usuarios")
public class UsuarioRest {
	
	@Autowired
	private UsuarioService usuarioService;
	
	@PostMapping
	@ResponseStatus(value = HttpStatus.CREATED)
	public void registrar(UsuarioDTO registro) {
		usuarioService.registrar(registro);
	}

}
