<%@page import="java.sql.*" %>
<%@page import="java.io.*"%>
<%@page import="Dao.ProdutoDao" %>
<%
	// Produto só é excluído se o status dele
	// é diferente de 2 (Vendido)
	//
	// O tratamento desta especificação é feito diretamente
	// no lado do cliente via JS
	ProdutoDao produto_dao = new ProdutoDao();
	produto_dao.ExcluirProduto(request.getParameter("uuidProduto"));
%>