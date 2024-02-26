<%@page import="Bean.UsuarioBean" %>
<%@page import="Dao.UsuarioDao" %>
<%@page import="Seguranca.StripHTML" %>

<%@page import="javax.servlet.http.Part" %>
<%@page import="java.io.InputStream" %>

<%
	UsuarioBean usuario_bean = new UsuarioBean();
	usuario_bean.setNickname(StripHTML.StripString(request.getParameter("nickname")));
	usuario_bean.setEmail(StripHTML.StripString(request.getParameter("email")));
	usuario_bean.setSenha(StripHTML.StripString(request.getParameter("senha")));
	usuario_bean.setNumeroWhatsapp(StripHTML.StripString(request.getParameter("whatsapp")));
	usuario_bean.setNumeroTelegram(StripHTML.StripString(request.getParameter("telegram")));
	usuario_bean.setIdTelegram(StripHTML.StripString(request.getParameter("idTelegram")));
	usuario_bean.setTipoUsuario(StripHTML.StripString(request.getParameter("tipoUsuario")));
	
	UsuarioDao usuario_dao = new UsuarioDao();
	
	// Cadastro Efetuado com Sucesso
	// Informações do usuário são salvas na session para usar
	// na seção pós-login
	if (usuario_dao.Cadastrar(usuario_bean)) {
		session.setAttribute("usuario_nickname", usuario_bean.getNickname());
		session.setAttribute("usuario_email", usuario_bean.getEmail());
		session.setAttribute("usuario_whatsapp", usuario_bean.getNumeroWhatsapp());
		session.setAttribute("usuario_telegram", usuario_bean.getNumeroTelegram());
		session.setAttribute("usuario_id_telegram", usuario_bean.getIdTelegram());
		session.setAttribute("usuario_uuid", usuario_dao.SelecionarUuidPorEmail(usuario_bean.getEmail()));
		session.setAttribute("usuario_tipo", usuario_bean.getTipoUsuario());
	}
	
	// Falha no Cadastro -- Email já cadastrado
	else {
%>
		0
<%
	}
%>