<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>

<%@page import="Seguranca.StripHTML" %>

<% 
	// captura dos parâmetros
	session.setAttribute("hash_usuario", request.getParameter("hash_usuario"));
	session.setAttribute("hash_alteracao_senha", request.getParameter("hash_alteracao_senha"));
%>

<!DOCTYPE html>

<html lang="pt-br, en">
	
	<jsp:include page="includes/head-login.html" />

	<body>
		
		<jsp:include page="includes/nav.html" />
		<jsp:include page="includes/modal-alteracao-senha.html" />

		<section id="mainContent">
		
				<!-- blobs -->
				<div id="left-bottom-corner" class="blob"></div>
				<div id="right-top-corner" class="blob"></div>
		
				<!--  toast messages -->
				<div id="toast" class="toastMessageErro"></div>
		
				<section class="formLogin neon">
					<div class="formLoginHeader"><h3>{{ tituloAlterarSenhaAtiva }}</h3></div>
					<br><br>

					<div class="formLoginContent">
					
						<!-- senha -->
						<div class="campoDivForm flexCenter">
							<label id="labelSenha" class="campoLabel">{{ labelSenhaAtiva }}</label>
							<p>🔒</p>&nbsp&nbsp<input type="password" name="senha" id="inputSenha" class="campoInput" pattern="<%=StripHTML.REGEX_SENHA %>" onkeyup="checkLabel('labelSenha', this)" onkeydown="checkLabel('labelSenha', this)" onkeypress="ApertarEnterFocus(event, inputConfirmarSenha)" autofocus required>

							<!-- 
								Visualizar senha em texto:
								<i class="fas fa-eye"></i> >> ativar visualização
								<i class="far fa-eye-slash"></i> >> desativar visualização
							-->
							&nbsp&nbsp<i class="fas fa-eye visualizarSenha"></i>
						</div>
						<br><br>

						<!-- confirmação senha -->
						<div class="campoDivForm flexCenter">
							<label id="labelConfirmarSenha" class="campoLabel">{{ labelConfirmarSenhaAtiva }}</label>
							<p>🔒</p>&nbsp&nbsp<input type="password" name="confirmarSenha" id="inputConfirmarSenha" class="campoInput" pattern="<%=StripHTML.REGEX_SENHA %>"  onkeyup="checkLabel('labelConfirmarSenha', this)" onkeydown="checkLabel('labelConfirmarSenha', this)" onkeypress="ApertarEnterFocus(event, inputCodigo)" autofocus required>
						</div>
						
						<br>
						<hr>
						<br>

						<!-- código -->
						<div class="campoDivForm flexCenter">
							<label id="labelCodigo" class="campoLabel">{{ labelCodigoVerificacaoAtiva }}</label>
							<p>💳</p>&nbsp&nbsp<input type="text" name="codigo" id="inputCodigo" class="campoInput" pattern="<%=StripHTML.REGEX_CODIGO_ALTERACAO_SENHA %>" onkeyup="checkLabel('labelCodigo', this)" onkeydown="checkLabel('labelCodigo', this)" onkeypress="ApertarEnterCliqueBotao(event, botaoAlterarSenha)" autofocus required>
						</div>
						<br><br>
					</div>

					<!--  botão para gerar novo código ou confirmar alteração de senha -->
					<div class="formLoginFooter flexSpace">
						<button id="botaoNovoCodigo" class="botaoSecundario" data-anijs="if: mouseover, do: rubberBand animated">{{ botaoNovoCodigoAtiva }}</button>
						<button id="botaoAlterarSenha" class="botao" data-anijs="if: mouseover, do: rubberBand animated">{{ botaoAlterarSenhaAtiva }}</button>
					</div>
					<br><br>	

					<div class="formLoginFooter flexSpace">
						<a href="index.jsp" id="esqueceuSenha" class="esqueceuSenha" data-anijs="if: mouseover, do: swing animated">{{ mensagemVoltarLoginAtiva }}</a>
					</div>
					<br>
				</section>
		</section>
		
		<jsp:include page="includes/footer.html" />
	</body>

	<jsp:include page="includes/vue-login.html" />
	<!-- vue não padrão nas demais páginas -->
	<script type="text/javascript" src="assets/js/vue/languages/alteracao-senha.js"></script>
	<script type="text/javascript" src="assets/js/vue/languages/modal-alteracao-senha.js"></script>
	
	<jsp:include page="includes/script-login.html" />
	<!-- scripts não padrões nas demais páginas -->
	<script type="text/javascript" src="assets/js/controllers/modals/modal-alteracao-senha.js"></script>
	<script type="text/javascript" src="assets/js/ajax/ajax-alteracao-senha.js"></script>
	<script type="text/javascript" src="assets/js/effects/visualizar-senha-alteracao-senha.js"></script>
	<script type="text/javascript" src="assets/js/controllers/labels-inputs/label-ativa-alteracao-senha.js"></script>

</html>