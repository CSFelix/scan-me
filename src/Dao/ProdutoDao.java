package Dao;

import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.io.InputStream;
import java.util.List;

import org.neo4j.driver.Driver;
import org.neo4j.driver.Record;
import org.neo4j.driver.Result;
import org.neo4j.driver.Session;
import org.neo4j.driver.Transaction;

import BancoDados.ConexaoMySQLImagens;
import BancoDados.ConexaoNeo4J;
import Bean.ProdutoBean;

public class ProdutoDao {
	
	/*
	 * Classe responsável pelo fluxo de dados dos produtos
	 * - Fotos/Imagens => armazenadas no mysql
	 * - Outras Informações => armazenadas no neo4j
	 * */
	
	public ProdutoDao() { }
	
	/*
	 * Métodos Públicos (Visíveis)
	 * */
	public boolean CadastrarProdutoSemFoto(ProdutoBean produto_bean) {
		/*
		 * Cadastra produtos no Neo4j sem foto. Um relacionamento também é criado
		 * por meio da UUID do usuário que cadastrou.
		 * 
		 * - Assintótica: O(1)
		 * */
		
		try {
			/* Neo4J */
			String cypher = "MATCH (m:Usuario { uuid_usuario: $uuid_usuario })" 
						  + " WITH randomUUID() as uuid_produto, m"
						  + " CREATE (n:Produto { uuid: uuid_produto, nome: TRIM($nome), preco: $preco, "
					      + " moeda: $moeda, descricao: TRIM($descricao), estoque: $estoque, status: $status,"
						  + " tipoPrincipal: $tipoPrincipal, outrosTipos: $outrosTipos, visualizacoes: 0 })"
					      + " CREATE (n)<-[:Cadastrou]-(m)"
						  + " RETURN uuid_produto";
			Driver neo_conexao = ConexaoNeo4J.AbrirConexao();
			Session sessao = neo_conexao.session();
			Transaction tx = sessao.beginTransaction();
			Result rs; Record registro;
			Map<String, Object> params = new HashMap<String, Object>();
			
			params.put("uuid_usuario", produto_bean.getUuidUsuario());
			params.put("nome", produto_bean.getNome());
			params.put("preco", produto_bean.getPreco());
			params.put("moeda", produto_bean.getMoeda());
			params.put("descricao", produto_bean.getDescricao());
			params.put("estoque", produto_bean.getEstoque());
			params.put("status", produto_bean.getStatus());
			params.put("tipoPrincipal", produto_bean.getTipoPrincipal());
			params.put("outrosTipos", produto_bean.getOutrosTipos());
			
			rs = tx.run(cypher, params);
			
			while (rs.hasNext()) {
				registro = rs.next();
				String uuid_produto = registro.get("uuid_produto").asString();
				
				/* MySQL */
				String sql = "INSERT INTO produto_imagens(foto_1, foto_2, foto_3, foto_4, foto_5, foto_6, uuid_produto)" 
						   + " VALUES (?, ?, ?, ?, ?, ?, UUID_TO_BIN(?));";
				Connection conexao = ConexaoMySQLImagens.AbrirConexao();
				PreparedStatement smtp = conexao.prepareStatement(sql);
				
				smtp.setNull(1, Types.NULL);
				smtp.setNull(2, Types.NULL);
				smtp.setNull(3, Types.NULL);
				smtp.setNull(4, Types.NULL);
				smtp.setNull(5, Types.NULL);
				smtp.setNull(6, Types.NULL);
				smtp.setString(7, uuid_produto);
				
				smtp.executeUpdate();				
				smtp.close();
				ConexaoMySQLImagens.FecharConexao(conexao);
			}
			
			tx.commit();
			tx.close();
			sessao.close();
			ConexaoNeo4J.FecharConexao(neo_conexao);
			
			/* Retorno */
			return true;
		}
		catch (Exception e) { 
			e.printStackTrace(); 
			return false;
		}
	}
	
	public boolean CadastrarProdutoComFoto(ProdutoBean produto_bean, InputStream[] lista_fotos) {
		/*
		 * Cadastra produto no Neo4j com foto, sendo que as fotos são armazenadas no MySQL.
		 * O relacionamento em ambos os bancos é feito através da UUID d usuário.
		 * 
		 * Assintótica: O(2) => O(1)
		 * */
		
		try {
			/* Neo4J */
			String cypher = "MATCH (m:Usuario { uuid_usuario: $uuid_usuario })" 
					  + " WITH randomUUID() as uuid_produto, m"
					  + " CREATE (n:Produto { uuid: uuid_produto, nome: TRIM($nome), preco: $preco,"
				      + " moeda: $moeda, descricao: TRIM($descricao), estoque: $estoque, status: $status,"
					  + " tipoPrincipal: $tipoPrincipal, outrosTipos: $outrosTipos, visualizacoes: 0 })"
				      + " CREATE (n)<-[:Cadastrou]-(m)"
					  + " RETURN uuid_produto";
			Driver neo_conexao = ConexaoNeo4J.AbrirConexao();
			Session sessao = neo_conexao.session();
			Transaction tx = sessao.beginTransaction();
			Result rs; Record registro;
			Map<String, Object> params = new HashMap<String, Object>();
			
			params.put("uuid_usuario", produto_bean.getUuidUsuario());
			params.put("nome", produto_bean.getNome());
			params.put("preco", produto_bean.getPreco());
			params.put("moeda", produto_bean.getMoeda());
			params.put("descricao", produto_bean.getDescricao());
			params.put("estoque", produto_bean.getEstoque());
			params.put("status", produto_bean.getStatus());
			params.put("tipoPrincipal", produto_bean.getTipoPrincipal());
			params.put("outrosTipos", produto_bean.getOutrosTipos());
			
			rs = tx.run(cypher, params);
			
			while (rs.hasNext()) {
				registro = rs.next();
				String uuid_produto = registro.get("uuid_produto").asString();
				
				/* MySQL */
				String sql = "INSERT INTO produto_imagens(foto_1, foto_2, foto_3, foto_4, foto_5, foto_6, uuid_produto)" 
						   + " VALUES (?, ?, ?, ?, ?, ?, UUID_TO_BIN(?));";
				Connection conexao = ConexaoMySQLImagens.AbrirConexao();
				PreparedStatement smtp = conexao.prepareStatement(sql);
				
				// o tratamento de quando a imagem é nula é realizado direto na servlet
				for (int i = 0; i < lista_fotos.length; i++) { smtp.setBlob(i + 1, lista_fotos[i]); }
				smtp.setString(7, uuid_produto);
				smtp.executeUpdate();
				
				smtp.close();
				ConexaoMySQLImagens.FecharConexao(conexao);
			}
			
			tx.commit();
			tx.close();
			sessao.close();
			ConexaoNeo4J.FecharConexao(neo_conexao);
			
			/* Retorno */
			return true;
		}
		catch (Exception e) { 
			e.printStackTrace(); 
			return false;
		}
	}
	
