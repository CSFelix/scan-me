package Dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import BancoDados.ConexaoMySQL;
import Bean.AlteracaoSenhaBean;
import Bean.UsuarioBean;
import Dao.UsuarioDao;
import Seguranca.GeradorHash;
import Threads.EmailEsqueceuSenhaThread;
import Threads.EmailNovoCodigoAlteracaoSenhaThread;

public class AlteracaoSenhaDao {
	/*
	 * Classe responsável pelas transferências de informações beans e comunicação com o banco de dados relacionados às
	 * requisições de alteração de senhas dos usuários
	 * */
	
	public AlteracaoSenhaDao() {}
	
	/*
	 * Métodos Principais (Visíveis)
	 * 
	 * */
	
	public boolean Cadastrar(AlteracaoSenhaBean alteracao) {
		/*
		 * Insere registro para alteração de senha
		 * Assintótica: O(1)
		 * */
		try {
			ExpirarAlteracoesAnteriores(alteracao.getUuidUsuario());
			
			String sql = "INSERT INTO alteracao_senha(uuid_alteracao_senha, hash_alteracao, codigo, usado, expirado, uuid_usuario)"
						 + " VALUES(UUID_TO_BIN(UUID()), ?, ?, 0, 0, UUID_TO_BIN(?));";
			Connection conexao = ConexaoMySQL.AbrirConexao();
			PreparedStatement smtp = conexao.prepareStatement(sql);
			
			smtp.setString(1, alteracao.getHash());
			smtp.setString(2, alteracao.getCodigo());
			smtp.setString(3, alteracao.getUuidUsuario());
			smtp.executeUpdate();
			smtp.close();
			ConexaoMySQL.FecharConexao(conexao);
			
			// Thread Envio Email
			Thread thread = new Thread(new EmailEsqueceuSenhaThread(alteracao.getEmailUsuario()
					   												, alteracao.getUuidUsuario()
					   												, SelecionarUuidAlterarSenha(alteracao.getHash())
																	, alteracao.getCodigo()
																	, alteracao.getIdioma()));
			thread.start();

			return true;
		}
		catch (SQLException e) { 
			e.printStackTrace(); 
			return false;
		}
	}
	
	public boolean AlterarCodigo(AlteracaoSenhaBean alteracao) {
		/*
		 * Realiza a alteração do código de confirmação da alteração de senha
		 * e o encaminha ao email do usuário
		 * 
		 * - Assintótica: O(1)
		 * */
		try {
			UsuarioDao usuario_dao = new UsuarioDao();
			String sql = "UPDATE alteracao_senha SET"
					   + " codigo = ?"
					   + " WHERE uuid_usuario = UUID_TO_BIN(?)"
					   + " 	 	 AND uuid_alteracao_senha = UUID_TO_BIN(?);";
			Connection conexao = ConexaoMySQL.AbrirConexao();
			PreparedStatement smtp = conexao.prepareStatement(sql);
			alteracao.setCodigo(GeradorHash.GerarCodigoAlteracaoSenha(6));
			
			smtp.setString(1, alteracao.getCodigo());
			smtp.setString(2, alteracao.getUuidUsuario());
			smtp.setString(3, alteracao.getUuidAlteracaoSenha());
			smtp.executeUpdate();
			
			smtp.close();
			ConexaoMySQL.FecharConexao(conexao);
			
			// Thread Envio Email
			Thread thread = new Thread(new EmailNovoCodigoAlteracaoSenhaThread(usuario_dao.SelecionarEmailPorUuid(alteracao.getUuidUsuario())
								   									, alteracao.getUuidUsuario()
								   									, alteracao.getUuidAlteracaoSenha()
																	, alteracao.getCodigo()
																	, alteracao.getIdioma()));
			thread.start();
			
			return true;
		}
		
		catch (SQLException e) { 
			e.printStackTrace(); 
			return false;
		}
	}
	
	public int AlterarSenha(AlteracaoSenhaBean alteracao, UsuarioBean usuario) {
		/*
		 * Alteração de senha do usuário
		 * - Verifica se alteração está ou não expirada
		 * - Checa se o código de alteracação está correto
		 * - Realiza a alteração
		 * - Marca link de alteração como usado e expirado
		 * 
		 * - Assintótica: O(1)
		 * */
		try {
			// solicitação expirada
			if (SelecionarExpiracao(alteracao)) { return 1; }
			
			// código incorreto
			else if (!ChecarCodigo(alteracao)) { return 0; }
			
			// solicitação não expirada
			else { 
				// Alteracação no campo de usuário
				UsuarioDao usuario_dao = new UsuarioDao();
				usuario_dao.AlterarSenha(usuario);
				
				// Usar alteração realizada
				return (UsarAlteracao(alteracao)) ? 3 : 1;
			}
		}
		
		catch (Exception e) { 
			e.printStackTrace(); 
			return -1;
		}
	}
	
