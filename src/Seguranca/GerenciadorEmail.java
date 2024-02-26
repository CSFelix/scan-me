package Seguranca;

import java.util.Properties;
import javax.mail.*;  
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;  

public class GerenciadorEmail {
	/*
	 * Classe Responsável por encaminhar emails aos usuários
	 * */
	
	public GerenciadorEmail(String destinatario, String uuid_usuario, String uuid_alteracao, String codigo_alteracao, int idioma) {
		this.destinatario = destinatario; this.uuid_usuario = uuid_usuario; 
		this.uuid_alteracao = uuid_alteracao; this.codigo_alteracao = codigo_alteracao;
		this.idioma = idioma;
	}
	
	String email = "---@---.---";
	String senha = "---";
	String ip_servidor = "localhost";
	
	String destinatario;
	String uuid_usuario;
	String uuid_alteracao;
	String codigo_alteracao;
	int idioma;
	
	public boolean EnviarEmailAlteracaoSenha() {
		/*
		 * Encaminha email para alteração de senha ao usuário
		 * 
		 * Assintótica: O(1)
		 * */
		
		String assunto;
		String texto_mensagem;
		
		// portugues - brazil
		if (this.idioma == 1) {
			assunto = "[Equipe ScanMe] Alteração de Senha!";
			texto_mensagem = "<center><h1><b>Alteração de Senha Solicitada!</b></h1></center>"
					+ "<p>Uma solicitação de senha foi realizada para este usuário, se não foi você, pode ignorar esta mensagem. "
					+ "Caso deseja continuar com a operação, "
					/*+ "<a href='https://" + this.ip_servidor + ":8443/Scan-Me/alteracao-senha.jsp?hash_usuario=" + this.uuid_usuario + "&hash_alteracao_senha=" + this.uuid_alteracao*/
					+ "<a href='http://" + this.ip_servidor + ":8080/Scan-Me/alteracao-senha.jsp?hash_usuario=" + this.uuid_usuario + "&hash_alteracao_senha=" + this.uuid_alteracao
					+ "' target='_blank'>Clique aqui</a> para ser redirecionada à página de alteração."
					+ "<p>Anexamos um arquivo ATT00001.htm (pode ser que venha com outro nome rsrs) neste mensagem para você salvar o email no computador e acessar o link de alteração de senha a qualquer momento.</p>"
					+ "<br>"
					+ "<center><h2>Código Alteracão: <u>" + this.codigo_alteracao + "</u></h2></center>";
		}
		
		// english - usa
		else {
			assunto = "[Equipe ScanMe] Password Change!";
			texto_mensagem = "<center><h1><b>Password Change Requested!</b></h1></center>"
					+ "<p>A password change was requested for this user, if don't you, you can ignore this message. "
					+ "If you want to continue with this operation, "
					/*+ "<a href='https://" + this.ip_servidor + ":8443/Scan-Me/alteracao-senha.jsp?hash_usuario=" + this.uuid_usuario + "&hash_alteracao_senha=" + this.uuid_alteracao*/
					+ "<a href='http://" + this.ip_servidor + ":8080/Scan-Me/alteracao-senha.jsp?hash_usuario=" + this.uuid_usuario + "&hash_alteracao_senha=" + this.uuid_alteracao
					+ "' target='_blank'>Click here</a> to go to Change Page."
					+ "<p>We add the file ATT00001.htm (it can have another name LOL) in this message in order to you save this email in your computer and access the link whenever you want.</p>"
					+ "<br>"
					+ "<center><h2>Your Code: <u>" + this.codigo_alteracao + "</u></h2></center>";
		}
		
		Properties propriedades = new Properties();
		propriedades.put("mail.smtp.port", 25); // porta do servidor smtp 587 ou 25
		propriedades.put("mail.smtp.host", "smtp.office365.com"); // servidor smtp da outlook
		propriedades.put("mail.smtp.starttls.enable", "true"); // habilitando criptografia de envio
		propriedades.put("mail.debug", "true"); // depuração se caso algum erro ocorrer
		propriedades.put("mail.smtp.auth", "true"); // login automático no email
		
		// Inicia sessão no email realizano o login automático
		Session sessao = Session.getDefaultInstance(propriedades,
				new javax.mail.Authenticator() {
					protected PasswordAuthentication getPasswordAuthentication() {
						return new PasswordAuthentication(email, senha);
					}
				}
		);
		
		// Preparação da Mensagem a ser Enviada
		try {
			MimeMessage mensagem = new MimeMessage(sessao);
			mensagem.setFrom(new InternetAddress(email));
			mensagem.addRecipient(Message.RecipientType.TO, new InternetAddress(this.destinatario));
			mensagem.setSubject(assunto);
			
			MimeMultipart multipart = new MimeMultipart("related");
			BodyPart messageBodyPart = new MimeBodyPart();
			
			// Adiciona texto na mensagem
			//messageBodyPart.setContent(texto_mensagem, "text/html");
			
			messageBodyPart.setHeader("Content-Type", "text/html; charset=\"iso-8859-1\"");
			messageBodyPart.setContent(texto_mensagem, "text/html; charset=iso-8859-1");
			messageBodyPart.setHeader("Content-Transfer-Encoding", "quoted-printable");
			
			multipart.addBodyPart(messageBodyPart);
			
			// Envio do email
	        multipart.addBodyPart(messageBodyPart);
			mensagem.setContent(multipart);
			
			Transport.send(mensagem);
			System.out.println("Email Enviado");
		}
		catch (MessagingException e) {
			System.out.println("Email Não Enviado");
			System.out.println(e);
			return false;
		}
		
		return true;
	}
	
