package br.circle.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.circle.domain.entity.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, String>{

}
