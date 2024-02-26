package Seguranca;

import java.util.Random;

public class GeradorHash {
	/*
	 * Classe responsável por gerar salts aleatórios e calcular hash BCrypt de senhas
	 * */
	
	public GeradorHash() { }
	
	private static int ROTATIONS = 7;
	
	public static String GerarSalt() { 
		/*
		 * Geração de Salt Aleatório
		 * Assintótica: O(7) >> O(1)
		 * */
		return BCrypt.gensalt(ROTATIONS);
	}
	
	public static String CalcularHashSenha(String senha, String salt) { 
		/*
		 * Cálculo da Hash BCrypt de senhas
		 * Assintótica: O(1)
		 * */
		return BCrypt.hashpw(senha, salt); 
	}
	
	public static String GerarCodigoAlteracaoSenha(int qnt_digitos) {
		/*
		 * Geração do código de alteração de senha
		 * - Assintótica: (n), sendo "n" a quantidade de dígitos
		 * */
		char[] digitos = new char[] { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9' };
		Random rand = new Random();
		String codigo = "";
		
		for (int i = 0; i < qnt_digitos; i++) { codigo += digitos[rand.nextInt(qnt_digitos)]; }
		
		return codigo;
	}
}