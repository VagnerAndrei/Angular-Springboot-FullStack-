package br.circle.rest;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import br.circle.dto.UsuarioDTO;
import br.circle.service.UsuarioService;

@RestController
@RequestMapping(value = "/usuarios", produces = MediaType.APPLICATION_JSON_VALUE)
public class UsuarioRest {

	@Autowired
	private UsuarioService usuarioService;

	@PostMapping
	@ResponseStatus(value = HttpStatus.CREATED)
	public void registrar(@Valid @RequestBody UsuarioDTO registro) throws Exception {
		usuarioService.registrar(registro);
	}

	@GetMapping
	@PreAuthorize("hasAuthority('ADMIN')")
	public List<UsuarioDTO> consultarListaAdmin() throws Exception {
		return usuarioService.consultarLista();
	}

	@PutMapping("/perfis")
	@PreAuthorize("hasAuthority('ADMIN')")
	@ResponseStatus(value = HttpStatus.ACCEPTED)
	public void consultarPerfis(@RequestBody UsuarioDTO usuario) throws Exception {

		usuarioService.atualizarPerfis(usuario);
	}

}
