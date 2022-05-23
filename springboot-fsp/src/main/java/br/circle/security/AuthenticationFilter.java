package br.circle.security;

import java.io.BufferedOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.fasterxml.jackson.databind.ObjectMapper;

import br.circle.config.SpringApplicationContext;
import br.circle.domain.entity.Usuario;
import br.circle.domain.repository.UsuarioRepository;
import br.circle.dto.LoginDTO;
import br.circle.dto.UsuarioDTO;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

public class AuthenticationFilter extends UsernamePasswordAuthenticationFilter {
	private static Logger logger = LoggerFactory.getLogger(AuthenticationFilter.class);

	private final AuthenticationManager authenticationManager;

	public AuthenticationFilter(AuthenticationManager authenticationManager) {
		this.authenticationManager = authenticationManager;
	}

	@Override
	public Authentication attemptAuthentication(final HttpServletRequest req, final HttpServletResponse res)
			throws AuthenticationException {
		try {

			if (isPreflight(req)) {
				res.setStatus(HttpServletResponse.SC_NO_CONTENT);
			} else {

				UsuarioDTO creds = new ObjectMapper().readValue(req.getInputStream(), UsuarioDTO.class);
				logger.info("Authentication with cpf: {}", creds.getEmail());

				return authenticationManager.authenticate(
						new UsernamePasswordAuthenticationToken(creds.getEmail(), creds.getSenha(), new ArrayList<>()));
			}

			return null;
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

	@Override
	protected void successfulAuthentication(HttpServletRequest req, HttpServletResponse res, FilterChain chain,
			Authentication auth) throws IOException, ServletException {

		String userName = ((User) auth.getPrincipal()).getUsername();

		logger.info("AUTHENTICATED USER: {} ", userName);

		UsuarioRepository usuarioRepository = (UsuarioRepository) SpringApplicationContext.getBean("usuarioRepository");

		Optional<Usuario> optional = usuarioRepository.findByEmail(userName);

		if (!optional.isPresent()) {
			logger.error("Erro ao recuperar usuario da base");
			throw new RuntimeException("Usuario inexistente");
		}

		Usuario usuario = optional.get();

		Map<String, Object> claims = new HashMap<>();
		claims.put("authorities", auth.getAuthorities());

		String token = Jwts.builder().setSubject(userName)
				.setExpiration(new Date(System.currentTimeMillis() + SecurityUtil.EXPIRATION_TIME))
				.signWith(SignatureAlgorithm.HS512, SecurityUtil.getTokenSecret()).addClaims(claims).compact();

		ServletOutputStream stream = res.getOutputStream();

		List<String> perfis = new ArrayList<String>();
		auth.getAuthorities().forEach(perfil -> perfis.add(perfil.toString()));

		LoginDTO success = LoginDTO.builder().token(token).email(userName).nome(usuario.getNome()).perfis(perfis).build();

		ObjectMapper mapper = new ObjectMapper();

		try (BufferedOutputStream out = new BufferedOutputStream(stream)) {
			out.write(mapper.writeValueAsString(success).getBytes());
		}

	}

	private boolean isPreflight(HttpServletRequest request) {
		return "OPTIONS".equals(request.getMethod());
	}

}
