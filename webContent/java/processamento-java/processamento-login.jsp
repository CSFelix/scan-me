<%@page import="Bean.UsuarioBean" %>
<%@page import="Dao.UsuarioDao" %>
<%@page import="Seguranca.StripHTML" %>

<%
	UsuarioBean usuario_bean = new UsuarioBean();
	usuario_bean.setEmail(StripHTML.StripString(request.getParameter("email")));
	usuario_bean.setSenha(StripHTML.StripString(request.getParameter("senha")));
	
	UsuarioDao usuario_dao = new UsuarioDao();
	usuario_bean = usuario_dao.Login(usuario_bean);
	
	// falha no login >> usuário e/ou senha incorretos
	if (usuario_bean == null) {
%>
		0
<%
	}
	
	// sucesso no login
	// armazenamento das informações do usuário logado na session
	// tais informações são usadas no painel
	else {
		session.setAttribute("usuario_nickname", usuario_bean.getNickname());
		session.setAttribute("usuario_email", usuario_bean.getEmail());
		session.setAttribute("usuario_whatsapp", usuario_bean.getNumeroWhatsapp());
		session.setAttribute("usuario_telegram", usuario_bean.getNumeroTelegram());
		session.setAttribute("usuario_id_telegram", usuario_bean.getIdTelegram());
		session.setAttribute("usuario_uuid", usuario_bean.getUuidUsuario());
		session.setAttribute("usuario_tipo", usuario_bean.getTipoUsuario());
	}
%>