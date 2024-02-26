package Servlets;

import java.io.IOException;
import java.io.InputStream;

import javax.servlet.http.HttpSession; 
import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;

import Bean.ProdutoBean;
import Dao.ProdutoDao;
import Seguranca.StripHTML;

@WebServlet(urlPatterns = "/AlterarProdutoComFoto")
@MultipartConfig(maxFileSize = 16177215) // processa imagens de até 16 MB (valor informado em Bits)

public class AlterarProdutoComFoto extends HttpServlet {
	/*
	 * Classe responsável por receber e tratar o envio das informações dos produtos (textos e fotos)
	 * Sobre as fotos, após recebê-las, a classe irá descriptar as partes do arquivo, uni-las em um único pacote
	 * e encaminhar ao banco de dados juntamente com as demais informações de texto
	 * */
	private static final long serialVersionUID = 4L;
	
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    	
    	/* Conversão dos Dados em UTF-8 para aceitar acentuação */
    	request.setCharacterEncoding("UTF-8");
    	
    	/* Processamento Dados Produto */
    	ProdutoBean produto_bean = new ProdutoBean();
    	ProdutoDao produto_dao = new ProdutoDao();
    	HttpSession session = request.getSession();
    	
    	produto_bean.setUuid((String) session.getAttribute("uuid_produto_alteracao"));
    	produto_bean.setNome(StripHTML.StripString(request.getParameter("nomeProduto")));
    	produto_bean.setPreco(request.getParameter("valorProduto"));
    	produto_bean.setMoeda(request.getParameter("moedaProduto"));
    	produto_bean.setDescricao(StripHTML.StripString(request.getParameter("descricaoProduto")));
    	produto_bean.setEstoque(request.getParameter("estoqueProduto"));
    	produto_bean.setStatus(request.getParameter("statusProduto"));
    	produto_bean.setTipoPrincipal(request.getParameter("tipoPrincipalProduto"));
    	produto_bean.setOutrosTipos(request.getParameterValues("outrosTiposProduto"));
    	
    	produto_dao.AlterarProdutoSemFoto(produto_bean);
    	
    	/* Processamento Fotos Produto */
    	InputStream[] lista_fotos = new InputStream[] {null, null, null, null, null, null};
    	Part[] partes_fotos = new Part[] {  request.getPart("fotoProduto1"), request.getPart("fotoProduto2")
				 						  , request.getPart("fotoProduto3"), request.getPart("fotoProduto4")
				 						  , request.getPart("fotoProduto5"), request.getPart("fotoProduto6")};
    	
    	String[] flags_index_fotos = new String[] {  request.getParameter("index_foto_1"), request.getParameter("index_foto_2")
    											   , request.getParameter("index_foto_3"), request.getParameter("index_foto_4")
    											   , request.getParameter("index_foto_5"), request.getParameter("index_foto_6")};
    	
    	// Varredura pelas fotos encaminhadas
    	// Caso foi encaminhada, a mesma é armazenada na lista de streams
    	// caso contrário, é adicionado "null" na lista
    	for (int i = 0; i < partes_fotos.length; i++) {
    		if (partes_fotos[i] != null && request.getPart("fotoProduto" + (i + 1)).getSize() > 0) { 
    			lista_fotos[i] = partes_fotos[i].getInputStream();
    		}
    		else { lista_fotos[i] = null; }
    	}
    	
    	// caso houver falha interna no cadastro
    	// é retornado 0 para front retornar mensagem de erro ao usuário
    	if (!(produto_dao.AlterarProdutoComFoto(produto_bean.getUuid(), lista_fotos, flags_index_fotos))) {
    		ServletOutputStream out = response.getOutputStream();
     	    out.println("0");
    	}
    	
    	// caso contrário, sessões são apagadas
    	else {
    		session.removeAttribute("uuid_produto_alteracao");
    		session.removeAttribute("tipo_selecionado_tag");
    		session.removeAttribute("quantidade_outros_tipos");
    	}
    }
}