	public boolean ExcluirProduto(String uuid_produto) {
		/*
		 * Exclusão dos dados do produto no Neo4J e das fotos no MySQL
		 * por meio da uuid
		 * 
		 * - Assintótica: O(1)
		 * */
		try {
			/* MySQL */
			String sql = "DELETE FROM produto_imagens"
						+ " WHERE uuid_produto = UUID_TO_BIN(?);";
			Connection conexao = ConexaoMySQLImagens.AbrirConexao();
			PreparedStatement smtp = conexao.prepareStatement(sql);
			
			smtp.setString(1, uuid_produto);
			smtp.executeUpdate();
			
			smtp.close();
			ConexaoMySQLImagens.FecharConexao(conexao);
			
			/* Neo4J */
			String cypher = "MATCH (n:Produto {uuid: $uuid_produto})" 
						  + " DETACH DELETE n";
			Driver neo_conexao = ConexaoNeo4J.AbrirConexao();
			Session sessao = neo_conexao.session();
			Transaction tx = sessao.beginTransaction();
			Map<String, Object> params = new HashMap<String, Object>();
			
			params.put("uuid_produto", uuid_produto);
			
			tx.run(cypher, params);
			tx.commit();

			tx.close();
			sessao.close();
			ConexaoNeo4J.FecharConexao(neo_conexao);
			
			/* Retorno */
			return true;
		}
		catch (Exception e) { 
			e.printStackTrace(); 
			return false;
		}
	}
	
	public ProdutoBean SelecionarProdutoPorUuid(String uuid_produto) {
		/*
		 * Busca de um produto em específico pela uuid para visualização por outros usuários (compradores)
		 * - Assintótica: O(1)
		 * */
		try {
			String cypher = "MATCH (n:Produto {uuid: $uuid_produto, status: '2'})"
						  + " RETURN n.nome AS nome, n.descricao AS descricao, n.moeda AS moeda,"
				          + " n.preco AS preco, n.estoque AS estoque, n.tipoPrincipal AS tipoPrincipal,"
				          + " n.outrosTipos AS outrosTipos";
			Driver neo_conexao = ConexaoNeo4J.AbrirConexao();
			Session sessao = neo_conexao.session();
			Transaction tx = sessao.beginTransaction();
			Result rs; Record registro;
			Map<String, Object> params = new HashMap<String, Object>();
			
			ProdutoBean produto_selecionado = new ProdutoBean();
			
			params.put("uuid_produto", uuid_produto);
			rs = tx.run(cypher, params);
			
			/* Checagem se o produto foi encontrado no banco de dados */
			
			// Produto Encontrado
			if (rs.hasNext()) {
				registro = rs.next();
				
				// Armazenando Dados do Produto
				List<Object> outrosTiposProduto = registro.get("outrosTipos").asList();
				
				produto_selecionado.setNome(registro.get("nome").asString());
				produto_selecionado.setDescricao(registro.get("descricao").asString());
				produto_selecionado.setMoeda(registro.get("moeda").asString());
				produto_selecionado.setPreco(registro.get("preco").asString());
				produto_selecionado.setEstoque(registro.get("estoque").asString());
				produto_selecionado.setTipoPrincipal(registro.get("tipoPrincipal").asString());
				produto_selecionado.setOutrosTipos(outrosTiposProduto.toArray(new String[outrosTiposProduto.size()]));
			}
			
			// Produto não Encontrado ou não disponível para venda
			else { produto_selecionado = null; }
			
			tx.commit();
			tx.close();
			sessao.close();
			ConexaoNeo4J.FecharConexao(neo_conexao);
			
			/* Retorno */
			return produto_selecionado;
		}
		catch (Exception e) { 
			e.printStackTrace(); 
			return null;
		}
	}
	
	public boolean IncrementarVisualizacoes(String uuid_produto) {
		/*
		 * Incrementa a quantidaded de visualizações do produto em 1
		 * 
		 * Assintótica: O(1)
		 * */
		try {
			String cypher = "MATCH (n:Produto { uuid: $uuid_produto })"
						  + " SET n.visualizacoes = n.visualizacoes + 1";
			Driver neo_conexao = ConexaoNeo4J.AbrirConexao();
			Session sessao = neo_conexao.session();
			Transaction tx = sessao.beginTransaction();
			Map<String, Object> params = new HashMap<String, Object>();
			
			
			params.put("uuid_produto", uuid_produto);
			tx.run(cypher, params);
			tx.commit();

			tx.close();
			sessao.close();
			ConexaoNeo4J.FecharConexao(neo_conexao);
			
			/* Retorno */
			return true;
		}
		catch (Exception e) { 
			e.printStackTrace(); 
			return false;
		}
	}
	
	public boolean CriarRelacionamentoVisualizacao(String uuid_usuario, String uuid_produto) {
		/*
		 * Cria o relacionamento "Visualizou" entre usuário e produto quando este é visualizado por aquele
		 * no mercado online
		 * 
		 * Assintótica: O(1)
		 * */
		try {
			String cypher = "MATCH (n:Produto { uuid: $uuid_produto }), (m:Usuario {  uuid_usuario: $uuid_usuario } )"
						  + " MERGE (n) <-[:Visualizou]- (m)"
					      + " RETURN n, m";
			
			Driver neo_conexao = ConexaoNeo4J.AbrirConexao();
			Session sessao = neo_conexao.session();
			Transaction tx = sessao.beginTransaction();
			Map<String, Object> params = new HashMap<String, Object>();
			
			
			params.put("uuid_usuario", uuid_usuario);
			params.put("uuid_produto", uuid_produto);
			tx.run(cypher, params);
			tx.commit();
	
			tx.close();
			sessao.close();
			ConexaoNeo4J.FecharConexao(neo_conexao);
			
			/* Retorno */
			return true;
		}
		catch (Exception e) { 
			e.printStackTrace(); 
			return false;
		}
	}
	
