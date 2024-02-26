package Dao;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.io.InputStream;

import org.neo4j.driver.Driver;
import org.neo4j.driver.Record;
import org.neo4j.driver.Result;
import org.neo4j.driver.Session;
import org.neo4j.driver.Transaction;

import BancoDados.ConexaoMySQL;
import BancoDados.ConexaoNeo4J;
import Bean.UsuarioBean;
import Bean.SaltBean;
import Dao.SaltDao;
import Bean.AlteracaoSenhaBean;
import Dao.AlteracaoSenhaDao;
import Seguranca.GeradorHash;

public class UsuarioDao {
	/*
	 * Classe responsável pela transferência de dados dos usuários entre
	 * aplicação e banco de dados MySQL e Neo4J
	 * */
	public UsuarioDao() { }
	
	/*
	 * Métodos Públicos (Visíveis)
	 * */
	public boolean Cadastrar(UsuarioBean usuario) {
		/*
		 * Insere Registro de Usuário
		 * Assintótica: O(1)
		 * */
		
		try {
			
			// email já cadastrado anteriormente
			if (ChecarEmail(usuario.getEmail())) { return false; }
			
			// não cadastrado
			else {
				/* SQL */
				String sql = "INSERT INTO usuario(uuid_usuario, nickname, email, hash_senha, numero_whatsapp, numero_telegram, id_telegram, tipo_usuario)"
							   + " VALUES(UUID_TO_BIN(UUID()), TRIM(?), TRIM(?), ?, ?, ?, ?, ?)";
				Connection sql_conexao = ConexaoMySQL.AbrirConexao();
				PreparedStatement smtp = sql_conexao.prepareStatement(sql);
				
				String valor_salt = GeradorHash.GerarSalt();
				String numero_whatsapp = (usuario.getNumeroWhatsapp() != null | !(usuario.getNumeroWhatsapp().isEmpty()) | !(usuario.getNumeroWhatsapp().equals(""))) 
										 ? usuario.getNumeroWhatsapp() : "----";
				
				String numero_telegram = (usuario.getNumeroTelegram() != null | !(usuario.getNumeroTelegram().isEmpty()) | !(usuario.getNumeroTelegram().equals(""))) 
						                 ? usuario.getNumeroTelegram() : "----";
				
				smtp.setString(1, usuario.getNickname());
				smtp.setString(2, usuario.getEmail());
				smtp.setString(3, GeradorHash.CalcularHashSenha(usuario.getSenha(), valor_salt));
				smtp.setString(4, numero_whatsapp);
				smtp.setString(5, numero_telegram);
				smtp.setString(6, usuario.getIdTelegram());
				smtp.setString(7, usuario.getTipoUsuario());
				
				smtp.executeUpdate();
				smtp.close();
				ConexaoMySQL.FecharConexao(sql_conexao);
				
				/* Neo4J */
				String cypher = "MERGE (n:Usuario { uuid_usuario: $uuid_usuario, email: TRIM($email), nickname: TRIM($nickname),"
						+ " numero_whatsapp: $whatsapp, numero_telegram: $telegram, id_telegram: $id_telegram, tipo_usuario: $tipo_usuario})";
				String uuid_usuario = SelecionarUuidPorEmail(usuario.getEmail());
				Driver neo_conexao = ConexaoNeo4J.AbrirConexao();
				Session sessao = neo_conexao.session();
				Transaction tx = sessao.beginTransaction();
				Map<String, Object> params = new HashMap<String, Object>();
				
				params.put("uuid_usuario", uuid_usuario);
				params.put("email", usuario.getEmail());
				params.put("nickname", usuario.getNickname());
				params.put("whatsapp", numero_whatsapp);
				params.put("telegram", numero_telegram);
				params.put("id_telegram", usuario.getIdTelegram());
				params.put("tipo_usuario", usuario.getTipoUsuario());
				
				tx.run(cypher, params);
				tx.commit();
				
				tx.close();
				sessao.close();
				ConexaoNeo4J.FecharConexao(neo_conexao);
				
				/* Salt */
				SaltBean salt_bean = new SaltBean(valor_salt, uuid_usuario);
				SaltDao salt_dao = new SaltDao();
				salt_dao.CadastrarSalt(salt_bean);
				
				/* Status Logado */
				StatusLogado(uuid_usuario);
				
				/* Retorno */
				return true;
			}
		}
		
		catch (SQLException e) { 
			e.printStackTrace(); 
			return false;
		}
	}
	
