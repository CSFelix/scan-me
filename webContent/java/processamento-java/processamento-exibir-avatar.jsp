<%@page import="java.sql.*" %>
<%@page import="java.io.*"%>
<%@page import="Dao.UsuarioDao" %>
<%
	// Exibi��o da foto de perfil do usu�rio
	UsuarioDao usuario_dao = new UsuarioDao();
	byte[] avatar = usuario_dao.SelecionarAvatar(request.getParameter("uuid_usuario"));
	
	OutputStream avatar_output = response.getOutputStream();	
	avatar_output.write(avatar);
	avatar_output.flush();
	avatar_output.close();
%>