	public Map<Integer, ArrayList<Integer>> SelecionarContagemIndexFotosProdutoPorUuidProduto(String uuid_produto) {
		/*
		 * Seleciona quantidade de fotos do produto salvas no banco de dados além das exatas colunas que a contém
		 * para serem exibidas na visualização ou alteração do mesmo
		 * 
		 * Assintótica: O(6) >> O(1)
		 * */
		
		try {
			String sql = "Select foto_1, foto_2, foto_3, foto_4, foto_5, foto_6"
					   + " FROM produto_imagens"
					   + " WHERE uuid_produto = UUID_TO_BIN(?);";
			Connection conexao = ConexaoMySQLImagens.AbrirConexao();
			PreparedStatement smtp = conexao.prepareStatement(sql);
			ResultSet rs = null;
			Map<Integer, ArrayList<Integer>> dados_fotos_produto = new HashMap<Integer, ArrayList<Integer>>();
			
			smtp.setString(1, uuid_produto);
			rs = smtp.executeQuery();
			
			/* Verificação de cada foto */
			if (rs.next()) {
				int quantidade_fotos = 0;
				ArrayList<Integer> colunas_fotos = new ArrayList<Integer>(); // todos os elementos iguais a "0 (zero)" indicam de que não há foto salva na coluna
				
				// checagem coluna foto_1
				if (rs.getBytes("foto_1") != null) {
					quantidade_fotos += 1;
					colunas_fotos.add(1);
				}
				else { colunas_fotos.add(0); }
				
				// checagem coluna foto_2
				if (rs.getBytes("foto_2") != null) {
					quantidade_fotos += 1;
					colunas_fotos.add(2);
				}
				else { colunas_fotos.add(0); }
				
				// checagem coluna foto_3
				if (rs.getBytes("foto_3") != null) {
					quantidade_fotos += 1;
					colunas_fotos.add(3);
				}
				else { colunas_fotos.add(0); }
				
				// checagem coluna foto_4
				if (rs.getBytes("foto_4") != null) {
					quantidade_fotos += 1;
					colunas_fotos.add(4);
				}
				else { colunas_fotos.add(0); }
				
				// checagem coluna foto_5
				if (rs.getBytes("foto_5") != null) {
					quantidade_fotos += 1;
					colunas_fotos.add(5);
				}
				else { colunas_fotos.add(0); }
				
				// checagem coluna foto_6
				if (rs.getBytes("foto_6") != null) {
					quantidade_fotos += 1;
					colunas_fotos.add(6);
				}
				else { colunas_fotos.add(0); }
				
				/* Armazenamento dos dados */
				dados_fotos_produto.put(quantidade_fotos, colunas_fotos);
			}
			
			else { dados_fotos_produto.put(0, new ArrayList<>(Arrays.asList(0, 0, 0, 0, 0, 0))); }
			
			/* Retorno */
			return dados_fotos_produto;
		}
		catch (SQLException e) { 
			e.printStackTrace(); 
			return null;
		}
		
	}
	
	public byte[] SelecionarFotoProdutoPorUuidIndex(String uuid_produto, int index) {
		/*
		 *  Seleciona determinada foto do Produto
		 *  Assintótica: O(6) >> O(1)
		 * */
		
		try {
			String sql;
			
			// verificação da index informada
			// de acordo com a index, uma coluna de foto específica é selecionada
			// index 1 : foto_1, index 2 : foto 2, [...], index 6 : foto_6
			if (index == 1) {
				sql = "Select foto_1"
					+ " FROM produto_imagens"
			  	    + " WHERE uuid_produto = UUID_TO_BIN(?);"; 
			}
			else if (index == 2) {
				sql = "Select foto_2"
						+ " FROM produto_imagens"
				  	    + " WHERE uuid_produto = UUID_TO_BIN(?);";
			}
			else if (index == 3) {
				sql = "Select foto_3"
						+ " FROM produto_imagens"
				  	    + " WHERE uuid_produto = UUID_TO_BIN(?);";
			}
			else if (index == 4) {
				sql = "Select foto_4"
						+ " FROM produto_imagens"
				  	    + " WHERE uuid_produto = UUID_TO_BIN(?);";
			}
			else if (index == 5) {
				sql = "Select foto_5"
						+ " FROM produto_imagens"
				  	    + " WHERE uuid_produto = UUID_TO_BIN(?);";
			}
			else {
				sql = "Select foto_6"
						+ " FROM produto_imagens"
				  	    + " WHERE uuid_produto = UUID_TO_BIN(?);";
			}			
			
			Connection conexao = ConexaoMySQLImagens.AbrirConexao();
			PreparedStatement smtp = conexao.prepareStatement(sql);
			ResultSet rs = null;
			
			//String coluna_foto = SelecionarColunaFotoPorIndex(index); 
			byte[] foto_produto;
			
			smtp.setString(1, uuid_produto);
			rs = smtp.executeQuery();
			
			/* Verificação se produto possui fotos armazenadas no banco de dados */
			
			// Fotos Encontradas
			if (rs.next()) { 
				
				// de acordo com a index, uma coluna de foto específica é retornada
				// idnex 1 : foto_1, index 2: foto_2, [...], index 6 : foto_6
				if (index == 1)      { foto_produto = rs.getBytes("foto_1"); }
				else if (index == 2) { foto_produto = rs.getBytes("foto_2"); }
				else if (index == 3) { foto_produto = rs.getBytes("foto_3"); }
				else if (index == 4) { foto_produto = rs.getBytes("foto_4"); }
				else if (index == 5) { foto_produto = rs.getBytes("foto_5"); }
				else                 { foto_produto = rs.getBytes("foto_6"); }
			}
			
			// Fotos não Encontradas
			else { foto_produto = null; }
			
			/* Retorno */			
			return foto_produto;
		}
		catch (SQLException e) { 
			e.printStackTrace(); 
			return null;
		}
	}
	
	public boolean AlterarProdutoSemFoto(ProdutoBean produto_bean) {
		/*
		 * Altera dados do produto no Neo4j sem foto.
		 * 
		 * - Assintótica: O(1)
		 * */
		
		try {
			/* Neo4J */
			String cypher = "MATCH (n:Produto { uuid: $uuid_produto })"
						  + " SET n.nome = TRIM($nome), n.preco = $preco, n.moeda = $moeda,"
						  + " n.descricao = TRIM($descricao), n.estoque = $estoque, n.status = $status,"
						  + " n.tipoPrincipal = $tipoPrincipal, n.outrosTipos = $outrosTipos";
			Driver neo_conexao = ConexaoNeo4J.AbrirConexao();
			Session sessao = neo_conexao.session();
			Transaction tx = sessao.beginTransaction();
			Map<String, Object> params = new HashMap<String, Object>();
			
			params.put("uuid_produto", produto_bean.getUuid());
			params.put("nome", produto_bean.getNome());
			params.put("preco", produto_bean.getPreco());
			params.put("moeda", produto_bean.getMoeda());
			params.put("descricao", produto_bean.getDescricao());
			params.put("estoque", produto_bean.getEstoque());
			params.put("status", produto_bean.getStatus());
			params.put("tipoPrincipal", produto_bean.getTipoPrincipal());
			params.put("outrosTipos", produto_bean.getOutrosTipos());
			
			tx.run(cypher, params);
			tx.commit();

			tx.close();
			sessao.close();
			ConexaoNeo4J.FecharConexao(neo_conexao);
			
			/* Retorno */
			return true;
		}
		catch (Exception e) { 
			e.printStackTrace(); 
			return false;
		}
	}
	
