package BancoDados;

import org.neo4j.driver.AuthTokens;
import org.neo4j.driver.Driver;
import org.neo4j.driver.GraphDatabase;

public class ConexaoNeo4J {
	/*
	 * Classe responsável por abrir e fechar conexões com o banco de dados Neo4J relacionado aos usuários, produtos
	 * e seus relacionamentos
	 * Utiliza o Design Pattern Singleton
	 * */
	
	static final String SERVIDOR = "localhost"; // configurar ip do servidor caso for rodar em rede
	static final String LOGIN = "neo4j";
	static final String SENHA = "----";
	static final String PORTA = "7687";
	static final String URL = "bolt://" + SERVIDOR + ":" + PORTA;
	
	public static Driver AbrirConexao() {
		/*
		 * Abertura da Conexão com o Banco
		 * - Assintótica: O(1)
		 * */
		try { return GraphDatabase.driver(URL, AuthTokens.basic(LOGIN, SENHA)); }
		catch (Exception e) { e.printStackTrace(); }
		return null;
	}
	
	public static void FecharConexao(Driver driver) { 
		/*
		 * Fechamento da Conexão
		 * - Assintótica: O(1)
		 * */
		driver.close(); 
	}
}