<%
	// usuário já efetuou cadastro e deve selecionar foto de perfil
	if (session.getAttribute("cadastro_efetuado") != null) {
%>
		<script>window.location.href = "cadastro-final.jsp";</script>
<%
	}
%>