	public boolean AlterarProdutoComFoto(String uuid_produto, InputStream[] lista_fotos, String[] flags_index_fotos) {
		/*
		 * Altera fotos do Produto no MySQL.
		 * 
		 * Assintótica: O(2) => O(1)
		 * */
		try {
			/* MySQL */
			Connection conexao = ConexaoMySQLImagens.AbrirConexao();
			String sql;

			/* Checagem das Fotos para Processamento no Banco */
			
			// Foto 1
			if (flags_index_fotos[0].equals("1")) {
				sql = "UPDATE produto_imagens SET foto_1 = ?"
					+ " WHERE uuid_produto = UUID_TO_BIN(?);";
				
				PreparedStatement smtp = conexao.prepareStatement(sql);
				smtp.setBlob(1, lista_fotos[0]);
				smtp.setString(2, uuid_produto);
				smtp.executeUpdate();
			}
			
			// Foto 2
			if (flags_index_fotos[1].equals("1")) {
				sql = "UPDATE produto_imagens SET foto_2 = ?"
					+ " WHERE uuid_produto = UUID_TO_BIN(?);";
							
				PreparedStatement smtp = conexao.prepareStatement(sql);
				smtp.setBlob(1, lista_fotos[1]);
				smtp.setString(2, uuid_produto);
				smtp.executeUpdate();
			}
			
			// Foto 3
			if (flags_index_fotos[2].equals("1")) {
				sql = "UPDATE produto_imagens SET foto_3 = ?"
					+ " WHERE uuid_produto = UUID_TO_BIN(?);";
										
				PreparedStatement smtp = conexao.prepareStatement(sql);
				smtp.setBlob(1, lista_fotos[2]);
				smtp.setString(2, uuid_produto);
				smtp.executeUpdate();
			}

			// Foto 4
			if (flags_index_fotos[3].equals("1")) {
				sql = "UPDATE produto_imagens SET foto_4 = ?"
					+ " WHERE uuid_produto = UUID_TO_BIN(?);";
										
				PreparedStatement smtp = conexao.prepareStatement(sql);
				smtp.setBlob(1, lista_fotos[3]);
				smtp.setString(2, uuid_produto);
				smtp.executeUpdate();
			}

			// Foto 5
			if (flags_index_fotos[4].equals("1")) {
				sql = "UPDATE produto_imagens SET foto_5 = ?"
					+ " WHERE uuid_produto = UUID_TO_BIN(?);";
										
				PreparedStatement smtp = conexao.prepareStatement(sql);
				smtp.setBlob(1, lista_fotos[4]);
				smtp.setString(2, uuid_produto);
				smtp.executeUpdate();
			}

			// Foto 6
			if (flags_index_fotos[5].equals("1")) {
				sql = "UPDATE produto_imagens SET foto_6 = ?"
					+ " WHERE uuid_produto = UUID_TO_BIN(?);";
										
				PreparedStatement smtp = conexao.prepareStatement(sql);
				smtp.setBlob(1, lista_fotos[5]);
				smtp.setString(2, uuid_produto);
				smtp.executeUpdate();
			}

			ConexaoMySQLImagens.FecharConexao(conexao);
			
			/* Retorno */
			return true;
		}
		catch (Exception e) { 
			e.printStackTrace(); 
			return false;
		}
	}
	
	public ProdutoBean SelecionarProdutoPorUuidParaAlteracao(String uuid_produto, String uuid_usuario) {
		/*
		 * Busca produto específico para alteração do usuário. A busca é feita filtrando
		 * a uuid do produto e a do usuário que o cadastrou
		 * 
		 * - Assintótica: O(1)
		 * */
		try {
			String cypher = "MATCH (n:Produto {uuid: $uuid_produto}) <-[:Cadastrou]- (:Usuario {uuid_usuario: $uuid_usuario})"
						  + "RETURN n.nome AS nome, n.descricao AS descricao, n.moeda AS moeda,"
						  + "n.preco AS preco, n.estoque AS estoque, n.tipoPrincipal AS tipoPrincipal,"
						  + "n.outrosTipos AS outrosTipos, n.status AS status";
			Driver neo_conexao = ConexaoNeo4J.AbrirConexao();
			Session sessao = neo_conexao.session();
			Transaction tx = sessao.beginTransaction();
			Result rs; Record registro;
			Map<String, Object> params = new HashMap<String, Object>();
			
			ProdutoBean produto_selecionado;
			
			params.put("uuid_produto", uuid_produto);
			params.put("uuid_usuario", uuid_usuario);
			rs = tx.run(cypher, params);
			
			/* Checagem se o produto foi encontrado no banco de dados
			 * e usuário atual é vendedor do mesmo */
			
			// Produto Encontrado
			if (rs.hasNext()) {
				registro = rs.next();
				
				// Armazenando Dados do Produto
				List<Object> outrosTiposProduto = registro.get("outrosTipos").asList();
				
				produto_selecionado = new ProdutoBean();
				
				produto_selecionado.setNome(registro.get("nome").asString());
				produto_selecionado.setDescricao(registro.get("descricao").asString());
				produto_selecionado.setMoeda(registro.get("moeda").asString());
				produto_selecionado.setPreco(registro.get("preco").asString());
				produto_selecionado.setEstoque(registro.get("estoque").asString());
				produto_selecionado.setTipoPrincipal(registro.get("tipoPrincipal").asString());
				produto_selecionado.setOutrosTipos(outrosTiposProduto.toArray(new String[outrosTiposProduto.size()]));
				produto_selecionado.setStatus(registro.get("status").asString());
			}
			
			// Produto não Encontrado ou não disponível para venda
			else { produto_selecionado = null; }
			
			tx.commit();
			tx.close();
			sessao.close();
			ConexaoNeo4J.FecharConexao(neo_conexao);
			
			/* Retorno */
			return produto_selecionado;
		}
		catch (Exception e) { 
			e.printStackTrace(); 
			return null;
		}
	}
	
