package br.circle.domain.entity;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Basic;
import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;

import lombok.Data;

@Entity
@Data
public class Usuario implements Serializable {

	private static final long serialVersionUID = -6964883374059497280L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@Column(unique = true, length = 70, nullable = false)
	private String email;
	
	@Column(length = 100, nullable = false)
	private String nome;
	
	@Column(length = 60, nullable = false)
	private String senha;
	
	@Enumerated(EnumType.STRING)
	@ElementCollection(targetClass = PerfilEnum.class, fetch = FetchType.EAGER)
	@CollectionTable(name = "USUARIO_PERFIS", joinColumns = @JoinColumn(name = "id_usuario", referencedColumnName = "id" ))
	@Column(name = "perfil", nullable = false, length = 5)
	private List<PerfilEnum> perfis = new ArrayList<PerfilEnum>();
	
	@Basic(fetch = FetchType.LAZY)
	@Lob
	private byte[] foto;

}
