<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>

<%@page import="Seguranca.StripHTML"%>
<%@page import="Bean.ProdutoBean"%>
<%@page import="Dao.ProdutoDao"%>

<%
	ProdutoBean produto_bean = new ProdutoBean();
	
	produto_bean.setUuidUsuario((String) session.getAttribute("usuario_uuid"));
	produto_bean.setNome(StripHTML.StripString(request.getParameter("nome")));
	produto_bean.setPreco(request.getParameter("preco"));
	produto_bean.setMoeda(request.getParameter("moeda"));
	produto_bean.setDescricao(StripHTML.StripString(request.getParameter("descricao")));
	produto_bean.setEstoque(request.getParameter("estoque"));
	produto_bean.setStatus(request.getParameter("status"));
	produto_bean.setTipoPrincipal(request.getParameter("tipoPrincipal"));
	produto_bean.setOutrosTipos(request.getParameter("outrosTipos").replace("[", "")
											   					   .replace("]", "")
											   					   .replace("\"", "")
											   					   .replace("\"", "")
											   				   	   .split(","));

	ProdutoDao produto_dao = new ProdutoDao();
	
	// falha no cadastro
	if (!(produto_dao.CadastrarProdutoSemFoto(produto_bean))) {
%>
		0
<%
	}
%>