	public ArrayList<String[]> BuscarListaNomeProdutos(String uuid_usuario) {
		/*
		 * Busca lista dos nomes dos produtos cadastrados pelo usuário.
		 * - Assintótica: O(n), sendo 'n' quantidade de produtos cadastrados
		 * */
		
		try {
			String cypher = "MATCH (n:Produto) <-[:Cadastrou]- (:Usuario {uuid_usuario: $uuid_usuario})" 
						  + " RETURN n.nome AS nome, n.uuid AS uuid" 
						  + " ORDER BY nome ASC";
			Driver neo_conexao = ConexaoNeo4J.AbrirConexao();
			Session sessao = neo_conexao.session();
			Transaction tx = sessao.beginTransaction();
			Result rs; Record registro;
			Map<String, Object> params = new HashMap<String, Object>();
			ArrayList<String[]> lista_nome_produtos = new ArrayList<String[]>();
			
			params.put("uuid_usuario", uuid_usuario);
			rs = tx.run(cypher, params);
			
			while(rs.hasNext()) {
				registro = rs.next();
				lista_nome_produtos.add(new String[] {
											registro.get("nome").asString(),
											registro.get("uuid").asString()
										});
			}
			
			tx.commit();
			tx.close();
			sessao.close();
			ConexaoNeo4J.FecharConexao(neo_conexao);
			
			/* Retorno */
			return lista_nome_produtos;
		}
		catch (Exception e) { 
			e.printStackTrace(); 
			return null;
		}
	}
	
	public ArrayList<ProdutoBean> BuscarListaDadosTabelaProdutos(String uuid_usuario, int pagina_atual) {
		/*
		 * Busca dados principais dos produtos para serem inseridos na página de tabela dos produtos.
		 * - Assintótica: O(n), sendo 'n' a qnt de produtos cadastrados
		 * */
		try {			
			String cypher = "MATCH (n:Produto) <-[:Cadastrou]- (:Usuario {uuid_usuario: $uuid_usuario})"
						  + " RETURN n.nome AS nome, n.estoque AS estoque, n.preco AS preco, n.status AS status,"
						  + " n.tipoPrincipal AS tipoPrincipal, n.moeda AS moeda, n.uuid AS uuid"
						  + " ORDER BY nome ASC"
						  + " SKIP 10 * $pagina_atual"
						  + " LIMIT 10";
			
			Driver neo_conexao = ConexaoNeo4J.AbrirConexao();
			Session sessao = neo_conexao.session();
			Transaction tx = sessao.beginTransaction();
			Result rs; Record registro;
			Map<String, Object> params = new HashMap<String, Object>();
			ArrayList<ProdutoBean> lista_produtos = new ArrayList<ProdutoBean>();
			
			params.put("uuid_usuario", uuid_usuario);
			params.put("pagina_atual", pagina_atual - 1);
			rs = tx.run(cypher, params);
			
			while(rs.hasNext()) {
				registro = rs.next();
		
				ProdutoBean produto_bean = new ProdutoBean();
				produto_bean.setNome(registro.get("nome").asString());
				produto_bean.setEstoque(registro.get("estoque").asString());
				produto_bean.setPreco(registro.get("preco").asString());
				produto_bean.setStatus(registro.get("status").asString());
				produto_bean.setTipoPrincipal(registro.get("tipoPrincipal").asString());
				produto_bean.setMoeda(registro.get("moeda").asString());
				produto_bean.setUuid(registro.get("uuid").asString());
				
				lista_produtos.add(produto_bean);
			}
			
			tx.commit();
			tx.close();
			sessao.close();
			ConexaoNeo4J.FecharConexao(neo_conexao);
			
			/* Retorno */
			return lista_produtos;
		}
		catch (Exception e) { 
			e.printStackTrace(); 
			return null;
		}
	}
	
	public ArrayList<ProdutoBean> BuscarListaDadosTabelaProdutosFiltroPorNomeProduto(String uuid_usuario, int pagina_atual, String nome_produto) {
		/*
		 * Busca dados principais dos produtos para serem inseridos na página de tabela dos produtos com filtro pelo nome.
		 * - Assintótica: O(n), sendo 'n' a qnt de produtos cadastrados
		 * */
		try {			
			String cypher = "MATCH (n:Produto) <-[:Cadastrou]- (:Usuario {uuid_usuario: $uuid_usuario})"
						  + " WHERE toLower(n.nome) =~ toLower($nome_produto)"
						  + " RETURN n.nome AS nome, n.estoque AS estoque, n.preco AS preco, n.status AS status,"
						  + " n.tipoPrincipal AS tipoPrincipal, n.moeda AS moeda, n.uuid AS uuid"
						  + " ORDER BY nome ASC"
						  + " SKIP 10 * $pagina_atual"
						  + " LIMIT 10";
			
			Driver neo_conexao = ConexaoNeo4J.AbrirConexao();
			Session sessao = neo_conexao.session();
			Transaction tx = sessao.beginTransaction();
			Result rs; Record registro;
			Map<String, Object> params = new HashMap<String, Object>();
			ArrayList<ProdutoBean> lista_produtos = new ArrayList<ProdutoBean>();
			
			params.put("uuid_usuario", uuid_usuario);
			params.put("nome_produto", ".*" + nome_produto + ".*");
			params.put("pagina_atual", pagina_atual - 1);
			rs = tx.run(cypher, params);
			
			while(rs.hasNext()) {
				registro = rs.next();
		
				ProdutoBean produto_bean = new ProdutoBean();
				produto_bean.setNome(registro.get("nome").asString());
				produto_bean.setEstoque(registro.get("estoque").asString());
				produto_bean.setPreco(registro.get("preco").asString());
				produto_bean.setStatus(registro.get("status").asString());
				produto_bean.setTipoPrincipal(registro.get("tipoPrincipal").asString());
				produto_bean.setMoeda(registro.get("moeda").asString());
				produto_bean.setUuid(registro.get("uuid").asString());
				
				lista_produtos.add(produto_bean);
			}
			
			tx.commit();
			tx.close();
			sessao.close();
			ConexaoNeo4J.FecharConexao(neo_conexao);
			
			/* Retorno */
			return lista_produtos;
		}
		catch (Exception e) { 
			e.printStackTrace(); 
			return null;
		}
	}
	
	public ArrayList<ProdutoBean> BuscarListaDadosLojaProdutos(int pagina_atual) {
		/*
		 * Busca dados principais dos produtos na loja online.
		 * - Assintótica: O(n), sendo 'n' a qnt de produtos cadastrados
		 * */
		try {			
			String cypher = "MATCH (n:Produto {status : '2'})"
						  + " WITH n"
						  + " MATCH (m:Usuario) -[:Cadastrou]-> (n)"
						  + " RETURN n.uuid AS uuid, n.nome AS nome, n.moeda AS moeda,"
					      + " n.preco AS preco, n.tipoPrincipal AS tipoPrincipal,"
					      + " m.nickname AS vendedor"
					      + " ORDER BY nome ASC"
					      + " SKIP 9 * $pagina_atual"
					      + " LIMIT 9";
			
			Driver neo_conexao = ConexaoNeo4J.AbrirConexao();
			Session sessao = neo_conexao.session();
			Transaction tx = sessao.beginTransaction();
			Result rs; Record registro;
			Map<String, Object> params = new HashMap<String, Object>();
			ArrayList<ProdutoBean> lista_produtos = new ArrayList<ProdutoBean>();
			
			params.put("pagina_atual", pagina_atual - 1);
			rs = tx.run(cypher, params);
			
			while(rs.hasNext()) {
				registro = rs.next();
		
				ProdutoBean produto_bean = new ProdutoBean();
				produto_bean.setUuid(registro.get("uuid").asString());
				produto_bean.setNome(registro.get("nome").asString());
				produto_bean.setMoeda(registro.get("moeda").asString());
				produto_bean.setPreco(registro.get("preco").asString());
				produto_bean.setTipoPrincipal(registro.get("tipoPrincipal").asString());
				produto_bean.setVendedor(registro.get("vendedor").asString());
				
				lista_produtos.add(produto_bean);
			}
			
			tx.commit();
			tx.close();
			sessao.close();
			ConexaoNeo4J.FecharConexao(neo_conexao);
			
			/* Retorno */
			return lista_produtos;
		}
		catch (Exception e) { 
			e.printStackTrace(); 
			return null;
		}
	}
	
