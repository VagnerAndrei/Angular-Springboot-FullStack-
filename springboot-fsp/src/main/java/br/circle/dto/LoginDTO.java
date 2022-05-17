package br.circle.dto;

import java.util.List;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class LoginDTO {
	

    private String email;

    private String token;

    private List<String> perfis;

    private String nome;

}
