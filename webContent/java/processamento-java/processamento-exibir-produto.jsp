<%@page import="java.sql.*" %>
<%@page import="java.io.*"%>
<%@page import="Dao.ProdutoDao" %>
<%
	// Exibição de uma foto do produto
	ProdutoDao produto_dao = new ProdutoDao();
	byte[] foto_produto = produto_dao.SelecionarFotoProdutoPorUuidIndex(request.getParameter("uuid-produto")
																		, Integer.parseInt(request.getParameter("index")));
	
	OutputStream foto_produto_output = response.getOutputStream();	
	foto_produto_output.write(foto_produto);
	foto_produto_output.flush();
	foto_produto_output.close();
%>