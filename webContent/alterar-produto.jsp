<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>

<!DOCTYPE html>
	
	<!-- checagem se as sessions para login estão definidas
	caso não estiverem, usuário será redirecionado ao login -->
	<jsp:include page="java/checagem-sessions-java/checagem-sessions-painel.jsp"/>
	
	<!-- checagem se usuário é comprador, caso for, é redirecionado
	à página do painel -->
	<jsp:include page="java/checagem-sessions-java/checagem-sessions-painel-usuario-comprador.jsp"/>
	
	<script>
		sessionStorage.setItem("usuario_nickname", "<%=(String) session.getAttribute("usuario_nickname") %>");
		sessionStorage.setItem("usuario_email", "<%=(String) session.getAttribute("usuario_email") %>");
		sessionStorage.setItem("usuario_whatsapp", "<%=(String) session.getAttribute("usuario_whatsapp") %>");
		sessionStorage.setItem("usuario_telegram", "<%=(String) session.getAttribute("usuario_telegram") %>");
		sessionStorage.setItem("usuario_uuid", "<%=(String) session.getAttribute("usuario_uuid")%>");
		sessionStorage.setItem("usuario_tipo", "<%=(String) session.getAttribute("usuario_tipo")%>");
		
		<%
			try { session.removeAttribute("cadastro_efetuado"); }
			catch (Exception e) {}
		%>
	</script>
	
<html lang="pt-br, en">
	
	<jsp:include page="includes/head-produto.html" />

	<body>
	
		<jsp:include page="includes/nav.html" />

		<section id="mainContent">
		
			<!-- blobs -->
			<div id="left-top-corner" class="blob"></div>
			<div id="right-bottom-corner" class="blob"></div>
		
			<!--  toast messages -->
			<div id="toast" class="toastMessageErro"></div>
			
			<!--  menu vertical -->
			<jsp:include page="includes/menu-vertical-produto.html" />
		
			<!-- section cadastro produto -->
			<jsp:include page="includes/sections-painel/painel-alterar-produto.jsp" />
		</section>
	</body>
	
	<!-- scripts -->
	<jsp:include page="includes/vue-alterar-produto.html" />
	<jsp:include page="includes/script-alterar-produto.html" />
</html>

<!-- processamento e configuração do tipo principal e outros tipos do produto -->
<jsp:include page="java/processamento-java/processamento-alterar-produto-tipos.jsp" />