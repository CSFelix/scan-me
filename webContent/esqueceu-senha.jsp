<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
    
<%@page import="Seguranca.StripHTML" %>
    
<!DOCTYPE html>

<html lang="pt-br, en">
	
	<jsp:include page="includes/head-login.html" />

	<body>
	
		<jsp:include page="includes/nav.html" />
		<jsp:include page="includes/modal-esqueceu-senha.html" />

		<section id="mainContent">
		
				<!-- blobs -->
				<div id="left-bottom-corner" class="blob"></div>
				<div id="right-top-corner" class="blob"></div>
		
				<!--  toast messages -->
				<div id="toast" class="toastMessageErro"></div>
			
				<section class="formLogin neon">
					<div class="formLoginHeader"><h3>Login</h3></div>
					<br><br>

					<div class="formLoginContent">
					
						<!-- email -->
						<div class="campoDivForm flexCenter">
							<label id="labelLogin" class="campoLabel">{{ labelLoginAtiva }}</label>
							<p>👤</p>&nbsp&nbsp<input type="email" name="email" id="inputEmail" class="campoInput" pattern="<%=StripHTML.REGEX_EMAIL %>" onkeyup="checkLabel('labelLogin', this)" onkeydown="checkLabel('labelLogin', this)" onkeypress="ApertarEnterCliqueBotao(event, botaoEnviarEmail)" autofocus required>
						</div>
						<br><br>
					</div>
					
					<!-- botão ded confirmação do email -->
					<div class="formLoginFooter flexSpace">
						<a href="index.jsp" id="esqueceuSenha" class="esqueceuSenha" data-anijs="if: mouseover, do: swing animated">{{ voltarLoginAtiva }}</a>
						<button id="botaoEnviarEmail" class="botao" data-anijs="if: mouseover, do: rubberBand animated">{{ botaoEnviarEmailAtiva }}</button>
					</div>
					<br><br>
				</section>
		</section>
		
		<jsp:include page="includes/footer.html" />
	</body>
	
	<jsp:include page="includes/vue-login.html" />
	<!-- vue não padrão nas demais páginas -->
	<script type="text/javascript" src="assets/js/vue/languages/esqueceu-senha.js"></script>
	<script type="text/javascript" src="assets/js/vue/languages/modal-esqueceu-senha.js"></script>
	<!-- <script type="text/javascript" src="assets/js/controllers/mensagens-modals/mensagem-modal-solicitacao-esqueceu-senha.js"></script> -->
	
	<jsp:include page="includes/script-login.html" />
	<!-- scripts não padrões nas demais páginas -->
	<script type="text/javascript" src="assets/js/controllers/modals/modal-esqueceu-senha.js"></script>
	<script type="text/javascript" src="assets/js/ajax/ajax-esqueceu-senha.js"></script>
	<script type="text/javascript" src="assets/js/controllers/labels-inputs/label-ativa-esqueceu-senha.js"></script>

</html>