	public boolean SelecionarExpiracao(AlteracaoSenhaBean alteracao) {
		/*
		 * Seleciona a condição de expiração da requisição de alteração de senha.
		 * 
		 * alteração expirada? >> 0: não, 1: sim
		 * 
		 * Assintótica: O(1)
		 * */
		
		try {
			int expirado;
			String sql = "SELECT expirado"
					   + " FROM alteracao_senha"
					   + " WHERE uuid_alteracao_senha = UUID_TO_BIN(?);";
			Connection conexao = ConexaoMySQL.AbrirConexao();
			PreparedStatement smtp = conexao.prepareStatement(sql);
			ResultSet rs;
			
			smtp.setString(1, alteracao.getUuidAlteracaoSenha());
			rs = smtp.executeQuery();
			
			// registro de expiração encontrado
			if (rs.next()) { 
				expirado =  rs.getInt("expirado");
				smtp.close();
				ConexaoMySQL.FecharConexao(conexao);
				return (expirado == 1) ? true : false;
			}
			
			// registro de expiração não encontrado
			else { return false; }
		}
		catch (SQLException e) { 
			e.printStackTrace(); 
			return true;
		}
	}
	
	public boolean ExpirarAlteracao(AlteracaoSenhaBean alteracao) {
		/*
		 * Expira uma alteração de senha manualmente, sem haver a
		 * necessidade da mesma ter sido usada pelo usuário
		 * 
		 * Assintótica: O(1)
		 * */
		try {
			String sql = "UPDATE alteracao_senha SET"
					   + " expirado = 1"
					   + " WHERE uuid_alteracao_senha = UUID_TO_BIN(?);";
			Connection conexao = ConexaoMySQL.AbrirConexao();
			PreparedStatement smtp = conexao.prepareStatement(sql);
			
				
			smtp.setString(1, alteracao.getUuidAlteracaoSenha());
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
	
	public boolean UsarAlteracao(AlteracaoSenhaBean alteracao) {
		/*
		 * Inativa uma alteração de senha após usuário usá-la
		 * Assintótica: O(1)
		 * */
		try {
			String sql = "UPDATE alteracao_senha SET"
					   + " usado = 1, expirado = 1, data_alteracao = NOW()"
					   + " WHERE uuid_alteracao_senha = UUID_TO_BIN(?);";
			Connection conexao = ConexaoMySQL.AbrirConexao();
			PreparedStatement smtp = conexao.prepareStatement(sql);
			
				
			smtp.setString(1, alteracao.getUuidAlteracaoSenha());
			smtp.executeUpdate();
			smtp.close();
			ConexaoMySQL.FecharConexao(conexao);
			
			ExpirarAlteracao(alteracao);
			return true;
		}
		catch (SQLException e) { 
			e.printStackTrace(); 
			return false;
		}
	}
	
	/*
	 * Métodos Secudários (Ocultos)
	 * 
	 * */
	
	private String SelecionarUuidAlterarSenha(String hash) {
		/*
		 * Seleciona a uuid (não visível ao usuário) de uma alteração de senha
		 * usando a hash da alteração (visível ao usuário) como parâmetro
		 * 
		 * Assintótica: O(1)
		 * */
		
		String uuid_alterar_senha = null;
		try {
			String sql = "SELECT BIN_TO_UUID(uuid_alteracao_senha)"
					   + " FROM alteracao_senha"
					   + " WHERE hash_alteracao = ?;";
			Connection conexao = ConexaoMySQL.AbrirConexao();
			PreparedStatement smtp = conexao.prepareStatement(sql);
			ResultSet rs;
				
			smtp.setString(1, hash);
			rs = smtp.executeQuery();
			
			if (rs.next()) { 
				uuid_alterar_senha =  rs.getString("BIN_TO_UUID(uuid_alteracao_senha)");
				smtp.close();
				ConexaoMySQL.FecharConexao(conexao);
				return uuid_alterar_senha;
			}
			else { return null; }
		}
		catch (SQLException e) { 
			e.printStackTrace(); 
			return null;
		}
	}
	
	private boolean ExpirarAlteracoesAnteriores(String uuid_usuario) {
		/*
		 * Torna as requisições de alteração de senha anteriores à requisição atual expiradas (expiração >> 1)
		 * Assintótica: O(1)
		 * */
		
		try {
			String sql = "UPDATE alteracao_senha SET"
						 + " expirado = 1"
						 + " WHERE uuid_usuario = UUID_TO_BIN(?);";
			Connection conexao = ConexaoMySQL.AbrirConexao();
			PreparedStatement smtp = conexao.prepareStatement(sql);
			
			smtp.setString(1, uuid_usuario);
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
	
	private boolean ChecarCodigo(AlteracaoSenhaBean alteracao) {
		/*
		 * Checa se o código de alteração digitado pelo usuário bate com o cadastrado no mysql
		 * 
		 * - Assintótica: O(1)
		 * */
		
		try {
			String sql = "SELECT codigo = ? AS codigo_checagem"
					   + " FROM alteracao_senha"
					   + " WHERE uuid_alteracao_senha = UUID_TO_BIN(?)"
					   + "       AND uuid_usuario = UUID_TO_BIN(?);";
			Connection conexao = ConexaoMySQL.AbrirConexao();
			PreparedStatement smtp = conexao.prepareStatement(sql);
			ResultSet rs;
			boolean codigo_correto = false;
			
			smtp.setString(1, alteracao.getCodigo());
			smtp.setString(2, alteracao.getUuidAlteracaoSenha());
			smtp.setString(3, alteracao.getUuidUsuario());
			rs = smtp.executeQuery();
			
			// checagem do código
			if (rs.next()) { codigo_correto = (rs.getInt("codigo_checagem") == 1) ? true : false; }
			
			rs.close();
			smtp.close();
			ConexaoMySQL.FecharConexao(conexao);
			return codigo_correto;
		}
		
		catch (SQLException e) { 
			e.printStackTrace(); 
			return false;
		}
	}
}