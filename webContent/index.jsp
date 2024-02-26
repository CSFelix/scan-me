<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
    
<%@page import="Seguranca.StripHTML" %>
    
<!DOCTYPE html>

<html lang="pt-br, en">

	<jsp:include page="includes/head-login.html" />

	<body>
		
		<jsp:include page="includes/nav.html" />

		<section id="mainContent">
		
				<!-- blobs -->
				<div id="left-bottom-corner" class="blob"></div>
				<div id="right-top-corner" class="blob"></div>
		
				<!--  toast messages -->
				<div id="toast" class="toastMessageErro"></div>
		
				<section class="formLogin neon">
					
					<!-- título -->
					<div class="formLoginHeader"><h3>{{ tituloLoginAtiva }}</h3></div>
					<br><br>

					<div class="formLoginContent">
					
						<!-- email -->
						<div class="campoDivForm flexCenter">
							<label id="labelLogin" class="campoLabel">{{ labelLoginAtiva }}</label>
							<p>👤</p>&nbsp&nbsp<input type="email" name="email" id="inputEmail" class="campoInput" pattern="<%=StripHTML.REGEX_EMAIL %>" onkeyup="checkLabel('labelLogin', this)" onkeydown="checkLabel('labelLogin', this)" onkeypress="ApertarEnterFocus(event, inputSenha)" autofocus required>
						</div>
						<br><br>
				
						<!-- senha -->
						<div class="campoDivForm flexCenter">
							<label id="labelSenha" class="campoLabel">{{ labelSenhaAtiva }}</label>
							<p>🔒</p>&nbsp&nbsp<input type="password" name="senha" id="inputSenha" class="campoInput" pattern="<%=StripHTML.REGEX_SENHA %>" onkeyup="checkLabel('labelSenha', this)" onkeydown="checkLabel('labelSenha', this)" onkeypress="ApertarEnterCliqueBotao(event, botaoLogin)"  required>

							<!-- 
								Visualizar senha em texto:
								<i class="fas fa-eye"></i> >> ativar visualização
								<i class="far fa-eye-slash"></i> >> desativar visualização
							-->
							&nbsp&nbsp<i class="fas fa-eye visualizarSenha"></i>
						</div>
						<br><br>
					</div>

					<!-- botões de redirecionamento à página de cadastro e confirmação de login -->
					<div class="formLoginFooter flexSpace">
						<a href="cadastro-inicial.jsp"><button class="botaoSecundario" data-anijs="if: mouseover, do: rubberBand animated">{{ botaoCadastrarAtiva }}</button></a>
						<button id="botaoLogin" class="botao" data-anijs="if: mouseover, do: rubberBand animated">{{ botaoLoginAtiva }}</button>
					</div>
					<br><br>

					<!-- opção de redirecionamento à página de "esqueceu-senha" -->
					<div class="formLoginFooter flexSpace">
						<a href="esqueceu-senha.jsp" id="esqueceuSenha" class="esqueceuSenha" data-anijs="if: mouseover, do: swing animated">{{ esqueceuSenhaAtiva }}</a>
					</div>
					<br>

				</section>
		</section>
		
		<jsp:include page="includes/footer.html" />
	</body>

	<jsp:include page="includes/vue-login.html" />
	<!-- vue não padrão nas demais páginas -->
	<script type="text/javascript" src="assets/js/vue/languages/login.js"></script>
	<!-- <script type="text/javascript" src="assets/js/controllers/mensagens-modals/mensagem-modal-login.js"></script> -->
	
	<jsp:include page="includes/script-login.html" />
	<!-- scripts não padrões nas demais páginas -->
	<script type="text/javascript" src="assets/js/ajax/ajax-login.js"></script>
	<script type="text/javascript" src="assets/js/effects/visualizar-senha-login.js"></script>
	<script type="text/javascript" src="assets/js/controllers/labels-inputs/label-ativa-login.js"></script>
</html>