package Testes;

import java.util.HashMap;
import java.util.Map;

import BancoDados.ConexaoRedis;
import redis.clients.jedis.Jedis;

public class Teste {

	public static void main(String[] args) {
		
		/*ProdutoBean produto_bean = new ProdutoBean();
		ProdutoDao produto_dao = new ProdutoDao();
		
		produto_bean.setUuidUsuario("68b7d4cb-1fe0-11ec-970e-0897986676d8");
		produto_bean.setNome("Produto");
		produto_bean.setPreco("20");
		produto_bean.setMoeda("1");
		produto_bean.setDescricao("tanto faz");
		produto_bean.setEstoque("3");
		produto_bean.setStatus("1");
		produto_bean.setTipoPrincipal("5");
		produto_bean.setOutrosTipos(new String[] {"5", "3"});
		
		produto_dao.CadastrarProdutoSemFotoPorQuantidade(produto_bean, 20);
		
		System.out.println("alright!");*/
		
		Map<String, String> avalue = new HashMap<String, String>();
		avalue.put("name", "goku");
		avalue.put("breed", "sayan");
		avalue.put("kind", "male");
		
		
		Jedis jedis = ConexaoRedis.AbrirConexao();
		
		jedis.hmset("key", avalue);
		System.out.println(jedis.hmget("key", "name"));
		
		ConexaoRedis.FecharConexao(jedis);
		
		System.out.println("All right");
	}
}
