<%@page import="Bean.UsuarioBean" %>
<%@page import="Dao.UsuarioDao" %>
<%@page import="Seguranca.StripHTML" %>

<%
	UsuarioBean usuario_bean = new UsuarioBean();
	usuario_bean.setNickname(StripHTML.StripString(request.getParameter("nickname")));
	usuario_bean.setEmail(StripHTML.StripString(request.getParameter("email")));
	usuario_bean.setNumeroWhatsapp(StripHTML.StripString(request.getParameter("whatsapp")));
	usuario_bean.setNumeroTelegram(StripHTML.StripString(request.getParameter("telegram")));
	usuario_bean.setIdTelegram(StripHTML.StripString(request.getParameter("idTelegram")));
	usuario_bean.setUuidUsuario((String) session.getAttribute("usuario_uuid"));
	usuario_bean.setTipoUsuario(StripHTML.StripString(request.getParameter("tipoUsuario")));
	
	UsuarioDao usuario_dao = new UsuarioDao();
	
	// dados alterados
	if (usuario_dao.AlterarDados(usuario_bean)) {
		session.setAttribute("usuario_nickname", usuario_bean.getNickname());
		session.setAttribute("usuario_email", usuario_bean.getEmail());
		session.setAttribute("usuario_whatsapp", usuario_bean.getNumeroWhatsapp());
		session.setAttribute("usuario_telegram", usuario_bean.getNumeroTelegram());
		session.setAttribute("usuario_id_telegram", usuario_bean.getIdTelegram());
		session.setAttribute("usuario_uuid", usuario_bean.getUuidUsuario());
		session.setAttribute("usuario_tipo", usuario_bean.getTipoUsuario());
	}
	
	// email já registrado >> usuário deve escolehr um email diferente ou manter o atual
	else {
%>
		0
<%
	}
%>