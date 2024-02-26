package Seguranca;

import java.util.regex.Pattern;

public class StripHTML {
	/*
	 * Classe responsável por realizar o processo de Strip em Strings
	 * a fim de evitar HTML e JS Injection. 
	 * 
	 * - OBS.: o SQL Injection já está sendo evitado nas classes DAO's
	 * por meio do uso do Prepared Statement e pelo método StripString
	 * */
	
	
	/* Constantes Públicas 
	 * - Presentes na propriedade 'pattern' dos inputs
	 */
	public static final String REGEX_EMAIL = "[a-zA-Z0-9_@.]{5,250}";
	public static final String REGEX_NICKNAME = "[a-zA-Z0-9çáéíóúâêîôûàèìòùãõ_ ]{5,250}";
	public static final String REGEX_SENHA = "[a-zA-Z0-9çáéíóúâêîôûàèìòùãõ_]{5,60}";
	public static final String REGEX_WHATSAPP = "[0-9]{11,12}";
	public static final String REGEX_TELEGRAM = "[0-9]{11,12}";
	public static final String REGEX_ID_TELEGRAM = "[0-9]{10,12}";
	public static final String REGEX_CODIGO_ALTERACAO_SENHA = "[0-9]{6,6}";
	
	public static final String REGEX_NOME_PRODUTO = "[A-Za-z0-9,çáéíóúâêîôûãõñàèìòù_*+/=- ]{3,250}";
	public static final String REGEX_VALOR_ESTOQUE_PRODUTO = "[0-9,.]{0,}";
	public static final String REGEX_DESCRICAO_PRODUTO = "[A-Za-z0-9,áéíóúâêîôûãõñàèìòùç_*+/=- ]{0,500}";
	
	/* Constantes Privadas
	 * - Presentes apenas nos métodos internos de verificação daqui
	 * 
	 * TO-DO: estudar os métodos OWASP para nomes e senhas a fim de melhorar a segurança
	 * interna.
	 * */
	private static final String OWASP_REGEX_EMAIL = "^[a-zA-Z0-9_+&*-]+(?:\\." 
            								      + "[a-zA-Z0-9_+&*-]+)*@" 
            								      + "(?:[a-zA-Z0-9-]+\\.)+[a-z"
            								      + "A-Z]{2,7}$";
	
	/*
	 * Métodos de Verificação Avançada
	 * 
	 * Eles são utilizados para evitar o problema do usuário ter
	 * desativado o JavaScript do Navegador e os inputs serem aceitos
	 * mesmo ficando fora do padrão RegEx. Segurança máxima aqui rsrs 
	 * */
	public static String StripString(String dado) { 
		/*
		 * Substitui todos os caracteres que fornecem SQL Injection por underline
		 * Assintótica: O(1)
		 * */
		return dado.replaceAll("\\<.*?\\>", "_");
	}
	
	public static boolean VerificaEmail(String email) {
		/*
		 * Verifica se email segue padrão do Owasp
		 * Assintótica: O(1)
		 * */
		Pattern pat = Pattern.compile(OWASP_REGEX_EMAIL); 
        if (email == null) { return false; } 
        else { return pat.matcher(email).matches(); }  
	}
}