	public ArrayList<ProdutoBean> BuscarListaDadosLojaProdutosFiltroPorNomeProduto(int pagina_atual, String nome_produto) {
		/*
		 * Busca dados principais dos produtos na loja online com filtro pelo nome.
		 * - Assintótica: O(n), sendo 'n' a qnt de produtos cadastrados
		 * */
		try {			
			String cypher = "MATCH (n:Produto {status : '2'})"
						  + " WITH n"
						  + " MATCH (m:Usuario) -[:Cadastrou]-> (n)"
						  + " WHERE toLower(n.nome) =~ toLower($nome_produto)"
						  + " RETURN n.uuid AS uuid, n.nome AS nome, n.moeda AS moeda,"
					      + " 		 n.preco AS preco, n.tipoPrincipal AS tipoPrincipal,"
					      + " 		 m.nickname AS vendedor"
					      + " ORDER BY nome ASC"
					      + " SKIP 9 * $pagina_atual"
					      + " LIMIT 9";
			
			Driver neo_conexao = ConexaoNeo4J.AbrirConexao();
			Session sessao = neo_conexao.session();
			Transaction tx = sessao.beginTransaction();
			Result rs; Record registro;
			Map<String, Object> params = new HashMap<String, Object>();
			ArrayList<ProdutoBean> lista_produtos = new ArrayList<ProdutoBean>();
			
			params.put("nome_produto", ".*" + nome_produto + ".*");
			params.put("pagina_atual", pagina_atual - 1);
			rs = tx.run(cypher, params);
			
			while(rs.hasNext()) {
				registro = rs.next();
		
				ProdutoBean produto_bean = new ProdutoBean();
				produto_bean.setUuid(registro.get("uuid").asString());
				produto_bean.setNome(registro.get("nome").asString());
				produto_bean.setMoeda(registro.get("moeda").asString());
				produto_bean.setPreco(registro.get("preco").asString());
				produto_bean.setTipoPrincipal(registro.get("tipoPrincipal").asString());
				produto_bean.setVendedor(registro.get("vendedor").asString());
				
				lista_produtos.add(produto_bean);
			}
			
			tx.commit();
			tx.close();
			sessao.close();
			ConexaoNeo4J.FecharConexao(neo_conexao);
			
			/* Retorno */
			return lista_produtos;
		}
		catch (Exception e) { 
			e.printStackTrace(); 
			return null;
		}
	}
	
	public int BuscarQuantidadeProdutosCadastradosPorUsuario(String uuid_usuario) {
		/*
		 * Busca da quantidade de produtos cadastrados por um usuário em específico.
		 * - Assintótica: O(n), sendo 'n' quantidade de produtos cadastrados
		 * */
		try {
			String cypher = "MATCH (n:Produto) <-[:Cadastrou]- (:Usuario { uuid_usuario: $uuid_usuario })"
						  + " RETURN COUNT(n) AS quantidade_produtos";
			Driver neo_conexao = ConexaoNeo4J.AbrirConexao();
			Session sessao = neo_conexao.session();
			Transaction tx = sessao.beginTransaction();
			Result rs; Record registro;
			Map<String, Object> params = new HashMap<String, Object>();
			int quantidade_produtos = 0;
			
			params.put("uuid_usuario", uuid_usuario);
			rs = tx.run(cypher, params);
			
			while(rs.hasNext()) { 
				registro = rs.next();
				quantidade_produtos = registro.get("quantidade_produtos").asInt();
			}
			
			tx.commit();
			tx.close();
			sessao.close();
			ConexaoNeo4J.FecharConexao(neo_conexao);
			
			/* Retorno */
			return quantidade_produtos;
		}
		catch (Exception e) { 
			e.printStackTrace(); 
			return 0;
		}
	}
	
	public int BuscarQuantidadeProdutosCadastradosPorUsuarioFiltroPorNomeProduto(String uuid_usuario, String nome_produto) {
		/*
		 * Busca da quantidade de produtos cadastrados por um usuário em específico.
		 * - Assintótica: O(n), sendo 'n' quantidade de produtos cadastrados
		 * */
		try {
			String cypher = "MATCH (n:Produto) <-[:Cadastrou]- (:Usuario { uuid_usuario: $uuid_usuario })"
						  + " WHERE toLower(n.nome) =~ toLower($nome_produto)"
						  + " RETURN COUNT(n) AS quantidade_produtos";
			Driver neo_conexao = ConexaoNeo4J.AbrirConexao();
			Session sessao = neo_conexao.session();
			Transaction tx = sessao.beginTransaction();
			Result rs; Record registro;
			Map<String, Object> params = new HashMap<String, Object>();
			int quantidade_produtos = 0;
			
			params.put("uuid_usuario", uuid_usuario);
			params.put("nome_produto", ".*" + nome_produto + ".*");
			rs = tx.run(cypher, params);
			
			while(rs.hasNext()) { 
				registro = rs.next();
				quantidade_produtos = registro.get("quantidade_produtos").asInt();
			}
			
			tx.commit();
			tx.close();
			sessao.close();
			ConexaoNeo4J.FecharConexao(neo_conexao);
			
			/* Retorno */
			return quantidade_produtos;
		}
		catch (Exception e) { 
			e.printStackTrace(); 
			return 0;
		}
	}
	
