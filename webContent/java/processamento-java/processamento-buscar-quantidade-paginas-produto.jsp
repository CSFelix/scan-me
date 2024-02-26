<%@page import="java.lang.Math" %>
<%@page import="Bean.ProdutoBean"%>
<%@page import="Dao.ProdutoDao"%>

<%
	ProdutoDao produto_dao = new ProdutoDao();
	final int produtos_por_pagina = 10;
	int quantidade_paginas;
	
	// Caso houver produtos cadastrados, a quantidade total de produtos é dividida pela
	// quantidade de produtos exibida por página; depois, o resultado é arredondado para cima
	// e convertido de decimal para inteiro
	try {
		quantidade_paginas = (int) Math.floor(
									produto_dao.BuscarQuantidadeProdutosCadastradosPorUsuario((String) session.getAttribute("usuario_uuid")) 
									/ (produtos_por_pagina + 1)
							 	   ) 
								   + 1;
	}
	
	// Caso não houver produtos cadastrados, a quantidade de páginas é definida como o mínimo,
	// ou seja, como 1
	catch (Exception e) { quantidade_paginas = 1; }
%>
<%=quantidade_paginas %>