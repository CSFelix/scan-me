<%
	// usuário não efetuou cadastro
	if (   session.getAttribute("usuario_nickname") == null
		|| session.getAttribute("usuario_email") == null
		|| session.getAttribute("usuario_whatsapp") == null
		|| session.getAttribute("usuario_telegram") == null
		|| session.getAttribute("usuario_uuid") == null) {
%>
		<script>window.location.href = "cadastro-inicial.jsp";</script>
<%
	}

	// usuário efetuou cadastro
	// logo, não poderá voltar à página de cadastro-inicial
	else { session.setAttribute("cadastro_efetuado", true); }
%>