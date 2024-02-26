<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
    
<%@page import= "java.util.Map"%>
<%@page import= "java.util.HashMap"%>
<%@page import= "java.util.ArrayList"%>    

<%@page import="Bean.ProdutoBean"%>
<%@page import="Bean.UsuarioBean"%>
<%@page import="Dao.ProdutoDao"%>
<%@page import="Dao.UsuarioDao"%>


<%
	/* 
	* Busca das informações do produto a ser visualizado.
	*
	* Foi criada esta checagem fora da pasta "processamento-java"
	* porque as informações são buscadas via uuid do produto presente
	* na URL.
	*
	* Portanto, a fim de não haver o perigo do sistema tentar buscar
	* informações de uma UUID que não existe, é realizada tal verificação.
	*/

	// Coletando idioma selecionado na aplicação
	int idioma = Integer.parseInt(request.getParameter("idioma")); // 1 >> Português/BR, 2 >> English/USA
	
	// Coletando dados do produto e incrementando visualização em 1
	ProdutoDao produto_dao = new ProdutoDao();
	ProdutoBean produto_bean = produto_dao.SelecionarProdutoPorUuid(request.getParameter("uuid-produto"));
	produto_dao.IncrementarVisualizacoes(request.getParameter("uuid-produto"));
	produto_dao.CriarRelacionamentoVisualizacao((String) session.getAttribute("usuario_uuid"), request.getParameter("uuid-produto"));
	
	// Coletando dados das fotos do produto
	Map<Integer, ArrayList<Integer>> dados_fotos_produto = produto_dao.SelecionarContagemIndexFotosProdutoPorUuidProduto(request.getParameter("uuid-produto"));
	int index_foto_atual; // variável usada para contar index de exibição da foto na página
	boolean foto_armazenada = false; // fica 'true' quando há, pelo menos, uma foto do produto armazenada
	
	// Coletando dados do usuário vendedor
	UsuarioDao usuario_dao = new UsuarioDao();
	UsuarioBean vendedor_bean = usuario_dao.SelecionarUsuarioPorProdutoUuid(request.getParameter("uuid-produto"));
	
	// Produto e Vendedor Encontrados
	if (produto_bean != null && vendedor_bean != null) {
		
		/* Exibição dos dados do produto */
		
			
		// Transformação das informações
		String moeda = (produto_bean.getMoeda() == "1") ? "R$" : "U$";
			
		// Tipos do produto transformado em String
		// cada tipo é consistido num código que possui uma string equivalente
		String tipo_principal_transformado = produto_dao.TransformarTipoPrincipalProduto(produto_bean.getTipoPrincipal()
																						 , idioma);
		String[] outros_tipos_transformados = produto_dao.TransformarOutrosTiposProduto(produto_bean.getOutrosTipos()
																						, produto_bean.getTipoPrincipal()
																						, idioma);
%>

		<!-- nome do produto -->
		<center><h2>📦 <%=produto_bean.getNome() %> 📦</h2></center>
		<br><br><br>
			
		<!-- image slider -->
		<div class="slideshowContainer flexCenter">
<%
			/* exibição dos slides conforme quantidade de fotos do produto*/
			
			for (int quantidade_fotos : dados_fotos_produto.keySet()) {
				
				// setamento do index da foto atual
				index_foto_atual = 0;
				
				// verificação de quais colunas têm foto do produto salva no banco de dados
				// foto_1, foto_2, [...], foto_6
				for (int index_foto : dados_fotos_produto.get(quantidade_fotos)) {

					// caso valor do identificador da coluna for igual a "0"
					// significa de que não há foto salva nele e não será
					// preciso exibir uma foto "nula" na página
					if (index_foto == 0) { 
						continue; 
					}
					
					// caso contrário, foto é exibida
					else {
						
						// incremento do index da foto atual
						index_foto_atual += 1;
%>

						<div class="mySlides fade">
		  					<div class="numbertext"><%=index_foto_atual %> / <%=quantidade_fotos %></div>
		  					<img class="containerImagens containerAbrirModalImagensProduto" 
		  						 src="java/processamento-java/processamento-exibir-produto.jsp?uuid-produto=<%=request.getParameter("uuid-produto")%>&index=<%=index_foto%>"
		  						 onclick="AbrirModalVisualizarProduto(this)">
						</div>

<%
					}
				}
				
				// caso nenhuma foto for encontrada, é exibida foto padrão
				if (index_foto_atual == 0) {
%>

					<div class="mySlides fade">
		  				<div class="numbertext"><%=index_foto_atual %> / <%=quantidade_fotos %></div>
		  				<img class="containerImagens containerAbrirModalImagensProduto" 
		  					 src="images/avatar/no_image_available.png"
		  					 onclick="AbrirModalVisualizarProduto(this)">
					</div>

<%					
				}
			}	
%>
		</div>
		
		<br>

		<!-- indicadores do slide -->
		<div style="text-align:center">
<%
			/* exibição dos indicadores do slide conforme quantidade de fotos do produto */
			
			for (int quantidade_fotos : dados_fotos_produto.keySet()) {
				
				// setamento do index da foto atual
				index_foto_atual = 0;
				
				// verificação de quais colunas têm foto do produto salva no banco de dados
				// foto_1, foto_2, [...], foto_6
				for (int index_foto : dados_fotos_produto.get(quantidade_fotos)) {
					
					// caso valor do identificador da coluna for igual a "0"
					// significa de que não há foto salva nele e não será
					// preciso exibir uma foto "nula" na página
					if (index_foto == 0) { continue; }
					
					// caso contrário, foto é exibida
					else {
						
						// setamento da flag de foto armazenada
						// indicando de que uma foto foi encontrada
						if (!foto_armazenada) { foto_armazenada = true; }
						
						// incremento do index da foto atual
						index_foto_atual += 1;
%>

						<span class="dot" onclick="currentSlide(<%=index_foto_atual %>)"></span>
			
<%
					}
				}
				
				// verificação se há, pelo menos, uma foto do produto armazenada
				// caso houver, é exibida mensagem de dica para clicar nos ícones
				// e alterar a foto a ser visualizada
				if (foto_armazenada) {
%>

					<br><br><br>
		
					<!-- 
						mensagem para clicar nos identificadores do slide para trocar de foto
						numa melhor situação, implementarei a transição via touch na tela e pelo mouse
						(swipe left n' swip right)
					 -->
					<div class="flexCenter">
						<span class="tipSpan">{{ spanIdentificadorSlideAtiva }}</span>
					</div> 

<%
				}
			}
%>
		</div>
		<br><br><br>
		
		<!-- botão visualizar QR Code -->
		<div class="flexCenterWrap">
			<button id="botaoQRCodeVisualizarProduto" class="botao" data-anijs="if: mouseover, do: rubberBand animated"
					data-uuid-produto="<%=request.getParameter("uuid-produto") %>" data-nome-produto="<%=produto_bean.getNome()%>"
					onClick="AbrirModalVisualizarProdutoQRCode(this)">
				{{ botaoQRCodeAtiva }}
			</button>
		</div>
		<br><br><br>
			
		<!-- estoque -->
		<div class="flexCenterWrap">
			<p class="estoqueValorProduto">{{ produtoEstoqueAtiva }} <%=produto_bean.getEstoque() %></p>
			&nbsp&nbsp&nbsp
			<p class="estoqueValorProduto">{{ produtoValorAtiva }} <%=moeda + " " + produto_bean.getPreco() %></p>
		</div>
		<br><br><br><br>
			
<%
		// exibição da ficha técnica do produto somente quando o mesmo
		// tiver descrição
		if (!(produto_bean.getDescricao().equals("") || produto_bean.getDescricao().isEmpty())) {
%>
			<!-- ficha técnica -->
			<div>
				<center><p class="subtopicoProduto">{{ produtoFichaTecnicaAtiva }}</p></center>
				<br>
				<center><p><%=produto_bean.getDescricao() %></p></center>
			</div>
			<br><br><br>
<%
		}
%>
			
		<!-- tipos -->
		<div>
			<center><p class="subtopicoProduto">{{ produtoTiposAtiva }}</p></center>
			<br>
			<div class="flexCenterWrap">
				<label class="tag tagAtivada"><%=tipo_principal_transformado %></label>
				
<%
				// varredura dos "outros tipos"
				// quando o "outros tipos" é nulo, significa de que o produto só tem o "tipo principal"
				// e, consequentemente, não é necessário forçar o sistema exibir os "outros tipos" na tela
				if (outros_tipos_transformados != null) {
					for (String outro_tipo : outros_tipos_transformados) {
%>

						&nbsp&nbsp&nbsp<label class="tag tagAtivada"><%=outro_tipo %></label>

<%
					}
				}
%>
			</div>
		</div>
		<br><br>
			
<%
		
%>
			
		<!-- exiibição dos dados do usuário -->
		<br>
		<hr class="horizontalLine">
		<br>
			
		<div>
				
			<center><h2>{{ vendedorTituloAtiva }}</h2></center>
			<br><br><br>
				
			<!-- foto vendedor -->	
			<div class="sectionPainelContent flexCenterColumn" data-anijs="if: load, on: window, do: rubberBand animated">
				<div id="containerLabel" class="containerAvatar flexCenter">
					<label id="avatarVisualizacao"  class="flexCenter containerAvatar"
						   style="background-image: url(java/processamento-java/processamento-exibir-avatar.jsp?uuid_usuario=<%=vendedor_bean.getUuidUsuario()%>);">	
					</label>
				</div>
			</div>
				
			<br>
				
				
			<!-- nome vendedor -->
			<div class="campoDivProduto flexCenter" data-anijs="if: load, on: window, do: swing animated">
				<p class="campoInputDescricao">{{ vendedorNomeAtiva }}</p>
				&nbsp&nbsp
				<p class="campoInput campoDesativado"><%=vendedor_bean.getNickname() %></p>
			</div>
			<br><br>
					
			<!-- email vendedor -->
			<div class="campoDivProduto flexCenter" data-anijs="if: load, on: window, do: swing animated">
				<p class="campoInputDescricao">{{ vendedorEmailAtiva }}</p>
				&nbsp&nbsp
				<p class="campoInput campoDesativado"><%=vendedor_bean.getEmail() %></p>
			</div>
			<br><br>

<%
			// exibição do número do whatsapp somente quando
			// o vendedor tiver tal cadastrado
			if (!(vendedor_bean.getNumeroWhatsapp().equals("") || vendedor_bean.getNumeroWhatsapp().isEmpty())) {
%>

				<!-- número whatsapp vendedor -->
				<div class="campoDivProduto flexCenter" data-anijs="if: load, on: window, do: swing animated">
					<p class="campoInputDescricao">{{ vendedorNumeroWhatsappAtiva }}</p>
					&nbsp&nbsp
					<p class="campoInput campoDesativado"><%=vendedor_bean.getNumeroWhatsapp() %></p>
				</div>
				<br><br>

<%
			}
				
			// exibição do número do telegram somente quando
			// o vendedor tiver tal cadastrado
			if (!(vendedor_bean.getNumeroTelegram().equals("") || vendedor_bean.getNumeroTelegram().isEmpty())) {
%>

				<!-- número telegram vendedor -->
				<div class="campoDivProduto flexCenter" data-anijs="if: load, on: window, do: swing animated">
					<p class="campoInputDescricao">{{ vendedorNumeroTelegramAtiva }}</p>
					&nbsp&nbsp
					<p class="campoInput campoDesativado"><%=vendedor_bean.getNumeroTelegram() %></p>
				</div>
				<br><br>

<%
			}
%>
		</div>
<%
	}
	
	// Produto e Vendedor não Encontrados
	else {
		
		// Idioma: Português - Brasil
		if (idioma == 1) {
%>
			<br><br>
			<center><h3>😥 Produto não Encontrado 😥</h3></center>
			<br><br>
<%
		}
		
		// Idioma: Inglês - USA
		else {
%>
			<br><br>
			<center><h3>😥 Product not Found 😥</h3></center>
			<br><br>
<%
		}
	}
%>