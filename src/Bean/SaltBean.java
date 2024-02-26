package Bean;

public class SaltBean {
	public SaltBean(String uuid_salt, String valor_salt, String uuid_usuario) { 
		setUuidSalt(uuid_salt); setValorSalt(valor_salt); setUuidUsuario(uuid_usuario);
	}
	
	public SaltBean(String valor_salt, String uuid_usuario) { setValorSalt(valor_salt); setUuidUsuario(uuid_usuario); }
	
	public SaltBean() { }
	
	private String uuid_salt;
	private String valor_salt;
	private String uuid_usuario;
	
	public String getUuidSalt() { return uuid_salt; }
	public void setUuidSalt(String uuid_salt) { this.uuid_salt = uuid_salt; }
	
	public String getValorSalt() { return valor_salt; }
	public void setValorSalt(String valor_salt) { this.valor_salt = valor_salt; }
	
	public String getUuidUsuario() { return uuid_usuario; }
	public void setUuidUsuario(String uuid_usuario) { this.uuid_usuario = uuid_usuario; }
}