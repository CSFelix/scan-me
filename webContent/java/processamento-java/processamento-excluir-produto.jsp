<%@page import="java.sql.*" %>
<%@page import="java.io.*"%>
<%@page import="Dao.ProdutoDao" %>
<%
	// Produto s� � exclu�do se o status dele
	// � diferente de 2 (Vendido)
	//
	// O tratamento desta especifica��o � feito diretamente
	// no lado do cliente via JS
	ProdutoDao produto_dao = new ProdutoDao();
	produto_dao.ExcluirProduto(request.getParameter("uuidProduto"));
%>