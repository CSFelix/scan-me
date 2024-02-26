<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
    
<%@page import="java.util.ArrayList"%>   
<%@page import="java.util.Arrays" %>
<%@page import="java.util.List" %> 
<%@page import="java.util.Map"%>  

<%@page import="Bean.ProdutoBean"%>
<%@page import="Dao.ProdutoDao"%>
<%@page import="Seguranca.StripHTML"%>

<%
	/* 
	* Busca das informações do produto a ser alterado pelo usuário
	*
	* Foi criada esta checagem fora da pasta "processamento-java"
	* porque as informações são buscadas via uuid do produto presente
	* na URL.
	*
	* Portanto, a fim de não haver o perigo do sistema tentar buscar
	* informações de uma UUID que não existe, é realizada tal verificação.
	*/

	// Idioma Atual da Página
	String idioma = request.getParameter("idioma");
	
	// Armazenamento da UUID do produto na sessão ajva
	session.setAttribute("uuid_produto_alteracao", request.getParameter("uuid-produto"));

	// Produto Selecionado para Alteração
	String uuid_produto = request.getParameter("uuid-produto");
	ProdutoDao produto_dao = new ProdutoDao();
	ProdutoBean produto_bean = produto_dao.SelecionarProdutoPorUuidParaAlteracao(uuid_produto,
			 																	 (String) session.getAttribute("usuario_uuid"));

	// Coletando dados das fotos do produto
	Map<Integer, ArrayList<Integer>> dados_fotos_produto = produto_dao.SelecionarContagemIndexFotosProdutoPorUuidProduto(uuid_produto);
	
	// Outros Tipos do Produto convertido para Lista.
	// tal conversão é necessária a fim de facilitar a busca
	// por tipos selecionados
	List<String> lista_outros_tipos_produtos;
	
	try { lista_outros_tipos_produtos = Arrays.asList(produto_bean.getOutrosTipos()); }
	catch (Exception e) { lista_outros_tipos_produtos = null; }
	
	
	// Produto Encontrado
	if (produto_bean != null) {
		
		// Armazenamento do Tipo Principal e Quantidade dos Tipos Secundários na Session
		// Isto é necessário pois o Vue não aceita tags "<scripts></script>" que não
		// sejam do tipo "text/templates" dentro de templates já definidas.
		// *
		// Com isto, as sessions são definidas aqui neste documento e usadas para processamento
		// no documento "alterar-produto.jsp" na raiz principal do projeto.
		session.setAttribute("tipo_selecionado_tag", produto_bean.getTipoPrincipal());
		session.setAttribute("quantidade_outros_tipos", produto_bean.getOutrosTipos().length);
		
		// Exibição dos dados do Produto
%>
		<form id="formAlteracaoProduto" class="sectionPainelContent" method="POST" enctype='multipart/form-data'>
		
			<!-- fotos -->
			<div class="flexSpaceWrap">
		
				<!-- inputs das fotos -->
				<input class="selecionarFotoProduto" id="fotoProduto1" name="fotoProduto1" type="file" accept="image/*" required>
				<input class="selecionarFotoProduto" id="fotoProduto2" name="fotoProduto2" type="file" accept="image/*" required>
				<input class="selecionarFotoProduto" id="fotoProduto3" name="fotoProduto3" type="file" accept="image/*" required>
				<input class="selecionarFotoProduto" id="fotoProduto4" name="fotoProduto4" type="file" accept="image/*" required>
				<input class="selecionarFotoProduto" id="fotoProduto5" name="fotoProduto5" type="file" accept="image/*" required>
				<input class="selecionarFotoProduto" id="fotoProduto6" name="fotoProduto6" type="file" accept="image/*" required>
				
				<!-- campos de fotos -->
				<%
					// checagem se determinada foto de determinado campo está salva no banco de dados.
					// caso esteja (1,2, 3, 4, 5, 6), então a mesma é exibida ao usuário
					// caso contrário (0), campo é exibido em branco
					for (int quantidade_fotos : dados_fotos_produto.keySet()) {
						
						// Campo Foto 1
						if (dados_fotos_produto.get(quantidade_fotos).get(0) == 1) { %>
							<div class="flexCenterColumn">
								<label id="fotoProdutoVisualizacao1"  for="fotoProduto1" class="flexCenter containerFotoProduto fotoProdutoVisualizacao"
									   style="background-image: url(java/processamento-java/processamento-exibir-produto.jsp?uuid-produto=<%=uuid_produto%>&index=1)"></label>
								<div id="botaoFotoProduto1" class="botao" data-anijs="if: mouseover, do: rubberBand animated">
									<i id="iconeFoto1" class="fas fa-trash-alt"></i>
								</div>
								<br>
							</div>
							&nbsp&nbsp&nbsp
							
						<% } else { %>
							<div class="flexCenterColumn">
								<label id="fotoProdutoVisualizacao1"  for="fotoProduto1" class="flexCenter containerFotoProduto fotoProdutoVisualizacao"></label>
								<div id="botaoFotoProduto1" class="botao" data-anijs="if: mouseover, do: rubberBand animated">
									<i id="iconeFoto1" class="fas fa-plus"></i>
								</div>
								<br>
							</div>
							&nbsp&nbsp&nbsp		
						<%
						}
						
						// Campo Foto 2
						if (dados_fotos_produto.get(quantidade_fotos).get(1) == 2) {%>
							<div class="flexCenterColumn">
								<label id="fotoProdutoVisualizacao2"  for="fotoProduto2" class="flexCenter containerFotoProduto fotoProdutoVisualizacao"
									   style="background-image: url(java/processamento-java/processamento-exibir-produto.jsp?uuid-produto=<%=uuid_produto%>&index=2)"></label>
								<div id="botaoFotoProduto2" class="botao" data-anijs="if: mouseover, do: rubberBand animated">
									<i id="iconeFoto2" class="fas fa-trash-alt"></i>
								</div>
								<br>
							</div>
							&nbsp&nbsp&nbsp
							
						<% } else { %>
							<div class="flexCenterColumn">
								<label id="fotoProdutoVisualizacao2"  for="fotoProduto2" class="flexCenter containerFotoProduto fotoProdutoVisualizacao"></label>
								<div id="botaoFotoProduto2" class="botao" data-anijs="if: mouseover, do: rubberBand animated">
									<i id="iconeFoto2" class="fas fa-plus"></i>
								</div>
								<br>
							</div>
							&nbsp&nbsp&nbsp		
						<%
						}
						
						// Campo Foto 3
						if (dados_fotos_produto.get(quantidade_fotos).get(2) == 3) {%>
							<div class="flexCenterColumn">
								<label id="fotoProdutoVisualizacao3"  for="fotoProduto3" class="flexCenter containerFotoProduto fotoProdutoVisualizacao"
									   style="background-image: url(java/processamento-java/processamento-exibir-produto.jsp?uuid-produto=<%=uuid_produto%>&index=3)"></label>
								<div id="botaoFotoProduto3" class="botao" data-anijs="if: mouseover, do: rubberBand animated">
									 <i id="iconeFoto3" class="fas fa-trash-alt"></i>
								</div>
								<br>
							</div>
							&nbsp&nbsp&nbsp
							
						<% } else { %>
							<div class="flexCenterColumn">
								<label id="fotoProdutoVisualizacao3"  for="fotoProduto3" class="flexCenter containerFotoProduto fotoProdutoVisualizacao"></label>
								<div id="botaoFotoProduto3" class="botao" data-anijs="if: mouseover, do: rubberBand animated">
									<i id="iconeFoto3" class="fas fa-plus"></i>
								</div>
								<br>
							</div>
							&nbsp&nbsp&nbsp		
						<%
						}
						
						// Campo Foto 4
						if (dados_fotos_produto.get(quantidade_fotos).get(3) == 4) {%>
							<div class="flexCenterColumn">
								<label id="fotoProdutoVisualizacao4"  for="fotoProduto4" class="flexCenter containerFotoProduto fotoProdutoVisualizacao"
									   style="background-image: url(java/processamento-java/processamento-exibir-produto.jsp?uuid-produto=<%=uuid_produto%>&index=4)"></label>
								<div id="botaoFotoProduto4" class="botao" data-anijs="if: mouseover, do: rubberBand animated">
									<i id="iconeFoto4" class="fas fa-trash-alt"></i>
								</div>
								<br>
							</div>
							&nbsp&nbsp&nbsp
							
						<% } else { %>
							<div class="flexCenterColumn">
								<label id="fotoProdutoVisualizacao4"  for="fotoProduto4" class="flexCenter containerFotoProduto fotoProdutoVisualizacao"></label>
								<div id="botaoFotoProduto4" class="botao" data-anijs="if: mouseover, do: rubberBand animated">
									<i id="iconeFoto4" class="fas fa-plus"></i>
								</div>
								<br>
							</div>
							&nbsp&nbsp&nbsp		
						<%
						}
						
						// Campo Foto 5
						if (dados_fotos_produto.get(quantidade_fotos).get(4) == 5) {%>
							<div class="flexCenterColumn">
								<label id="fotoProdutoVisualizacao5"  for="fotoProduto5" class="flexCenter containerFotoProduto fotoProdutoVisualizacao"
									   style="background-image: url(java/processamento-java/processamento-exibir-produto.jsp?uuid-produto=<%=uuid_produto%>&index=5)"></label>
								<div id="botaoFotoProduto5" class="botao" data-anijs="if: mouseover, do: rubberBand animated">
									<i id="iconeFoto5" class="fas fa-trash-alt"></i>
								</div>
								<br>
							</div>
							&nbsp&nbsp&nbsp
							
						<% } else { %>
							<div class="flexCenterColumn">
								<label id="fotoProdutoVisualizacao5"  for="fotoProduto5" class="flexCenter containerFotoProduto fotoProdutoVisualizacao"></label>
								<div id="botaoFotoProduto5" class="botao" data-anijs="if: mouseover, do: rubberBand animated">
									<i id="iconeFoto5" class="fas fa-plus"></i>
								</div>
								<br>
							</div>
							&nbsp&nbsp&nbsp		
						<%
						}
						
						// Campo Foto 6
						if (dados_fotos_produto.get(quantidade_fotos).get(5) == 6) {%>
							<div class="flexCenterColumn">
								<label id="fotoProdutoVisualizacao6"  for="fotoProduto6" class="flexCenter containerFotoProduto fotoProdutoVisualizacao"
									   style="background-image: url(java/processamento-java/processamento-exibir-produto.jsp?uuid-produto=<%=uuid_produto%>&index=6)"></label>
								<div id="botaoFotoProduto6" class="botao" data-anijs="if: mouseover, do: rubberBand animated">
									<i id="iconeFoto6" class="fas fa-trash-alt"></i>
								</div>
								<br>
							</div>
							&nbsp&nbsp&nbsp
							
						<% } else { %>
							<div class="flexCenterColumn">
								<label id="fotoProdutoVisualizacao6"  for="fotoProduto6" class="flexCenter containerFotoProduto fotoProdutoVisualizacao"></label>
								<div id="botaoFotoProduto6" class="botao" data-anijs="if: mouseover, do: rubberBand animated">
									<i id="iconeFoto6" class="fas fa-plus"></i>
								</div>
								<br>
							</div>
							&nbsp&nbsp&nbsp		
						<%
						}
					}
				%>
			</div>
			
			<br>
		
			<!-- tip para alterar fotos do produto -->
			<div class="flexCenter">
				<span class="tipSpan">{{ spanFotosAtiva }}</span>
			</div>
			
			<br><br>	
			
			<!-- nome -->
			<div class="campoDivForm flexCenter">
				<label id="labelNomeProduto" class="campoLabel labelAtiva">{{ labelNomeProdutoAtiva }}</label>
				<p>📛</p>&nbsp&nbsp<input type="text" name="nomeProduto" id="inputNomeProduto" class="campoInput" pattern="<%=StripHTML.REGEX_NOME_PRODUTO %>"
										onkeyup="checkLabel('labelNomeProduto', this)" onkeydown="checkLabel('labelNomeProduto', this)" 
										value="<%=produto_bean.getNome()%>">
			</div>
			<br><br>
			
			<!-- valor -->
			<div class="campoDivForm flexCenter">
				<label id="labelValorProduto" class="campoLabel labelAtiva">{{ labelValorProdutoAtiva }}</label>
				<p>💰</p>&nbsp&nbsp<input type="number" name="valorProduto" id="inputValorProduto" class="campoInput outOfRangeInput" min="0" pattern="<%=StripHTML.REGEX_VALOR_ESTOQUE_PRODUTO %>"
										oninput="checkLabel('labelValorProduto', this)" onkeyup="checkLabel('labelValorProduto', this)" onkeydown="checkLabel('labelValorProduto', this)"
										value="<%=produto_bean.getPreco()%>">
			</div>
			<br><br>
			
			<!-- moeda -->
			<div class="campoDivForm flexCenter">
				<p>{{ labelMoedaProdutoAtiva }}</p>&nbsp&nbsp
				
				<select id="moedaSelecionada" name="moedaProduto" class="campoInput">
					<%
						// caso moeda informada no cadastro for Real (1)
						// tal opção virá marcada como padrão na alteração do produto
						if (produto_bean.getMoeda().equals("1")) {
					%>
							<option selected value="1">{{ selectMoedaRealAtiva }}</option>
							<option value="2">{{ selectMoedaDolarAtiva }}</option>
					<%
						}
						
						// caso contrário, o Dollar (2) virá como marcado
						else {
					%>
							<option value="1">{{ selectMoedaRealAtiva }}</option>
							<option selected value="2">{{ selectMoedaDolarAtiva }}</option>
					<%
						}
					%>
				</select>
			</div>
			<br><br>
			
			<!-- descrição -->
			<div class="campoDivForm flexCenter">
				<label id="labelDescricaoProduto" class="campoLabel labelAtiva">{{ labelDescricaoAtiva }}</label>
				<p>📝</p>&nbsp&nbsp
				<textarea name="descricaoProduto" id="inputDescricaoProduto" class="campoInput" rows="10" style="resize: none;"
				onkeyup="checkLabel('labelDescricaoProduto', this)" onkeydown="checkLabel('labelDescricaoProduto', this)"><%=produto_bean.getDescricao() %></textarea>
			</div>
			<br><br>
			
			<!-- estoque -->
			<div class="campoDivForm flexCenter">
				<label id="labelEstoqueProduto" class="campoLabel labelAtiva">{{ labelEstoqueAtiva }}</label>
				<p>🎁</p>&nbsp&nbsp<input type="number" name="estoqueProduto" id="inputEstoqueProduto" class="campoInput outOfRangeInput" min="0" pattern="<%=StripHTML.REGEX_VALOR_ESTOQUE_PRODUTO %>"
										oninput="checkLabel('labelEstoqueProduto', this)" onkeyup="checkLabel('labelEstoqueProduto', this)" onkeydown="checkLabel('labelEstoqueProduto', this)"
										value="<%=produto_bean.getEstoque()%>">
			</div>
			<br><br>
			
			<!-- status -->
			<div class="campoDivForm flexCenter">
				<p>{{ labelStatusAtiva }}</p>&nbsp&nbsp
				
				<select id="statusSelecionado" name="statusProduto" class="campoInput">
					<%
						// caso status do produto estiver como Pendente para ir à venda (1)
						// opção virá marcada como padrão
						if (produto_bean.getStatus().equals("1")) {
					%>
							<option selected value="1">{{ selectStatusPendenteAtiva }}</option>
							<option value="2">{{ selectStatusVendaAtiva }}</option>
							<option value="3">{{ selectStatusVendidoAtiva }}</option>
					<%
						}
						
						// status À Venda (2)
						else if (produto_bean.getStatus().equals("2")) {
					%>
							<option value="1">{{ selectStatusPendenteAtiva }}</option>
							<option selected value="2">{{ selectStatusVendaAtiva }}</option>
							<option value="3">{{ selectStatusVendidoAtiva }}</option>
					<%
						}
						
						// status Vendido
						else {
					%>
							<option value="1">{{ selectStatusPendenteAtiva }}</option>
							<option value="2">{{ selectStatusVendaAtiva }}</option>
							<option selected value="3">{{ selectStatusVendidoAtiva }}</option>
							
					<%
						}
					%>
				</select>
			</div>
			<br><br>
			
			<!-- tipo principal -->
			<div class="campoDivForm flexCenter">
				<p>{{ labelTipoPrincipalAtiva }}</p>&nbsp&nbsp
				
				<select id="tipoPrincipalSelecionado" name="tipoPrincipalProduto" class="campoInput">
					<optgroup :label="grupoAlimentosAtiva">
					
						<!-- 
							TIPO DOCES 
						-->
						<% if (produto_bean.getTipoPrincipal().equals("1")) { %>
					    		<option selected value="1">{{ tipoDocesAtiva }}</option>		
					    <% } else { %>
					    		<option value="1">{{ tipoDocesAtiva }}</option>
					    <% } %>
					    
					    <!-- 
					    	TIPO SALGADOS
					     -->
					    <% if (produto_bean.getTipoPrincipal().equals("2")) { %>
							<option selected value="2">{{ tipoSalgadosAtiva }}</option>
						<% } else { %>
							<option value="2">{{ tipoSalgadosAtiva }}</option>
						<% } %>
							
						<!-- 
							TIPO OUTROS ALIMENTOS
						 -->
						<% if (produto_bean.getTipoPrincipal().equals("3")) { %>
							<option selected value="3">{{ tipoOutrosAlimentosAtiva }}</option>
						<% } else { %>
							<option value="3">{{ tipoOutrosAlimentosAtiva }}</option>
						<% } %>
					</optgroup>
					
					<optgroup :label="grupoEletronicosAtiva">
						
						<!-- 
							TIPO CELULARES
						 -->
						<% if (produto_bean.getTipoPrincipal().equals("4")) { %>
							<option selected value="4">{{ tipoCelularesAtiva }}</option>
						<% } else { %>
							<option value="4">{{ tipoCelularesAtiva }}</option>
						<% } %>
						
						<!-- 
							TIPO INFORMÁTICA
						 -->
						<% if (produto_bean.getTipoPrincipal().equals("5")) { %>
							<option selected value="5">{{ tipoInformaticaAtiva }}</option>
						<% } else { %>
							<option value="5">{{ tipoInformaticaAtiva }}</option>
						<% } %>
						
						<!-- 
							TIPO GAMES
						 -->
						<% if (produto_bean.getTipoPrincipal().equals("6")) { %>
							<option selected value="6">{{ tipoGamesAtiva }}</option>
						<% } else { %>
							<option value="6">{{ tipoGamesAtiva }}</option>
						<% } %>
					</optgroup>
					
					<optgroup :label="grupoLazerAtiva">
						
						<!-- 
							TIPO LIVROS
						 -->
						<% if (produto_bean.getTipoPrincipal().equals("7")) { %>
							<option selected value="7">{{ tipoLivrosAtiva }}</option>
						<% } else { %>
							<option value="7">{{ tipoLivrosAtiva }}</option>
						<% } %>
						
						
						<!-- 
							TIPO MANGAS
						 -->
						<% if (produto_bean.getTipoPrincipal().equals("8")) { %>
							<option selected value="8">{{ tipoMangasAtiva }}</option>
						<% } else { %>
							<option value="8">{{ tipoMangasAtiva }}</option>
						<% } %>
						
						<!-- 
							TIPO BRINQUEDOS
						 -->
						<% if (produto_bean.getTipoPrincipal().equals("9")) { %>
							<option selected value="9">{{ tipoBrinquedosAtiva }}</option>
						<% } else { %>
							<option value="9">{{ tipoBrinquedosAtiva }}</option>
						<% } %>
					</optgroup>
					
					<optgroup :label="grupoModaAtiva">
					
						<!-- 
							TIPO DECORAÇÃO
						 -->
						<% if (produto_bean.getTipoPrincipal().equals("10")) { %>
							<option selected value="10">{{ tipoDecoracaoAtiva }}</option>
						<% } else { %>
							<option value="10">{{ tipoDecoracaoAtiva }}</option>
						<% } %>
						
						 <!-- 
						 	TIPO ROUPAS
						  -->
						<% if (produto_bean.getTipoPrincipal().equals("11")) { %>
							<option selected value="11">{{ tipoRoupasAtiva }}</option>
						<% } else { %>
							<option value="11">{{ tipoRoupasAtiva }}</option>
						<% } %>
						
						 <!-- 
						 	TIPO PERFUMARIA
						  -->
						<% if (produto_bean.getTipoPrincipal().equals("12")) { %>
							<option selected value="12">{{ tipoPerfumariaAtiva }}</option>
						<% } else { %>
							<option value="12">{{ tipoPerfumariaAtiva }}</option>
						<% } %>
					</optgroup>
					
					<optgroup :label="grupoAmbienteAtiva">
					
						<!-- 
							TIPO ELETRODOMÉSTICOS
						 -->
						<% if (produto_bean.getTipoPrincipal().equals("13")) { %>
							<option selected value="13">{{ tipoEletrodomesticosAtiva }}</option>
						<% } else { %>
							<option value="13">{{ tipoEletrodomesticosAtiva }}</option>
						<% } %>
						
						<!-- 
							TIPO MÓVEIS
						 -->
						<% if (produto_bean.getTipoPrincipal().equals("14")) { %>
							<option selected value="14">{{ tipoMoveisAtiva }}</option>
						<% } else { %>
							<option value="14">{{ tipoMoveisAtiva }}</option>
						<% } %>
						
						<!-- 
							TIPO EMPRESARIAIS
						 -->
						<% if (produto_bean.getTipoPrincipal().equals("15")) { %>
							<option selected value="15">{{ tipoEmpresariaisAtiva }}</option>
						<% } else { %>
							<option value="15">{{ tipoEmpresariaisAtiva }}</option>
						<% } %>
					</optgroup>
					
					<optgroup :label="grupoAutomoveisAtiva">
						
						<!-- 
							TIPO CARROS
						 -->
						<% if (produto_bean.getTipoPrincipal().equals("16")) { %>
							<option selected value="16">{{ tipoCarrosAtiva }}</option>
						<% } else { %>
							<option value="16">{{ tipoCarrosAtiva }}</option>
						<% } %>
						
						<!-- 
							TIPO MOTOS
						 -->
						<% if (produto_bean.getTipoPrincipal().equals("17")) { %>
							<option selected value="17">{{ tipoMotosAtiva }}</option>
						<% } else { %>
							<option value="17">{{ tipoMotosAtiva }}</option>
						<% } %>
						
						<!-- 
							TIPO CAMINHÕES
						 -->
						<% if (produto_bean.getTipoPrincipal().equals("18")) { %>
							<option selected value="18">{{ tipoCaminhoesAtiva }}</option>
						<% } else { %>
							<option value="18">{{ tipoCaminhoesAtiva }}</option>
						<% } %>
						
						<!-- 
							TIPO CAMINHONETES
						 -->
						<% if (produto_bean.getTipoPrincipal().equals("19")) { %>
							<option selected value="19">{{ tipoCaminhonetesAtiva }}</option>
						<% } else { %>
							<option value="19">{{ tipoCaminhonetesAtiva }}</option>
						<% } %>
					</optgroup>
					
					<optgroup :label="grupoOutrosAtiva">
						
						<!-- 
							TIPO OUTROS
						 -->
						<% if (produto_bean.getTipoPrincipal().equals("20")) { %>
							<option selected value="20">{{ tipoOutrosAtiva }}</option>
						<% } else { %>
							<option value="20">{{ tipoOutrosAtiva }}</option>
						<% } %>
					</optgroup>
				</select>
			</div>
			<br><br>
			
			<!-- outros tipos -->
			<div class="campoDivForm flexCenter">
				<p>{{ labelOutrosTiposAtiva }}</p>
				&nbsp&nbsp
				<p>({{ contadorTagsAtivas }} / 5)</p>
				&nbsp&nbsp
			</div>
			<br><br>
			
			<!-- mensagem de limite de tags de proutos ultrapassado -->
			<div id="limiteTagsProduto" class="campoDivForm flexCenter">
				<p>{{ msgLimiteTagAtiva }}</p>
			</div>
			<br><br>
			
			<!-- tags -->
			<div class="flexCenterWrap">
			
				<!-- 
					** ALIMENTOS **
				-->
				
				<!-- 
					DOCECS
				 -->
				<% if (lista_outros_tipos_produtos.contains("1")) { %>
					<input class="checkBoxHidden" name="outrosTiposProduto" type="checkbox" id="checkboxTipoDoces" value="1" checked>
  					<label id="labelTipoDoces" onclick="checkTipoProduto(this, checkboxTipoDoces)" class="tag tagAtivada">{{ tipoDocesAtiva }}</label>&nbsp&nbsp&nbsp
				<% } else { %>
					<input class="checkBoxHidden" name="outrosTiposProduto" type="checkbox" id="checkboxTipoDoces" value="1">
  					<label id="labelTipoDoces" onclick="checkTipoProduto(this, checkboxTipoDoces)" class="tag">{{ tipoDocesAtiva }}</label>&nbsp&nbsp&nbsp
				<% } %>
				
				<!-- 
					SALGADOS
				 -->
  				
  				<% if (lista_outros_tipos_produtos.contains("2")) { %>
  					<input class="checkBoxHidden" name="outrosTiposProduto" type="checkbox" id="checkboxTipoSalgados" value="2" checked>
  					<label id="labelTipoSalgados" onclick="checkTipoProduto(this, checkboxTipoSalgados)" class="tag tagAtivada">{{ tipoSalgadosAtiva }}</label>&nbsp&nbsp&nbsp
  				<% } else { %>
  					<input class="checkBoxHidden" name="outrosTiposProduto" type="checkbox" id="checkboxTipoSalgados" value="2">
  					<label id="labelTipoSalgados" onclick="checkTipoProduto(this, checkboxTipoSalgados)" class="tag">{{ tipoSalgadosAtiva }}</label>&nbsp&nbsp&nbsp
  				<% } %>
  				
  				<!-- 
  					OUTROS ALIMENTOS
  				 -->
  				
  				<% if (lista_outros_tipos_produtos.contains("3")) { %>
  					<input class="checkBoxHidden" name="outrosTiposProduto" type="checkbox" id="checkboxTipoOutrosAlimentos" value="3" checked>
  					<label id="labelTipoOutrosAlimentos" onclick="checkTipoProduto(this, checkboxTipoOutrosAlimentos)" class="tag tagAtivada">{{ tipoOutrosAlimentosAtiva }}</label>&nbsp&nbsp&nbsp
  				<% } else { %>
  					<input class="checkBoxHidden" name="outrosTiposProduto" type="checkbox" id="checkboxTipoOutrosAlimentos" value="3">
  					<label id="labelTipoOutrosAlimentos" onclick="checkTipoProduto(this, checkboxTipoOutrosAlimentos)" class="tag">{{ tipoOutrosAlimentosAtiva }}</label>&nbsp&nbsp&nbsp
  				<% } %>
  				
  				<!-- 
  					** INFORMÁTICA **
  				 -->

  				<!-- 
  					CELULARES
  				 -->
				<% if (lista_outros_tipos_produtos.contains("4")) { %>
  					<input class="checkBoxHidden" name="outrosTiposProduto" type="checkbox" id="checkboxTipoCelulares" value="4" checked>
  					<label id="labelTipoCelulares" onclick="checkTipoProduto(this, checkboxTipoCelulares)" class="tag tagAtivada">{{ tipoCelularesAtiva }}</label>&nbsp&nbsp&nbsp
  				<% } else { %>
  					<input class="checkBoxHidden" name="outrosTiposProduto" type="checkbox" id="checkboxTipoCelulares" value="4">
  					<label id="labelTipoCelulares" onclick="checkTipoProduto(this, checkboxTipoCelulares)" class="tag">{{ tipoCelularesAtiva }}</label>&nbsp&nbsp&nbsp
  				<% } %>
				  				 
  				<!-- 
  					INFORMÁTICA
  				 -->
  				<% if (lista_outros_tipos_produtos.contains("5")) { %>
  					<input class="checkBoxHidden" name="outrosTiposProduto" type="checkbox" id="checkboxTipoInformatica" value="5" checked>
  					<label id="labelTipoInformatica" onclick="checkTipoProduto(this, checkboxTipoInformatica)" class="tag tagAtivada">{{ tipoInformaticaAtiva }}</label>&nbsp&nbsp&nbsp
  				<% } else { %>
  					<input class="checkBoxHidden" name="outrosTiposProduto" type="checkbox" id="checkboxTipoInformatica" value="5">
  					<label id="labelTipoInformatica" onclick="checkTipoProduto(this, checkboxTipoInformatica)" class="tag">{{ tipoInformaticaAtiva }}</label>&nbsp&nbsp&nbsp
  				<% } %>
  				 
  				<!-- 
  					GAMES
  				 -->
  				<% if (lista_outros_tipos_produtos.contains("6")) { %>
  					<input class="checkBoxHidden" name="outrosTiposProduto" type="checkbox" id="checkboxTipoGames" value="6" checked>
  					<label id="labelTipoGames" onclick="checkTipoProduto(this, checkboxTipoGames)" class="tag tagAtivada">{{ tipoGamesAtiva }}</label>&nbsp&nbsp&nbsp
  				<% } else { %>
  					<input class="checkBoxHidden" name="outrosTiposProduto" type="checkbox" id="checkboxTipoGames" value="6">
  					<label id="labelTipoGames" onclick="checkTipoProduto(this, checkboxTipoGames)" class="tag">{{ tipoGamesAtiva }}</label>&nbsp&nbsp&nbsp
  				<% } %>
  				
  				
  				
  				<!-- 
  					** LAZER **
  				 -->
  				 
  				 <!-- 
  				 	LIVROS
  				  -->
  				 <% if (lista_outros_tipos_produtos.contains("7")) { %>
  					<input class="checkBoxHidden" name="outrosTiposProduto" type="checkbox" id="checkboxTipoLivros" value="7" checked>
  					<label id="labelTipoLivros" onclick="checkTipoProduto(this, checkboxTipoLivros)" class="tag tagAtivada">{{ tipoLivrosAtiva }}</label>&nbsp&nbsp&nbsp
  				<% } else { %>
  					<input class="checkBoxHidden" name="outrosTiposProduto" type="checkbox" id="checkboxTipoLivros" value="7">
  					<label id="labelTipoLivros" onclick="checkTipoProduto(this, checkboxTipoLivros)" class="tag">{{ tipoLivrosAtiva }}</label>&nbsp&nbsp&nbsp
  				<% } %>
  				  
  				 <!-- 
  				 	MANGÁS
  				  -->
  				<% if (lista_outros_tipos_produtos.contains("8")) { %>
  					<input class="checkBoxHidden" name="outrosTiposProduto" type="checkbox" id="checkboxTipoMangas" value="8" checked>
  					<label id="labelTipoMangas" onclick="checkTipoProduto(this, checkboxTipoMangas)" class="tag tagAtivada">{{ tipoMangasAtiva }}</label>&nbsp&nbsp&nbsp
  				<% } else { %>
  					<input class="checkBoxHidden" name="outrosTiposProduto" type="checkbox" id="checkboxTipoMangas" value="8">
  					<label id="labelTipoMangas" onclick="checkTipoProduto(this, checkboxTipoMangas)" class="tag">{{ tipoMangasAtiva }}</label>&nbsp&nbsp&nbsp
  				<% } %>
  				 
  				 <!-- 
  				 	BRINQUEDOS
  				  -->
  				<% if (lista_outros_tipos_produtos.contains("9")) { %>
					<input class="checkBoxHidden" name="outrosTiposProduto" type="checkbox" id="checkboxTipoBrinquedos" value="9" checked>
  					<label id="labelTipoBrinquedos" onclick="checkTipoProduto(this, checkboxTipoBrinquedos)" class="tag tagAtivada">{{ tipoBrinquedosAtiva }}</label>&nbsp&nbsp&nbsp  				
  				<% } else { %>
  					<input class="checkBoxHidden" name="outrosTiposProduto" type="checkbox" id="checkboxTipoBrinquedos" value="9">
  					<label id="labelTipoBrinquedos" onclick="checkTipoProduto(this, checkboxTipoBrinquedos)" class="tag">{{ tipoBrinquedosAtiva }}</label>&nbsp&nbsp&nbsp
  				<% } %>

  				
  				<!-- 
  					** MODA **
  				 -->
  				 
  				 <!-- 
  				 	DECORAÇÃO
  				  -->
  				<% if (lista_outros_tipos_produtos.contains("10")) { %>
  					<input class="checkBoxHidden" name="outrosTiposProduto" type="checkbox" id="checkboxTipoDecoracao" value="10" checked>
  					<label id="labelTipoDecoracoes" onclick="checkTipoProduto(this, checkboxTipoDecoracao)" class="tag tagAtivada">{{ tipoDecoracaoAtiva }}</label>&nbsp&nbsp&nbsp
  				<% } else { %>
  					<input class="checkBoxHidden" name="outrosTiposProduto" type="checkbox" id="checkboxTipoDecoracao" value="10">
  					<label id="labelTipoDecoracoes" onclick="checkTipoProduto(this, checkboxTipoDecoracao)" class="tag">{{ tipoDecoracaoAtiva }}</label>&nbsp&nbsp&nbsp
  				<% } %>
  				  
  				 <!-- 
  				 	ROUPAS
  				  -->
  				<% if (lista_outros_tipos_produtos.contains("11")) { %>
  					<input class="checkBoxHidden" name="outrosTiposProduto" type="checkbox" id="checkboxTipoRoupas" value="11" checked>
  					<label id="labelTipoRoupas" onclick="checkTipoProduto(this, checkboxTipoRoupas)" class="tag tagAtivada">{{ tipoRoupasAtiva }}</label>&nbsp&nbsp&nbsp
  				<% } else { %>
  					<input class="checkBoxHidden" name="outrosTiposProduto" type="checkbox" id="checkboxTipoRoupas" value="11">
  					<label id="labelTipoRoupas" onclick="checkTipoProduto(this, checkboxTipoRoupas)" class="tag">{{ tipoRoupasAtiva }}</label>&nbsp&nbsp&nbsp
  				<% } %>
  				  
  				 <!-- 
  				 	PERFUMARIA
  				  -->
  				<% if (lista_outros_tipos_produtos.contains("12")) { %>
  					<input class="checkBoxHidden" name="outrosTiposProduto" type="checkbox" id="checkboxTipoPerfumaria" value="12" checked>
  					<label id="labelTipoPerfumaria" onclick="checkTipoProduto(this, checkboxTipoPerfumaria)" class="tag tagAtivada">{{ tipoPerfumariaAtiva }}</label>&nbsp&nbsp&nbsp
  				<% } else { %>
  					<input class="checkBoxHidden" name="outrosTiposProduto" type="checkbox" id="checkboxTipoPerfumaria" value="12">
  					<label id="labelTipoPerfumaria" onclick="checkTipoProduto(this, checkboxTipoPerfumaria)" class="tag">{{ tipoPerfumariaAtiva }}</label>&nbsp&nbsp&nbsp
  				<% } %>
  				
  				
  				<!-- 
  					** AMBIENTE **
  				 -->
  				
  				<!-- 
  					ELETRODOMÉSTICOS
  				 -->
  				<% if (lista_outros_tipos_produtos.contains("13")) { %>
  					<input class="checkBoxHidden" name="outrosTiposProduto" type="checkbox" id="checkboxTipoEletrodomesticos" value="13" checked>
  					<label id="labelTipoEletrodomesticos" onclick="checkTipoProduto(this, checkboxTipoEletrodomesticos)" class="tag tagAtivada">{{ tipoEletrodomesticosAtiva }}</label>&nbsp&nbsp&nbsp
  				<% } else { %>
  					<input class="checkBoxHidden" name="outrosTiposProduto" type="checkbox" id="checkboxTipoEletrodomesticos" value="13">
  					<label id="labelTipoEletrodomesticos" onclick="checkTipoProduto(this, checkboxTipoEletrodomesticos)" class="tag">{{ tipoEletrodomesticosAtiva }}</label>&nbsp&nbsp&nbsp
  				<% } %>
  				
  				<!-- 
  					MÓVEIS
  				 -->
  				<% if (lista_outros_tipos_produtos.contains("14")) { %>
  					<input class="checkBoxHidden" name="outrosTiposProduto" type="checkbox" id="checkboxTipoMoveis" value="14" checked>
  					<label id="labelTipoMoveis" onclick="checkTipoProduto(this, checkboxTipoMoveis)" class="tag tagAtivada">{{ tipoMoveisAtiva }}</label>&nbsp&nbsp&nbsp
  				<% } else { %>
  					<input class="checkBoxHidden" name="outrosTiposProduto" type="checkbox" id="checkboxTipoMoveis" value="14">
  					<label id="labelTipoMoveis" onclick="checkTipoProduto(this, checkboxTipoMoveis)" class="tag">{{ tipoMoveisAtiva }}</label>&nbsp&nbsp&nbsp
  				<% } %>
  				 
  				<!-- 
  					EMPRESARIAIS
  				 -->
  				<% if (lista_outros_tipos_produtos.contains("15")) { %>
  					<input class="checkBoxHidden" name="outrosTiposProduto" type="checkbox" id="checkboxTipoEmpresariais" value="15" checked>
  					<label id="labelTipoEmpresariais" onclick="checkTipoProduto(this, checkboxTipoEmpresariais)" class="tag tagAtivada">{{ tipoEmpresariaisAtiva }}</label>&nbsp&nbsp&nbsp
  				<% } else { %>
  					<input class="checkBoxHidden" name="outrosTiposProduto" type="checkbox" id="checkboxTipoEmpresariais" value="15">
  					<label id="labelTipoEmpresariais" onclick="checkTipoProduto(this, checkboxTipoEmpresariais)" class="tag">{{ tipoEmpresariaisAtiva }}</label>&nbsp&nbsp&nbsp
  				<% } %>
  				
  				
  				<!-- 
  					** AUTOMÓVEIS **
  				 -->
  				
  				<!-- 
  				 CARROS
  				 -->
  				<% if (lista_outros_tipos_produtos.contains("16")) { %>
  					<input class="checkBoxHidden" name="outrosTiposProduto" type="checkbox" id="checkboxTipoCarros" value="16" checked>
  					<label id="labelTipoCarros" onclick="checkTipoProduto(this, checkboxTipoCarros)" class="tag tagAtivada">{{ tipoCarrosAtiva }}</label>&nbsp&nbsp&nbsp
  				<% } else { %>
  					<input class="checkBoxHidden" name="outrosTiposProduto" type="checkbox" id="checkboxTipoCarros" value="16">
  					<label id="labelTipoCarros" onclick="checkTipoProduto(this, checkboxTipoCarros)" class="tag">{{ tipoCarrosAtiva }}</label>&nbsp&nbsp&nbsp
  				<% } %>
  				
  				<!-- 
  				 MOTOS
  				 -->
  				<% if (lista_outros_tipos_produtos.contains("17")) { %>
  					<input class="checkBoxHidden" name="outrosTiposProduto" type="checkbox" id="checkboxTipoMotos" value="17" checked>
  					<label id="labelTipoMotos" onclick="checkTipoProduto(this, checkboxTipoMotos)" class="tag tagAtivada">{{ tipoMotosAtiva }}</label>&nbsp&nbsp&nbsp
  				<% } else { %>
  					<input class="checkBoxHidden" name="outrosTiposProduto" type="checkbox" id="checkboxTipoMotos" value="17">
  					<label id="labelTipoMotos" onclick="checkTipoProduto(this, checkboxTipoMotos)" class="tag">{{ tipoMotosAtiva }}</label>&nbsp&nbsp&nbsp
  				<% } %>  
  				
  				<!-- 
  				 CAMINHÕES
  				 -->
  				<% if (lista_outros_tipos_produtos.contains("18")) { %>
  					<input class="checkBoxHidden" name="outrosTiposProduto" type="checkbox" id="checkboxTipoCaminhoes" value="18" checked>
  					<label id="labelTipoCaminhoes" onclick="checkTipoProduto(this, checkboxTipoCaminhoes)" class="tag tagAtivada">{{ tipoCaminhoesAtiva }}</label>&nbsp&nbsp&nbsp
  				<% } else { %>
  					<input class="checkBoxHidden" name="outrosTiposProduto" type="checkbox" id="checkboxTipoCaminhoes" value="18">
  					<label id="labelTipoCaminhoes" onclick="checkTipoProduto(this, checkboxTipoCaminhoes)" class="tag">{{ tipoCaminhoesAtiva }}</label>&nbsp&nbsp&nbsp
  				<% } %>
  				
  				<!-- 
  				 CAMINHONETES
  				 -->
  				<% if (lista_outros_tipos_produtos.contains("19")) { %>
  					<input class="checkBoxHidden" name="outrosTiposProduto" type="checkbox" id="checkboxTipoCaminhonetes" value="19" checked>
  					<label id="labelTipoCaminhonetes" onclick="checkTipoProduto(this, checkboxTipoCaminhonetes)" class="tag tagAtivada">{{ tipoCaminhonetesAtiva }}</label>&nbsp&nbsp&nbsp
  				<% } else { %>
  					<input class="checkBoxHidden" name="outrosTiposProduto" type="checkbox" id="checkboxTipoCaminhonetes" value="19">
  					<label id="labelTipoCaminhonetes" onclick="checkTipoProduto(this, checkboxTipoCaminhonetes)" class="tag">{{ tipoCaminhonetesAtiva }}</label>&nbsp&nbsp&nbsp
  				<% } %>

  				
  				<!-- 
  					** OUTROS **
  				 -->
  				 
  				<!-- 
  					OUTROS
  				 -->
  				<% if (lista_outros_tipos_produtos.contains("20")) { %>
  					<input class="checkBoxHidden" name="outrosTiposProduto" type="checkbox" id="checkboxTipoOutros" value="20" checked>
  					<label id="labelTipoOutros" onclick="checkTipoProduto(this, checkboxTipoOutros)" class="tag tagAtivada">{{ tipoOutrosAtiva }}</label>
  				<% } else { %>
  					<input class="checkBoxHidden" name="outrosTiposProduto" type="checkbox" id="checkboxTipoOutros" value="20">
  					<label id="labelTipoOutros" onclick="checkTipoProduto(this, checkboxTipoOutros)" class="tag">{{ tipoOutrosAtiva }}</label>
  				<% } %>
			</div>
			
			<br>
			<hr class="horizontalLine">
			<br>
			
			<!-- QR Code do Produto  -->
			<div id="divQRCodePainelAlterarProduto" class="flexCenterWrap"
				 data-uuid-produto="<%=uuid_produto%>" data-nome-produto="<%=produto_bean.getNome()%>"></div>
			<br><br>
			
			<div class="flexCenter">
				<button id="salvarQRCodePainelAlterarProduto" class="botao" data-anijs="if: mouseover, do: rubberBand animated"><i class="fas fa-download"></i></button>
			</div>
				
			<br>
			<hr class="horizontalLine">
			<br>
			
			<!-- Botões -->
			<div class="sectionPainelContent flexSpace">
				<a href="painel.jsp"><div class="botaoSecundario" data-anijs="if: mouseover, do: rubberBand animated">{{ botaoCancelarAtiva }}</div></a>
				<div id="botaoSalvarProduto" class="botao" data-anijs="if: mouseover, do: rubberBand animated">{{ botaoSalvarAtiva }}</div>
			</div>
			<br>
			
		</form>
		
		<!-- template do qr code -->
		<script type="text/template" id="qrcodeTpl1PainelAlterarProduto">
			<div class="imgblock">
				<div class="qr" id="qrcodePainelAlterarProduto_{i}"></div>
			</div>
		</script>
<%
	}
	
	// Produto não Encontrado - Mensagem é exibida ao usuário
	else {
		
		// Idioma: Português - Brasil
		if (idioma.equals("1")) {
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