<%@page import="java.util.ArrayList"%>
<%@page import="Bean.ProdutoBean"%>
<%@page import="Dao.ProdutoDao"%>

<%@page import= "java.util.Map"%>
<%@page import= "java.util.HashMap"%>
<%@page import= "java.util.ArrayList"%>    

<%
	ProdutoDao produto_dao = new ProdutoDao();
	ArrayList<ProdutoBean> lista_produtos = produto_dao.BuscarListaDadosLojaProdutos(Integer.parseInt(request.getParameter("paginaAtual")));
	Map<Integer, ArrayList<Integer>> dados_fotos_produto;
	
	for (ProdutoBean produto : lista_produtos) {
		
		// Transforma��o da Foto do Produto
		dados_fotos_produto = produto_dao.SelecionarContagemIndexFotosProdutoPorUuidProduto(produto.getUuid());
		
		/* setamento do index da primeira foto encontrada
		por padr�o, o index � zerado
		caso produto n�o ter foto salva no banco de dados, o index continuar� como zerado
		e foto padr�o ser� exibida na aplica��o */
		int index_primeira_foto = 0;
		
		/* checagem das fotos que o produto possui */
		for (int quantidade_fotos : dados_fotos_produto.keySet()) {
			
			// verifica��o de quais colunas t�m foto do produto salva no banco de dados
			// foto_1, foto_2, [...], foto_6
			//
			// verifica��o termina quando primeira foto � encontrada
			// ou quando todos os campos s�o varridos e nenhuma foto � encontrada
			for (int index_foto : dados_fotos_produto.get(quantidade_fotos)) {

				// caso valor do identificador da coluna for igual a "0"
				// significa de que n�o h� foto salva nele
				if (index_foto == 0) { continue; }
				
				// caso contr�rio, a primeira foto foi encontrada e loop � encerrado
				else {
					index_primeira_foto = index_foto;
					break;
				}
			}
		}
		
		// Transforma��o da Moeda
		String moeda = (produto.getMoeda().equals("1")) ? "R$" : "U$";
		
		// Transforma��o do Tipo Principal
		String tipo_principal = produto_dao.TransformarTipoPrincipalProduto(produto.getTipoPrincipal(), 
																			Integer.parseInt(request.getParameter("idioma")));
		
		// Tradu��o do Bot�o de Detalhes
		String botaoDetalhes = request.getParameter("idioma").equals("1") ? "+ Detalhes" : "+ Details";
%>

		<div class="produtoCartao" data-uuid-produto="<%=produto.getUuid() %>" onClick="RedirecionarVisualizarProduto(this)">
	
			<h1><%=produto.getNome() %></h1>
			<p>By: <%=produto.getVendedor()%></p>
			<br><br>

      		<div class="produtoFoto">
      		
      			<%-- Caso index da foto for diferente de 0, significa que foto foi encontrada
      				e a mesma � exibida na p�gina.
      				Caso contr�rio, significa de que produto n�o tem foto
      				e foto padr�o � exibida. --%>
      			<% if (index_primeira_foto != 0) {%>
      				<img src="java/processamento-java/processamento-exibir-produto.jsp?uuid-produto=<%=produto.getUuid() %>&index=<%=index_primeira_foto %>"/>
      			<% } else { %>
      				<img src="images/avatar/no_image_available.png"/>
      			<% } %>
      		</div>
			<br><br>

	      	<div class="produtoTipoPrincipal">
	        	<label class="tag"><%=tipo_principal %></label>
	      	</div>
			<br>

	      	<div class="produtoInfo">
	        	<div class="produtoPreco"><%=moeda %> <%=produto.getPreco() %></div>
	        	<button class="produtoBotao"><%=botaoDetalhes %></button>
	      	</div>
		</div>
		<br><br>
		
		<!-- 
		  produto.getUuid() 
		x produto.getNome() 
		x produto.getMoeda()
		x produto.getPreco()
		x produto.getTipoPrincipal()-->
<%
	}
%>