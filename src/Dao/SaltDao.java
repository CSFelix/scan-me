package Dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import BancoDados.ConexaoMySQL;
import Bean.SaltBean;
import Bean.UsuarioBean;
import Seguranca.GeradorHash;

public class SaltDao {
	/*
	 * Clase responsável pela transferência dos dados bean com o banco de dados relacionados ao cálculo e à criação
	 * de Salts para as senhas dos usuários
	 * */
	
	public SaltDao() { }
	
	/*
	 * Métodos Principais (Visíveis)
	 * 
	 * */
	
	public boolean CadastrarSalt(SaltBean salt) {
		/*
		 * Insere registro de salt
		 * Assintótica: O(1)
		 * */
		try {
			String sql = "INSERT INTO salt(uuid_salt, valor_salt, uuid_usuario)"
					   + " VALUES(UUID_TO_BIN(UUID()), ?, UUID_TO_BIN(?));";
			Connection conexao = ConexaoMySQL.AbrirConexao();
			PreparedStatement smtp = conexao.prepareStatement(sql);
			
			smtp.setString(1,salt.getValorSalt());	
			smtp.setString(2, salt.getUuidUsuario());
			smtp.executeUpdate();
			smtp.close();
			ConexaoMySQL.FecharConexao(conexao);
				
			return true;
		}
		catch (SQLException e) { 
			e.printStackTrace(); 
			return false;
		}
	}
	
	public String SelecionarCalcularSaltSenha(UsuarioBean usuario) {
		/*
		 * Seleciona e calcula hash de senha
		 * Assintótica: O(1)
		 * */

		String valor_salt;
		try {
			String sql = "SELECT valor_salt"
					   + " FROM salt"
					   + " WHERE uuid_usuario = UUID_TO_BIN(?);";
			Connection conexao = ConexaoMySQL.AbrirConexao();
			PreparedStatement smtp = conexao.prepareStatement(sql);
			ResultSet rs;
				
			smtp.setString(1, usuario.getUuidUsuario());
			rs = smtp.executeQuery();
			
			// salt encontrado no banco de dados
			if (rs.next()) { 
				valor_salt =  rs.getString("valor_salt");
				smtp.close();
				ConexaoMySQL.FecharConexao(conexao);
				
				return  GeradorHash.CalcularHashSenha(usuario.getSenha(), valor_salt);
			}
			
			// salt não encontrado
			else { return null; }
		}
		catch (SQLException e) { 
			e.printStackTrace(); 
			return null;
		}
	}
}