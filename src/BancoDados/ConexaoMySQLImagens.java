package BancoDados;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class ConexaoMySQLImagens {
	/*
	 * Classe responsável por abrir e fechar conexões com o banco de dados MySQL relacionado às fotos dos produtos
	 * Utiliza o Design Pattern Singleton
	 * */
	
	static final String SERVIDOR = "localhost"; // configurar ip do servidor caso for rodar em rede
	static final String LOGIN = "root";
	static final String SENHA = "----";
	static final String PORTA = "3306";
	
	static final String BANCO = "scan_me_products_images";
	static final String JDBC = "com.mysql.cj.jdbc.Driver";
	// URL configurada com o horário brasileiro
	static final String URL = "jdbc:mysql://" + SERVIDOR + ":" + PORTA + "/" + BANCO + "?useTimezone=true&serverTimezone=UTC";
	
	public static Connection AbrirConexao() {
		/*
		 * Abre conexão com banco de dados
		 * Assintótica: O(1)
		 * */
		try {
			Class.forName(JDBC);
			Connection conexao = DriverManager.getConnection(URL, LOGIN, SENHA);
			return conexao;
		} 
		catch (ClassNotFoundException e) { e.printStackTrace(); } 
		catch (SQLException e) { e.printStackTrace(); }
		
		return null;
	}
	
	public static void FecharConexao(Connection conexao) {
		/*
		 * Fecha conexão com o banco
		 * Assintótica: O(1)
		 * */
		try { conexao.close(); } catch (SQLException e) { e.printStackTrace(); }
	}
}