	public int BuscarQuantidadeProdutosCadastradosLoja() {
		/*
		 * Busca da quantidade de produtos cadastrados para paginação no painel do mercado online.
		 * - Assintótica: O(n), sendo 'n' quantidade de produtos cadastrados
		 * */
		try {
			String cypher = "MATCH (n:Produto {status : '2'})"
						  + " RETURN COUNT(n) AS quantidade_produtos";
			Driver neo_conexao = ConexaoNeo4J.AbrirConexao();
			Session sessao = neo_conexao.session();
			Transaction tx = sessao.beginTransaction();
			Result rs; Record registro;
			int quantidade_produtos = 0;
			
			rs = tx.run(cypher);
			
			while(rs.hasNext()) { 
				registro = rs.next();
				quantidade_produtos = registro.get("quantidade_produtos").asInt();
			}
			
			tx.commit();
			tx.close();
			sessao.close();
			ConexaoNeo4J.FecharConexao(neo_conexao);
			
			/* Retorno */
			return quantidade_produtos;
		}
		catch (Exception e) { 
			e.printStackTrace(); 
			return 0;
		}
	}
	
	public int BuscarQuantidadeProdutosCadastradosLojaFiltroPorNomeProduto(String nome_produto) {
		/*
		 * Busca da quantidade de produtos cadastrados para paginação no painel do mercado online.
		 * - Assintótica: O(n), sendo 'n' quantidade de produtos cadastrados
		 * */
		try {
			String cypher = "MATCH (n:Produto {status : '2'})"
						  + " WHERE toLower(n.nome) =~ toLower($nome_produto)"
						  + " RETURN COUNT(n) AS quantidade_produtos";
			Driver neo_conexao = ConexaoNeo4J.AbrirConexao();
			Session sessao = neo_conexao.session();
			Transaction tx = sessao.beginTransaction();
			Result rs; Record registro;
			Map<String, Object> params = new HashMap<String, Object>();
			int quantidade_produtos = 0;
			
			params.put("nome_produto", ".*" + nome_produto + ".*");
			rs = tx.run(cypher, params);
			
			while(rs.hasNext()) { 
				registro = rs.next();
				quantidade_produtos = registro.get("quantidade_produtos").asInt();
			}
			
			tx.commit();
			tx.close();
			sessao.close();
			ConexaoNeo4J.FecharConexao(neo_conexao);
			
			/* Retorno */
			return quantidade_produtos;
		}
		catch (Exception e) { 
			e.printStackTrace(); 
			return 0;
		}
	}
	
	public ArrayList<Integer> SelecionarContagemStatus(String uuid_usuario) {
		/*
		 * Busca na quantidade de produtos agrupados por status (pendente, à venda, vendido)
		 *
		 * - Assintótica: O(n + m + o), sendo 'n', 'm' e 'o' quantidade de produtos cadastrados
		 * nos status 'pendente', 'à venda' e 'vendido' respectivamente
		 * */
		try {			
			String cypher = "MATCH (n:Produto {status: '1'}) <-[:Cadastrou]- (:Usuario {uuid_usuario: $uuid_usuario})"
						  + " RETURN COUNT(n) AS quantidade"
						  
						  + " UNION ALL"
						  
						  + " MATCH (m:Produto {status: '2'}) <-[:Cadastrou]- (:Usuario {uuid_usuario: $uuid_usuario})"
						  + " RETURN COUNT(m) AS quantidade"
						  
						  + " UNION ALL"
						  
						  + " MATCH (o:Produto {status: '3'}) <-[:Cadastrou]- (:Usuario {uuid_usuario: $uuid_usuario})"
						  + " RETURN COUNT(o) AS quantidade";
			Driver neo_conexao = ConexaoNeo4J.AbrirConexao();
			Session sessao = neo_conexao.session();
			Transaction tx = sessao.beginTransaction();
			Result rs; Record registro;
			Map<String, Object> params = new HashMap<String, Object>();
			ArrayList<Integer> contagem_status = new ArrayList<Integer>(); // [pendente, à venda, vendido]
			
			params.put("uuid_usuario", uuid_usuario);
			rs = tx.run(cypher, params);
			
			while (rs.hasNext()) {
				registro = rs.next();
				contagem_status.add(registro.get("quantidade").asInt());
			}
			
			tx.commit();
			tx.close();
			sessao.close();
			ConexaoNeo4J.FecharConexao(neo_conexao);
			
			/* Retorno */
			return contagem_status;
		}
		catch (Exception e) { 
			e.printStackTrace(); 
			return null;
		}
	}
	
	public Map<String, Integer> SelecionarProdutosMaisVistos(String uuid_usuario) {
		/*
		 * Busca dos três produtos com maior quantidade de visualizações e status como 'à venda'
		 * - Assintótica: O(n), sendo 'n' quantidade de produtos cadastrados
		 * */
		try {
			String cypher = "MATCH (n:Produto {status: '2'}) <-[:Cadastrou]- (:Usuario {uuid_usuario: $uuid_usuario})"
					      + " RETURN n.nome AS nome, n.visualizacoes AS visualizacoes"
					      + " ORDER BY n.visualizacoes DESC"
					      + " LIMIT 3";
			Driver neo_conexao = ConexaoNeo4J.AbrirConexao();
			Session sessao = neo_conexao.session();
			Transaction tx = sessao.beginTransaction();
			Result rs; Record registro;
			Map<String, Object> params = new HashMap<String, Object>();
			Map<String, Integer> produtos_vistos = new HashMap<String, Integer>();
			
			params.put("uuid_usuario", uuid_usuario);
			rs = tx.run(cypher, params);
			
			while (rs.hasNext()) {
				registro = rs.next();
				
				produtos_vistos.put(registro.get("nome").asString(),
							        registro.get("visualizacoes").asInt());
			}
			
			tx.commit();
			tx.close();
			sessao.close();
			ConexaoNeo4J.FecharConexao(neo_conexao);
			
			/* Retorno */
			return produtos_vistos;
		}
		catch (Exception e) { 
			e.printStackTrace(); 
			return null;
		}
	}
	
	public String TransformarTipoPrincipalProduto(String tipo_principal, int idioma) {
		/*
		 * Transformação do código do tipo principal do produto para uma Map (código, descrição)
		 * - Assintótica: O(n), sendo 'n' quantidade de tipos de produtos disponíveis no sistema
		 * */
		return ValidacaoCodigoDescricaoTipoProduto(tipo_principal, idioma);
	}
	
