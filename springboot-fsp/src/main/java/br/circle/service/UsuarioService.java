package br.circle.service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import br.circle.domain.entity.Usuario;
import br.circle.domain.repository.UsuarioRepository;
import br.circle.dto.UsuarioDTO;

@Service
public class UsuarioService implements UserDetailsService {

	@Autowired
	private UsuarioRepository usuarioRepository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Optional<Usuario> optUsuario = usuarioRepository.findById(username);

		if (!optUsuario.isPresent())
			throw new UsernameNotFoundException(username);

		Usuario usuario = optUsuario.get();

		Collection<GrantedAuthority> perfis = new ArrayList<>();

//		for (PerfilEnum perfil : usuario.getPerfis())
//			perfis.add(new SimpleGrantedAuthority(perfil.name()));		

		return new User(usuario.getEmail(), usuario.getSenha(), perfis);
	}

	public void registrar(UsuarioDTO dto) {
		var usuario = new Usuario();
		BeanUtils.copyProperties(dto, usuario);
		usuarioRepository.save(usuario);
	}

}