	public boolean EnviarEmailNovoCodigoAlteracaoSenha() {
		/*
		 * Encaminha email para alteração de senha ao usuário
		 * 
		 * Assintótica: O(1)
		 * */
		
		String assunto;
		String texto_mensagem;
		
		// português - brasil
		if (this.idioma == 1) {
			assunto = "[Equipe ScanMe] Alteração de Senha!";
			texto_mensagem = "<center><h1><b>Novo Código Solicitado!</b></h1></center>"
					+ "<p>Um novo Código foi gerado para a redefinição de sua senha!"
					+ "<center><h2>Código Alteracão: <u>" + this.codigo_alteracao + "</u></h2></center>"
					+ "<br><p>Para continuar com a alteração, volte à página ou </p>"
					/*+ "<a href='https://" + this.ip_servidor  + ":8443/Scan-Me/alteracao-senha.jsp?hash_usuario=" + this.uuid_usuario + "&hash_alteracao_senha=" + this.uuid_alteracao*/
					+ "<a href='http://" + this.ip_servidor  + ":8080/Scan-Me/alteracao-senha.jsp?hash_usuario=" + this.uuid_usuario + "&hash_alteracao_senha=" + this.uuid_alteracao
					+ "' target='_blank'>Clique aqui</a> para ser redirecionado a ela."
					+ "<p>Anexamos um arquivo ATT00001.htm (pode ser que venha com outro nome rsrs) neste mensagem para você salvar o email no computador e acessar o link de alteração de senha a qualquer momento.</p>"
					+ "<br>";
		}
		
		// english - usa
		else {
			assunto = "[Equipe ScanMe] Change Password!";
			texto_mensagem = "<center><h1><b>New Code Requested!</b></h1></center>"
					+ "<p>A new code was generated to you change your password!"
					+ "<center><h2>Your New Code: <u>" + this.codigo_alteracao + "</u></h2></center>"
					+ "<br><p>In order to continue this operation, come back to the website or </p>"
					/*+ "<a href='https://" + this.ip_servidor  + ":8443/Scan-Me/alteracao-senha.jsp?hash_usuario=" + this.uuid_usuario + "&hash_alteracao_senha=" + this.uuid_alteracao*/
					+ "<a href='http://" + this.ip_servidor  + ":8080/Scan-Me/alteracao-senha.jsp?hash_usuario=" + this.uuid_usuario + "&hash_alteracao_senha=" + this.uuid_alteracao
					+ "' target='_blank'>Click here</a> to go there."
					+ "<p>We add the file ATT00001.htm (it can have another name LOL) in this message in order to you save this email in your computer and access the link whenever you want.</p>"
					+ "<br>";
		}
		
		Properties propriedades = new Properties();
		propriedades.put("mail.smtp.port", 25); // porta do servidor smtp porta 25 ou 587
		propriedades.put("mail.smtp.host", "smtp.office365.com"); // servidor smtp da outlook
		propriedades.put("mail.smtp.starttls.enable", "true"); // habilitando criptografia de envio
		propriedades.put("mail.debug", "true"); // depuração se caso algum erro ocorrer
		propriedades.put("mail.smtp.auth", "true"); // login automático no email
		
		// Inicia sessão no email realizano o login automático
		Session sessao = Session.getDefaultInstance(propriedades,
				new javax.mail.Authenticator() {
					protected PasswordAuthentication getPasswordAuthentication() {
						return new PasswordAuthentication(email, senha);
					}
				}
		);
		
		// Preparação da Mensagem a ser Enviada
		try {
			MimeMessage mensagem = new MimeMessage(sessao);
			mensagem.setFrom(new InternetAddress(email));
			mensagem.addRecipient(Message.RecipientType.TO, new InternetAddress(this.destinatario));
			mensagem.setSubject(assunto);
			
			MimeMultipart multipart = new MimeMultipart("related");
			BodyPart messageBodyPart = new MimeBodyPart();
			
			// Adiciona texto na mensagem
			//messageBodyPart.setContent(texto_mensagem, "text/html");
			
			messageBodyPart.setHeader("Content-Type", "text/html; charset=\"iso-8859-1\"");
			messageBodyPart.setContent(texto_mensagem, "text/html; charset=iso-8859-1");
			messageBodyPart.setHeader("Content-Transfer-Encoding", "quoted-printable");
			
			multipart.addBodyPart(messageBodyPart);
			
			// Envio do email
	        multipart.addBodyPart(messageBodyPart);
			mensagem.setContent(multipart);
			
			Transport.send(mensagem);
			System.out.println("Email Enviado");
		}
		catch (MessagingException e) {
			System.out.println("Email Não Enviado");
			System.out.println(e);
			return false;
		}
		
		return true;
	}
}