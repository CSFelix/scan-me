<%@page import="Dao.ProdutoDao" %>
<%
	ProdutoDao produto_dao = new ProdutoDao();

	final int produtos_por_pagina = 9;
	
	int quantidade_paginas = (int) Math.floor(produto_dao.BuscarQuantidadeProdutosCadastradosLojaFiltroPorNomeProduto(request.getParameter("nomeProdutoPesquisa"))
											  / (produtos_por_pagina + 1)) + 1;
%>
<%=quantidade_paginas%>