	public boolean AlterarAvatarCadastro(String email, InputStream base64Imagem) {
		/*
		 * Alteração da foto de perfil/avatar do usuário, salvando-a em formato LongBlob
		 * Assintótica: O(1)
		 * */
		try {
			String sql = "UPDATE usuario SET"
					   + " foto_perfil = ?"
					   + " WHERE email = ?;";
			Connection conexao = ConexaoMySQL.AbrirConexao();
			PreparedStatement smtp = conexao.prepareStatement(sql);
			
			smtp.setBlob(1, base64Imagem);
			smtp.setString(2, email);
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
	
	public UsuarioBean Login(UsuarioBean usuario) {
		/*
		 * Login do usuário
		 * Assintótica:O(1)
		 * */
		try {
			// captura do valor salt do usuário e cálculo da hash da senha
			SaltDao salt_dao = new SaltDao();
			String uuid_usuario = SelecionarUuidPorEmail(usuario.getEmail());
			
			// uuid não encontrada - email inexistente
			if (uuid_usuario == null || uuid_usuario.isEmpty()) { return null; }
			
			// uuid encontrada
			else {
				usuario.setUuidUsuario(uuid_usuario);
				usuario.setSenha(salt_dao.SelecionarCalcularSaltSenha(usuario));
				
				// sucesso na checagem -- email e senha corretos
				if (ChecarLogin(usuario)) {
					String sql = "SELECT nickname, numero_whatsapp, numero_telegram, id_telegram, foto_perfil, BIN_TO_UUID(uuid_usuario), tipo_usuario"
							   + " FROM usuario"
							   + " WHERE email = ?;";
					Connection conexao = ConexaoMySQL.AbrirConexao();
					PreparedStatement smtp = conexao.prepareStatement(sql);
					ResultSet rs;
					
					smtp.setString(1, usuario.getEmail());
					rs = smtp.executeQuery();
					
					// sucesso captura dados usuário
					if (rs.next()) {
						
						UsuarioBean usuario_retorno = new UsuarioBean();
						usuario_retorno.setNickname(rs.getString("nickname"));
						usuario_retorno.setEmail(usuario.getEmail());
						usuario_retorno.setNumeroWhatsapp(rs.getString("numero_whatsapp"));
						usuario_retorno.setNumeroTelegram(rs.getString("numero_telegram"));
						usuario_retorno.setIdTelegram(rs.getString("id_telegram"));
						usuario_retorno.setAvatarBase64(rs.getString("foto_perfil"));
						usuario_retorno.setUuidUsuario(rs.getString("BIN_TO_UUID(uuid_usuario)"));
						usuario_retorno.setTipoUsuario(rs.getString("tipo_usuario"));
						
						StatusLogado(usuario_retorno.getUuidUsuario());
						
						rs.close();
						smtp.close();
						ConexaoMySQL.FecharConexao(conexao);
						return usuario_retorno;
					}
					
					// falha captura dados usuário
					else {
						rs.close();
						smtp.close();
						ConexaoMySQL.FecharConexao(conexao);
						return null;
					}
				}
				
				// falha na checagem -- email e/ou senha incorretos
				else { return null; }
			}
		}
		
		catch (SQLException e) { 
			e.printStackTrace(); 
			return null;
		}
	}
	
	public UsuarioBean SelecionarUsuarioPorProdutoUuid(String uuid_produto) {
		/*
		 * Seleção do Usuário que cadastrou o produto para divulgação (vendedor)
		 * para ser exibido na tela de visualização do produto
		 * 
		 * - Assintótica: O(1)
		 * */
		try {
			String cypher = "MATCH (:Produto {uuid: $uuid_produto}) <-[:Cadastrou]- (n:Usuario)"
						  + " RETURN n.nickname AS nickname, n.email AS email,"
					      + " n.numero_whatsapp AS whatsapp, n.numero_telegram AS telegram,"
					      + " n.uuid_usuario AS uuid_usuario";
			Driver neo_conexao = ConexaoNeo4J.AbrirConexao();
			Session sessao = neo_conexao.session();
			Transaction tx = sessao.beginTransaction();
			Result rs; Record registro;
			Map<String, Object> params = new HashMap<String, Object>();
			
			UsuarioBean usuario_selecionado = new UsuarioBean();
			
			params.put("uuid_produto", uuid_produto);
			rs = tx.run(cypher, params);
			
			/* Checagem se o usuário foi encontrado no banco de dados */
			
			// Usuário Encontrado
			if (rs.hasNext()) {
				
				registro = rs.next();
				
				// Coletando dados do usuário
				usuario_selecionado.setNickname(registro.get("nickname").asString());
				usuario_selecionado.setEmail(registro.get("email").asString());
				usuario_selecionado.setNumeroWhatsapp(registro.get("whatsapp").asString());
				usuario_selecionado.setNumeroTelegram(registro.get("telegram").asString());
				usuario_selecionado.setUuidUsuario(registro.get("uuid_usuario").asString());
			}
			
			// Usuário não Encontrado ou não disponível para venda
			else { usuario_selecionado = null; }
			
			tx.commit();
			tx.close();
			sessao.close();
			ConexaoNeo4J.FecharConexao(neo_conexao);
			
			/* Retorno */
			return usuario_selecionado;
		}
		catch (Exception e) { 
			e.printStackTrace(); 
			return null;
		}
	}
	
	public String SelecionarUuidPorEmail(String email) {
		/*
		 * Seleção da Uuid do usuário por meio do email do mesmo
		 * Assintótica: O(1)
		 * */
		try {
			String sql = "SELECT BIN_TO_UUID(uuid_usuario) FROM usuario WHERE email = ?;";
			String uuid;
			Connection conexao = ConexaoMySQL.AbrirConexao();
			PreparedStatement smtp = conexao.prepareStatement(sql);
			ResultSet rs;
			
			smtp.setString(1, email);
			rs = smtp.executeQuery();
			
			// uuid encontrada
			if (rs.next()) {
				uuid = rs.getString("BIN_TO_UUID(uuid_usuario)");
				rs.close();
				smtp.close();
				ConexaoMySQL.FecharConexao(conexao);
				
				return uuid;
			}
			
			// uuid não encontrada
			else { 
				rs.close();
				smtp.close();
				ConexaoMySQL.FecharConexao(conexao);
				return null; 
			}
		}
		catch (SQLException e) { 
			e.printStackTrace(); 
			return null;
		}
	}
	
	public String SelecionarEmailPorUuid(String uuid) {
		/*
		 * Seleção da Uuid do usuário por meio do email do mesmo
		 * Assintótica: O(1)
		 * */
		try {
			String sql = "SELECT email FROM usuario WHERE uuid_usuario = UUID_TO_BIN(?);";
			String email;
			Connection conexao = ConexaoMySQL.AbrirConexao();
			PreparedStatement smtp = conexao.prepareStatement(sql);
			ResultSet rs;
			
			smtp.setString(1, uuid);
			rs = smtp.executeQuery();
			
			// uuid encontrada
			if (rs.next()) {
				email = rs.getString("email");
				rs.close();
				smtp.close();
				ConexaoMySQL.FecharConexao(conexao);
				
				return email;
			}
			
			// uuid não encontrada
			else { 
				rs.close();
				smtp.close();
				ConexaoMySQL.FecharConexao(conexao);
				return null; 
			}
		}
		catch (SQLException e) { 
			e.printStackTrace(); 
			return null;
		}
	}
	
	public byte[] SelecionarAvatar(String usuario_uuid) {
		/*
		 * Seleciona Avatar do Usuário
		 * Assintótica: O(1)
		 * */
		try {
			String sql = "SELECT foto_perfil FROM usuario WHERE uuid_usuario = UUID_TO_BIN(?);";
			Connection conexao = ConexaoMySQL.AbrirConexao();
			PreparedStatement smtp = conexao.prepareStatement(sql);
			ResultSet rs = null;
			
			smtp.setString(1, usuario_uuid);
			rs = smtp.executeQuery();
			
			if (rs.next()) { return rs.getBytes("foto_perfil"); }
			else { return null; }
		}
		catch (SQLException e) { 
			e.printStackTrace(); 
			return null;
		}
	}
	
	public boolean AlterarDados(UsuarioBean usuario) {
		/*
		 * Altera Dados do Usuário
		 * Assintótica: O(1)
		 * */
		
		try {
			// Email já registrado por outro usuário
			if (ChecarEmailAlteracaoDados(usuario.getEmail(), usuario.getUuidUsuario())) { return false; }
			
			// Email não registrado por outro usuário
			else {
				
				/* MySQL */
				String sql = "UPDATE usuario SET"
				           + " nickname = TRIM(?), email = TRIM(?), numero_whatsapp = ?, numero_telegram = ?, id_telegram = ?, tipo_usuario = ?"
				           + " WHERE uuid_usuario = UUID_TO_BIN(?);";
				Connection conexao = ConexaoMySQL.AbrirConexao();
				PreparedStatement smtp = conexao.prepareStatement(sql);
				
				smtp.setString(1, usuario.getNickname());
				smtp.setString(2, usuario.getEmail());
				smtp.setString(3, usuario.getNumeroWhatsapp());
				smtp.setString(4, usuario.getNumeroTelegram());
				smtp.setString(5, usuario.getIdTelegram());
				smtp.setString(6, usuario.getTipoUsuario());
				smtp.setString(7, usuario.getUuidUsuario());
				smtp.executeUpdate();
				
				smtp.close();
				ConexaoMySQL.FecharConexao(conexao);
				
				/* Neo4J */
				String cypher = "MATCH (n:Usuario { uuid_usuario: $uuid_usuario})"
							  + " SET n+= {email: TRIM($email), nickname: TRIM($nickname),"
							  + " numero_whatsapp: $whatsapp, numero_telegram: $telegram,"
							  + " id_telegram: $id_telegram, tipo_usuario: $tipo_usuario}";
				Driver neo_conexao = ConexaoNeo4J.AbrirConexao();
				Session sessao = neo_conexao.session();
				Transaction tx = sessao.beginTransaction();
				Map<String, Object> params = new HashMap<String, Object>();
				
				params.put("uuid_usuario", usuario.getUuidUsuario());
				params.put("email", usuario.getEmail());
				params.put("nickname", usuario.getNickname());
				params.put("whatsapp", usuario.getNumeroWhatsapp());
				params.put("telegram", usuario.getNumeroTelegram());
				params.put("id_telegram", usuario.getIdTelegram());
				params.put("tipo_usuario", usuario.getTipoUsuario());
				
				tx.run(cypher, params);
				tx.commit();

				tx.close();
				sessao.close();
				ConexaoNeo4J.FecharConexao(neo_conexao);
				
				/* Retorno */
				return true;
			}
		}
		
		catch (SQLException e) { 
			e.printStackTrace(); 
			return false;
		}
	}
	
	public boolean StatusDeslogado(String uuid_usuario) {
		/*
		 * Método responsável por marcar status do usuário como deslogado
		 * Usado após clique nobotão "Sair/Log off" na página do painel
		 * 
		 * Assintótica: O(1)
		 * */
		
		try {
			String sql = "UPDATE usuario SET online = 0 WHERE uuid_usuario = UUID_TO_BIN(?);";
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
	
	public boolean AlterarSenhaRequisicao(UsuarioBean usuario) {
		/*
		 * Soliciação da alteração de senha
		 * - Assintótica: O(1)
		 * */
		try {
			// email cadastrado
			if (ChecarEmail(usuario.getEmail())) {
				AlteracaoSenhaBean alteracao_bean = new AlteracaoSenhaBean(GeradorHash.GerarSalt()
																		 , GeradorHash.GerarCodigoAlteracaoSenha(6)
																		 , usuario.getUuidUsuario());
				AlteracaoSenhaDao alteracao_dao = new AlteracaoSenhaDao();
				alteracao_dao.Cadastrar(alteracao_bean);
				
				return true;
			}
			
			// email não cadastrado
			else { return false; }
		}
		catch (Exception e) { 
			e.printStackTrace(); 
			return false;
		}
	}
	
	public boolean AlterarSenha(UsuarioBean usuario) {
		/*
		 * Alteração senha no cadastro do usuário, armazenando-a em formato hash
		 * - Assintótica: O(1)
		 * */
		try {
			String sql = "UPDATE usuario SET"
					   + " hash_senha = ?"
					   + " WHERE uuid_usuario = UUID_TO_BIN(?);";
			Connection conexao = ConexaoMySQL.AbrirConexao();
			PreparedStatement smtp = conexao.prepareStatement(sql);
			SaltDao salt_dao = new SaltDao();
			
			smtp.setString(1, salt_dao.SelecionarCalcularSaltSenha(usuario));
			smtp.setString(2, usuario.getUuidUsuario());
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
	
	/*
	 * Métodos Privados (Não-Visíveis)
	 * */
	private boolean ChecarEmail(String email) {
		/*
		 * Verifica se email já consta cadastrado no baco de dados
		 * - True >> consta;
		 * - False >> não consta.
		 * 
		 * - Assintótica: O(n), sendo 'n' a quantidade de registros verificados no banco de dados;
		 * no pior dos casos, 'n' corresponderá à quantidade de usuários cadastrados no banco - 1
		 * */
		
		try {
			String sql = "SELECT uuid_usuario FROM usuario WHERE email = ?;";
			Connection conexao = ConexaoMySQL.AbrirConexao();
			PreparedStatement smtp = conexao.prepareStatement(sql);
			ResultSet rs;
			
			smtp.setString(1, email);
			rs = smtp.executeQuery();
			
			// email encontrado no banco de dados
			if (rs.next()) {
				rs.close();
				smtp.close();
				ConexaoMySQL.FecharConexao(conexao);
				return true;
			}
			
			// email não encontrado
			else {
				rs.close();
				smtp.close();
				ConexaoMySQL.FecharConexao(conexao);
				return false;
			}
		}
		catch (SQLException e) { 
			e.printStackTrace(); 
			return false;
		}
	}
	
	private boolean ChecarLogin(UsuarioBean usuario) {
		/*
		 * Checa se email e senha do usuário batem com alguma conta cadastrada no banco de dados
		 * Assintótica: O(1)
		 * */
		
		try {
			String sql = "SELECT uuid_usuario FROM usuario WHERE email = ? AND hash_senha = ?";
			Connection conexao = ConexaoMySQL.AbrirConexao();
			PreparedStatement smtp = conexao.prepareStatement(sql);
			ResultSet rs;
			
			smtp.setString(1, usuario.getEmail());
			smtp.setString(2, usuario.getSenha());
			rs = smtp.executeQuery();
			
			// usuário encontrado
			if (rs.next()) {
				rs.close();
				smtp.close();
				ConexaoMySQL.FecharConexao(conexao);
				return true;
			}
			
			// usuário não encontrado
			else {
				rs.close();
				smtp.close();
				ConexaoMySQL.FecharConexao(conexao);
				return false;
			}
		}
		
		catch (SQLException e) { 
			e.printStackTrace(); 
			return false;
		}
	}
	
	private boolean StatusLogado(String uuid_usuario) {
		/*
		 * Método responsável por marcar status do usuário como 'logado'
		 * Usado após login e cadastro
		 * 
		 * Assintótica: O(1)
		 * */
		
		try {
			String sql = "UPDATE usuario SET online = 1 WHERE uuid_usuario = UUID_TO_BIN(?);";
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
	
	private boolean ChecarEmailAlteracaoDados(String email, String uuid) {
		/*
		 * Verifica se email já está registrado por outro usuário
		 * 
		 * - Assintótica: O(n), sendo 'n' a quantidade de registros verificados no banco de dados;
		 * no pior dos casos, 'n' corresponderá à quantidade de usuários cadastrados no banco - 1
		 * */
		try {
			String sql = "SELECT email"
					   + " FROM usuario"
					   + " WHERE email = ? AND uuid_usuario != UUID_TO_BIN(?);";
			Connection conexao = ConexaoMySQL.AbrirConexao();
			PreparedStatement smtp = conexao.prepareStatement(sql);
			ResultSet rs;
			
			smtp.setString(1, email);
			smtp.setString(2, uuid);
			rs = smtp.executeQuery();
			
			// email já cadastrado ppor outro usuário
			if (rs.next()) {
				rs.close();
				smtp.close();
				ConexaoMySQL.FecharConexao(conexao);
				return true;
			}
			
			// email ainda não registrado
			else {
				rs.close();
				smtp.close();
				ConexaoMySQL.FecharConexao(conexao);
				return false;
			}
		
		}
		
		catch (SQLException e) { 
			e.printStackTrace(); 
			return true;
		}
	}
}