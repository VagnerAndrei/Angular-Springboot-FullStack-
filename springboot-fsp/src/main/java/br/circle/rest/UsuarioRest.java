package br.circle.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.circle.service.UsuarioService;

@RestController
@RequestMapping("/usuarios")
public class UsuarioRest {
	
	@Autowired
	private UsuarioService usuarioService;

}