	public String[] TransformarOutrosTiposProduto(String[] outros_tipos, String tipo_principal, int idioma) {
		/*
		 * Transformação dos códigos dos tipos secundários do produto para uma Map (código, descrição)
		 * 
		 * - Assintótica: O(n * m), sendo 'n' quantidade de tipos de produtos disponíveis no sistema
		 * e 'm' a quantidade de tipos secundários atribuídos ao produto
		 * */
		
		// verificação se o produto possui apenas o "tipo principal", ou seja
		// se o array "outros tipos" possui apenas um elemento: o código do tipo principal
		// caso sim, é retornado "null", pois o "tipo principal" já foi transformado no método
		// "TransformarTipoPrincipalProduto", chamado anteriormente no código
		if (outros_tipos.length == 1) { return null; }
		
		String[] outros_tipos_transformados = new String[outros_tipos.length - 1];

		// contagem do index para armazenar os tipos transformados dentro do array
		// ele é usado pois quando o outro_tipo for igual ao tipo_principal,
		// haverá quebra da sequência, porque ele será ignorado
		int index_outros_tipos = 0;
		
		// Checagem e transformação de cada tipo
		for (int i = 0; i < outros_tipos.length; i++) {
			
			// checagem se o outro_tipo é igual ao tipo_principal
			// caso for, a transformação dele é anulada, já que o tipo_principal
			// já foi transformado anteriormente
			if (outros_tipos[i].equals(tipo_principal)) { continue; }
			
			else {				
				outros_tipos_transformados[index_outros_tipos] = ValidacaoCodigoDescricaoTipoProduto(outros_tipos[i], idioma);
				index_outros_tipos += 1;
			}
		}

		/* Retorno */
		return outros_tipos_transformados;
	}
	
	/*
	 * Métodos Privados (Não-Visíveis)
	 * */
	private String ValidacaoCodigoDescricaoTipoProduto(String codigo_tipo, int idioma) {
		/*
		 * Transformação do tipo do usuário do código para uma Map (código, descrição)
		 * - Assintótica: O(n), sendo 'n' quantidade de tipos de produtos disponíveis no sistema
		 * */
		
		// Definição dos pares <codigo, descrição>
		Map<String, String[]> par_codigo_descricao = new HashMap<String, String[]>();

		par_codigo_descricao.put("1", new String[] {"Doces", "Candy"});
		par_codigo_descricao.put("2", new String[] {"Salgados", "Salty"});
		par_codigo_descricao.put("3", new String[] {"Outros Alimentos", "Other Foods"});
		par_codigo_descricao.put("4", new String[] {"Celulares", "Cellphones"});
		par_codigo_descricao.put("5", new String[] {"Informática", "Computing"});

		par_codigo_descricao.put("6", new String[] {"Games", "Games"});
		par_codigo_descricao.put("7", new String[] {"Livros", "Books"});
		par_codigo_descricao.put("8", new String[] {"Mangás", "Mangas"});
		par_codigo_descricao.put("9", new String[] {"Brinquedos", "Toys"});
		par_codigo_descricao.put("10", new String[] {"Decoração", "Decoration"}); 

		par_codigo_descricao.put("11", new String[] {"Roupas", "Clothes"});
		par_codigo_descricao.put("12", new String[] {"Perfumaria", "Perfumery"});
		par_codigo_descricao.put("13", new String[] {"Eletrodomésticos", "Home Appliances"});
		par_codigo_descricao.put("14", new String[] { "Móveis", "Furnitures"});
		par_codigo_descricao.put("15", new String[] {"Empresariais", "Business"});

		par_codigo_descricao.put("16", new String[] {"Carros", "Cars"});
		par_codigo_descricao.put("17", new String[] {"Motos", "Motorcycles"});
		par_codigo_descricao.put("18", new String[] {"Caminhões", "Trucks"});
		par_codigo_descricao.put("19", new String[] {"Caminhonetes", "Pickup Trucks"});
		par_codigo_descricao.put("20", new String[] {"Outros", "Others"});
		
		// Checagem dos pares com idioma Português - Brasil
		if (idioma == 1) { return par_codigo_descricao.get(codigo_tipo)[0]; }
		
		// Checagem dos pares com idioma Inglês - USA
		else { return par_codigo_descricao.get(codigo_tipo)[1]; }
	}
	
	/*
	 * Métodos Especiais (Uso somente via autorização)
	 * */
	public boolean CadastrarProdutoSemFotoPorQuantidade(ProdutoBean produto_bean, int quantidade) {
		/*
		 * Cadastra produtos no Neo4j sem foto. Um relacionamento também é criado
		 * por meio da UUID do usuário que cadastrou.
		 * 
		 * - Assintótica: O(1)
		 * */
			
		try {

			for (int i = 0; i < quantidade; i++) {
				/* Neo4J */
				String cypher = "MATCH (m:Usuario { uuid_usuario: $uuid_usuario })" 
							  + " WITH randomUUID() as uuid_produto, m"
							  + " CREATE (n:Produto { uuid: uuid_produto, nome: TRIM($nome), preco: $preco, "
						      + " moeda: $moeda, descricao: TRIM($descricao), estoque: $estoque, status: $status,"
							  + " tipoPrincipal: $tipoPrincipal, outrosTipos: $outrosTipos, visualizacoes: 0 })"
						      + " CREATE (n)<-[:Cadastrou]-(m)"
							  + " RETURN uuid_produto";
				Driver neo_conexao = ConexaoNeo4J.AbrirConexao();
				Session sessao = neo_conexao.session();
				Transaction tx = sessao.beginTransaction();
				Result rs; Record registro;
				Map<String, Object> params = new HashMap<String, Object>();
					
				params.put("uuid_usuario", produto_bean.getUuidUsuario());
				params.put("nome", produto_bean.getNome() + " " + i);
				params.put("preco", produto_bean.getPreco());
				params.put("moeda", produto_bean.getMoeda());
				params.put("descricao", produto_bean.getDescricao());
				params.put("estoque", produto_bean.getEstoque());
				params.put("status", produto_bean.getStatus());
				params.put("tipoPrincipal", produto_bean.getTipoPrincipal());
				params.put("outrosTipos", produto_bean.getOutrosTipos());
					
				rs = tx.run(cypher, params);
					
				while (rs.hasNext()) {
					registro = rs.next();
					String uuid_produto = registro.get("uuid_produto").asString();
						
					/* MySQL */
					String sql = "INSERT INTO produto_imagens(foto_1, foto_2, foto_3, foto_4, foto_5, foto_6, uuid_produto)" 
							   + " VALUES (?, ?, ?, ?, ?, ?, UUID_TO_BIN(?));";
					Connection conexao = ConexaoMySQLImagens.AbrirConexao();
					PreparedStatement smtp = conexao.prepareStatement(sql);
						
					smtp.setNull(1, Types.NULL);
					smtp.setNull(2, Types.NULL);
					smtp.setNull(3, Types.NULL);
					smtp.setNull(4, Types.NULL);
					smtp.setNull(5, Types.NULL);
					smtp.setNull(6, Types.NULL);
					smtp.setString(7, uuid_produto);
						
					smtp.executeUpdate();				
					smtp.close();
					ConexaoMySQLImagens.FecharConexao(conexao);
				}
					
				tx.commit();
				tx.close();
				sessao.close();
				ConexaoNeo4J.FecharConexao(neo_conexao);
			}

			/* Retorno */
			return true;
		}
		catch (Exception e) { 
			e.printStackTrace(); 
			return false;
		}	
	}
}