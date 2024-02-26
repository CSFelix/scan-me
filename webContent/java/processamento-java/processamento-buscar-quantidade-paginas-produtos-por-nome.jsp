<%@page import="Dao.ProdutoDao" %>
<%
	ProdutoDao produto_dao = new ProdutoDao();

	final int produtos_por_pagina = 10;
	int quantidade_paginas = (int) Math.floor(
				produto_dao.BuscarQuantidadeProdutosCadastradosPorUsuarioFiltroPorNomeProduto((String) session.getAttribute("usuario_uuid")
					, request.getParameter("nomeProdutoPesquisa"))
				/ (produtos_por_pagina + 1)
			)
			+ 1;
%>
<%=quantidade_paginas%>