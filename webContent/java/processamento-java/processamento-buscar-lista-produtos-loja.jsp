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
		
		// Transformação da Foto do Produto
		dados_fotos_produto = produto_dao.SelecionarContagemIndexFotosProdutoPorUuidProduto(produto.getUuid());
		
		/* setamento do index da primeira foto encontrada
		por padrão, o index é zerado
		caso produto não ter foto salva no banco de dados, o index continuará como zerado
		e foto padrão será exibida na aplicação */
		int index_primeira_foto = 0;
		
		/* checagem das fotos que o produto possui */
		for (int quantidade_fotos : dados_fotos_produto.keySet()) {
			
			// verificação de quais colunas têm foto do produto salva no banco de dados
			// foto_1, foto_2, [...], foto_6
			//
			// verificação termina quando primeira foto é encontrada
			// ou quando todos os campos são varridos e nenhuma foto é encontrada
			for (int index_foto : dados_fotos_produto.get(quantidade_fotos)) {

				// caso valor do identificador da coluna for igual a "0"
				// significa de que não há foto salva nele
				if (index_foto == 0) { continue; }
				
				// caso contrário, a primeira foto foi encontrada e loop é encerrado
				else {
					index_primeira_foto = index_foto;
					break;
				}
			}
		}
		
		// Transformação da Moeda
		String moeda = (produto.getMoeda().equals("1")) ? "R$" : "U$";
		
		// Transformação do Tipo Principal
		String tipo_principal = produto_dao.TransformarTipoPrincipalProduto(produto.getTipoPrincipal(), 
																			Integer.parseInt(request.getParameter("idioma")));
		
		// Tradução do Botão de Detalhes
		String botaoDetalhes = request.getParameter("idioma").equals("1") ? "+ Detalhes" : "+ Details";
%>

		<div class="produtoCartao" data-uuid-produto="<%=produto.getUuid() %>" onClick="RedirecionarVisualizarProduto(this)">
	
			<h1><%=produto.getNome() %></h1>
			<p>By: <%=produto.getVendedor()%></p>
			<br><br>

      		<div class="produtoFoto">
      		
      			<%-- Caso index da foto for diferente de 0, significa que foto foi encontrada
      				e a mesma é exibida na página.
      				Caso contrário, significa de que produto não tem foto
      				e foto padrão é exibida. --%>
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