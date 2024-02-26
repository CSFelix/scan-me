package BancoDados;

import redis.clients.jedis.Jedis;

public class ConexaoRedis {
	/*
	 * Classe responsável por abrir e fechar conexões com o banco de dados MySQL relacionados às informações dos usuários
	 * Utiliza o Design Pattern Singleton
	 * */
	
	public static Jedis AbrirConexao() {
		/*
		 * Abre conexão com banco de dados
		 * Assintótica: O(1)
		 * */
		
		try { 
			Jedis conexao = new Jedis();
			return conexao; 
		} 
		catch (Exception e) { e.printStackTrace(); }
		return null;
	}
	
	public static void FecharConexao(Jedis conexao) {
		/*
		 * Fecha conexão com o banco
		 * Assintótica: O(1)
		 * */
		try { conexao.close(); } catch (Exception e) { e.printStackTrace(); }
	}
}
