<%
	// usu�rio n�o efetuou cadastro
	if (   session.getAttribute("usuario_nickname") == null
		|| session.getAttribute("usuario_email") == null
		|| session.getAttribute("usuario_whatsapp") == null
		|| session.getAttribute("usuario_telegram") == null
		|| session.getAttribute("usuario_uuid") == null) {
%>
		<script>window.location.href = "cadastro-inicial.jsp";</script>
<%
	}

	// usu�rio efetuou cadastro
	// logo, n�o poder� voltar � p�gina de cadastro-inicial
	else { session.setAttribute("cadastro_efetuado", true); }
%>