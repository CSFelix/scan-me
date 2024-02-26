package Bean;

public class ProdutoBean {
	public ProdutoBean(String uuid, String nome, String preco, String moeda, String descricao,
			           String estoque, String status, String tipo_principal, String[] outros_tipos,
			           int visualizacoes) {
		
		setUuid(uuid); setNome(nome); setPreco(preco); setMoeda(moeda); setDescricao(descricao);
		setEstoque(estoque); setStatus(status); setTipoPrincipal(tipo_principal); setOutrosTipos(outros_tipos);
		setVisualizacoes(visualizacoes);
	}
	
	public ProdutoBean() { }
	
	private String uuid;
	private String uuid_usuario;
	private String nome;
	private String preco;
	private String moeda;
	private String descricao;
	private String estoque;
	private String status;
	private String tipo_principal;
	private String[] outros_tipos;
	private int visualizacoes;
	private String vendedor;
	
	public String getUuid() { return uuid; }
	public void setUuid(String uuid) { this.uuid = uuid; }
	
	public String getUuidUsuario() { return uuid_usuario; }
	public void setUuidUsuario(String uuid_usuario) { this.uuid_usuario = uuid_usuario; }
	
	public String getNome() { return nome; }
	public void setNome(String nome) { this.nome = nome; }

	public String getPreco() { return preco; }
	public void setPreco(String preco) { this.preco = preco; }

	public String getMoeda() { return moeda; }
	public void setMoeda(String moeda) { this.moeda = moeda; }

	public String getDescricao() { return descricao; }
	public void setDescricao(String descricao) { this.descricao = descricao; }

	public String getEstoque() { return estoque; }
	public void setEstoque(String estoque) { this.estoque = estoque; }

	public String getStatus() { return status; }
	public void setStatus(String status) { this.status = status; }

	public String getTipoPrincipal() { return tipo_principal; }
	public void setTipoPrincipal(String tipo_principal) { this.tipo_principal = tipo_principal; }

	public String[] getOutrosTipos() { return outros_tipos; }
	public void setOutrosTipos(String[] outros_tipos) { this.outros_tipos = outros_tipos; }

	public int getVisualizacoes() { return visualizacoes; }
	public void setVisualizacoes(int visualizacoes) { this.visualizacoes = visualizacoes; }
	
	public String getVendedor() { return vendedor; }
	public void setVendedor(String vendedor) { this.vendedor = vendedor; }
}