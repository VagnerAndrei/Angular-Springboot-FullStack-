package br.circle.rest;

import java.io.InputStream;
import java.util.Arrays;
import java.util.List;
import java.util.NoSuchElementException;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import br.circle.dto.RegistroDTO;
import br.circle.dto.UsuarioDTO;
import br.circle.service.UsuarioService;

@RestController
@RequestMapping(value = "/usuarios", produces = MediaType.APPLICATION_JSON_VALUE)
public class UsuarioRest {

	@Autowired
	private UsuarioService usuarioService;

	@PostMapping
	@ResponseStatus(value = HttpStatus.CREATED)
	public void registrar(@Valid @RequestBody RegistroDTO registro) throws Exception {
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
	public void atualizarPerfis(@RequestBody UsuarioDTO usuario) throws Exception {
		usuarioService.atualizarPerfis(usuario);
	}

	@GetMapping(value = "/{id}")
	public UsuarioDTO consultar(@PathVariable Integer id) throws Exception {
		return usuarioService.consultar(id);
	}

	@PutMapping(path = "/{id}")
	@PreAuthorize("hasAuthority('USER')")
	@ResponseStatus(value = HttpStatus.ACCEPTED)
	public void editarUsuario(MultipartFile imagem, UsuarioDTO usuario, Boolean deleteImagem) throws Exception {

		InputStream inputStream = null;
		final String[] fotoFormatos = { "image/png", "image/jpg", "image/jpeg", "image/bmp" };

		if (imagem != null) {
			inputStream = imagem.getInputStream();
			if (!Arrays.asList(fotoFormatos).contains(imagem.getContentType()))
				throw new Exception("Formato da imagem inválido");
		}

		usuarioService.atualizarUsuario(usuario, inputStream, deleteImagem);

	}

	@GetMapping(value = "/{id}/foto", produces = { MediaType.IMAGE_JPEG_VALUE, MediaType.IMAGE_PNG_VALUE,
			MediaType.IMAGE_GIF_VALUE })
	public @ResponseBody byte[] getFoto(@PathVariable Integer id) throws Exception {
		return usuarioService.getFoto(id);
	}

	@ExceptionHandler(NoSuchElementException.class)
	@ResponseStatus(HttpStatus.NOT_FOUND)
	protected void onInfracaoException() {

	}

}
