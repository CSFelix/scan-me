package Bean;

public class AlteracaoSenhaBean {
	public AlteracaoSenhaBean(String uuid_alteracao_senha, String hash, String codigo
							  , int usado, int expirado, String uuid_usuario) {
		
		setUuidAlteracaoSenha(uuid_alteracao_senha); setHash(hash); setCodigo(codigo); 
		setUsado(usado); setExpirado(expirado); setUuidUsuario(uuid_usuario);
	}
	
	public AlteracaoSenhaBean(String hash, String codigo, String uuid_usuario) {
		setHash(hash); setCodigo(codigo); setUuidUsuario(uuid_usuario);
	}
	
	public AlteracaoSenhaBean() { }
	
	private String uuid_alteracao_senha;
	private String codigo;
	private boolean usado;
	private boolean expirado;
	private String uuid_usuario;
	private String hash;
	private String email_usuario;
	private int idioma;
	
	public String getUuidAlteracaoSenha() { return uuid_alteracao_senha; }
	public void setUuidAlteracaoSenha(String uuid_alteracao_senha) { this.uuid_alteracao_senha = uuid_alteracao_senha; }
	
	public String getCodigo() { return codigo; }
	public void setCodigo(String codigo) { this.codigo = codigo; }
	
	public boolean isUsado() { return usado; }
	public void setUsado(int usado) { this.usado = usado == 0 ? false : true; }
	
	public boolean isExpirado() { return expirado; }
	public void setExpirado(int expirado) { this.expirado = expirado == 0 ? false : true; }
	
	public String getUuidUsuario() { return uuid_usuario; }
	public void setUuidUsuario(String uuid_usuario) { this.uuid_usuario = uuid_usuario; }
	
	public String getHash() { return hash; }
	public void setHash(String hash) { this.hash = hash; }
	
	public String getEmailUsuario() { return email_usuario; }
	public void setEmailUsuario(String email) { this.email_usuario = email; }
	
	public int getIdioma() { return idioma; }
	public void setIdioma(int idioma) { this.idioma = idioma; }
}