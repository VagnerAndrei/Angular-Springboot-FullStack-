package br.circle;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class Teste {
	
	public static void main(String[] args) {
		BCryptPasswordEncoder bc = new BCryptPasswordEncoder();
		System.out.println(bc.matches("x5k23d", bc.encode("x5k23d")));
		System.out.println(bc.encode("x5k23d"));
	}

}
