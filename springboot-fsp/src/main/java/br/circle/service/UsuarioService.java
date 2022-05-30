package br.circle.service;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;

import org.apache.commons.io.IOUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import br.circle.domain.entity.PerfilEnum;
import br.circle.domain.entity.Usuario;
import br.circle.domain.repository.UsuarioRepository;
import br.circle.dto.RegistroDTO;
import br.circle.dto.UsuarioDTO;

@Service
public class UsuarioService implements UserDetailsService {

	@Autowired
	private UsuarioRepository usuarioRepository;

	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Optional<Usuario> optUsuario = usuarioRepository.findByEmail(username);

		if (!optUsuario.isPresent())
			throw new UsernameNotFoundException(username);

		Usuario usuario = optUsuario.get();

		Collection<GrantedAuthority> perfis = new ArrayList<>();

		for (PerfilEnum perfil : usuario.getPerfis())
			perfis.add(new SimpleGrantedAuthority(perfil.name()));

		return new User(usuario.getEmail(), usuario.getSenha(), perfis);
	}

	public void registrar(RegistroDTO dto) throws Exception {
		if (usuarioRepository.findByEmail(dto.getEmail()).isPresent())
			throw new Exception("Email já cadastrado.");

		var usuario = new Usuario();
		BeanUtils.copyProperties(dto, usuario);
		usuario.setSenha(bCryptPasswordEncoder.encode(dto.getSenha()));
		usuario.getPerfis().add(PerfilEnum.USER);
		usuarioRepository.save(usuario);
	}

	public List<UsuarioDTO> consultarLista() {
		return usuarioRepository.findAll().stream()
				.map(usuario -> new UsuarioDTO(usuario.getId(), usuario.getEmail(), usuario.getNome(),
						usuario.getPerfis().stream().map(perfil -> perfil.toString()).collect(Collectors.toList())))
				.collect(Collectors.toList());
	}

	public void atualizarPerfis(UsuarioDTO dto) {
		var usuario = usuarioRepository.findById(dto.getId()).get();
		usuario.getPerfis().clear();
		dto.getPerfis().forEach(perfil -> usuario.getPerfis().add(PerfilEnum.valueOf(perfil)));
		usuarioRepository.save(usuario);
	}

	public byte[] getFoto(Integer idUSuario) {
		return usuarioRepository.findById(idUSuario).orElseThrow(() -> new NoSuchElementException()).getFoto();
	}

	public UsuarioDTO consultar(Integer id) {
		var usuario = usuarioRepository.findById(id).orElseThrow(() -> new NoSuchElementException());
		var dto = new UsuarioDTO();
		BeanUtils.copyProperties(usuario, dto);
		dto.setPerfis(usuario.getPerfis().stream().map(perfil -> perfil.name()).collect(Collectors.toList()));
		return dto;

	}

	public void atualizarUsuario(UsuarioDTO dto, InputStream inputStream, Boolean deleteImagem) throws Exception {

		if (dto.getNome() == null || dto.getNome().isEmpty() || dto.getEmail() == null || dto.getEmail().isEmpty())
			throw new IllegalArgumentException("Nome e email obrigatórios.");
		var usuario = usuarioRepository.findById(dto.getId()).orElseThrow(() -> new NoSuchElementException());

		BeanUtils.copyProperties(dto, usuario);

		if (inputStream != null)
			usuario.setFoto(IOUtils.toByteArray(inputStream));
		else if (deleteImagem != null && deleteImagem)
			usuario.setFoto(null);

		usuarioRepository.save(usuario);

	}

}
