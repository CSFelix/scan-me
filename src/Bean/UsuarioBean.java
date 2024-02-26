package Bean;

public class UsuarioBean {
	public UsuarioBean(String uuid_usuario, String nickname, String email
					   , String numero_whatsapp, String numero_telegram
					   , int bloqueado, int online, String senha, String avatarBase64) {
		
		setUuidUsuario(uuid_usuario);  setNickname(nickname); setEmail(email);
		setNumeroWhatsapp(numero_whatsapp); setNumeroTelegram(numero_telegram);
		setBloqueado(bloqueado); setOnline(online); setSenha(senha);
		setAvatarBase64(avatarBase64);
	}
	
	public UsuarioBean() { }
	
	private String uuid_usuario;
	private String nickname;
	private String email;
	private String numero_whatsapp;
	private String numero_telegram;
	private String id_telegram;
	private boolean bloqueado;
	private boolean online;
	private String tipo_usuario;
	private String senha;
	private String avatarBase64;
	
	public String getUuidUsuario() { return uuid_usuario; }
	public void setUuidUsuario(String uuid_usuario) { this.uuid_usuario = uuid_usuario; }
	
	public String getNickname() { return nickname; }
	public void setNickname(String nickname) { this.nickname = nickname; }
	
	public String getEmail() { return email; }
	public void setEmail(String email) { this.email = email; }
	
	public String getNumeroWhatsapp() { return numero_whatsapp; }
	public void setNumeroWhatsapp(String numero_whatsapp) { this.numero_whatsapp = numero_whatsapp; }
	
	public String getNumeroTelegram() { return numero_telegram; }
	public void setNumeroTelegram(String numero_telegram) { this.numero_telegram = numero_telegram; }
	
	public String getIdTelegram() { return this.id_telegram; }
	public void setIdTelegram(String id_telegram) { this.id_telegram = id_telegram; }
	
	public boolean isBloqueado() { return bloqueado; }
	public void setBloqueado(int bloqueado) { this.bloqueado = bloqueado == 0 ? false : true; }
	
	public boolean isOnline() { return online; }
	public void setOnline(int online) { this.online = online == 0 ? false : true; }
	
	public String getTipoUsuario() { return tipo_usuario; }
	public void setTipoUsuario(String tipo_usuario) { this.tipo_usuario = tipo_usuario; }
	
	public String getSenha() { return senha; }
	public void setSenha(String senha) { this.senha = senha; }
	
	public String getAvatarBase64() { return avatarBase64; }
	public void setAvatarBase64 (String avatar) { this.avatarBase64 = avatar; }
}