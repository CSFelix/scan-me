<%@page import="Dao.UsuarioDao"%>

<%
	String usuario_uuid = (String) session.getAttribute("usuario_uuid");
	UsuarioDao usuario_dao = new UsuarioDao();
	
	// Usuário deslogado com sucesso e reset das sessions
	// das informações do usuário deslogado
	if (usuario_dao.StatusDeslogado(usuario_uuid)) {
		session.removeAttribute("usuario_nickname");
		session.removeAttribute("usuario_email");
		session.removeAttribute("usuario_whatsapp");
		session.removeAttribute("usuario_telegram");
		session.removeAttribute("usuario_uuid");
	}
%>