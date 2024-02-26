package Servlets;
 
import java.io.IOException;
import java.io.InputStream;

import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;
import javax.servlet.http.HttpSession;

import Bean.UsuarioBean;
import Dao.UsuarioDao;
import Seguranca.StripHTML;
 
@WebServlet(urlPatterns = "/AlterarDadosUsuario")
@MultipartConfig(maxFileSize = 16177215) // processa imagens de até 16 MB (valor informado em Bits)

public class AlterarDadosUsuario extends HttpServlet {
	/*
	 * Classe responsável por receber e tratar o envio de imagens de perfil e dados dos usuários
	 * Após receber, ela irá descriptar as partes do arquivo, uni-las em um único pacote
	 * e encaminhar ao banco de dados juntamente com as demais informações
	 * */
	private static final long serialVersionUID = 4L;
	
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    	/*
    	 * Processamento de envio da imagem e dos dados do usuário em método POST
    	 * Assintótica: O(1)
    	 * */
    	
    	/* Conversão dos Dados em UTF-8 para aceitar acentuação */
    	request.setCharacterEncoding("UTF-8");
    	
    	UsuarioBean usuario_bean = new UsuarioBean();
    	UsuarioDao usuario_dao = new UsuarioDao();
    	
    	usuario_bean.setNickname(StripHTML.StripString(request.getParameter("nickname")));
    	usuario_bean.setEmail(StripHTML.StripString(request.getParameter("email")));
    	usuario_bean.setNumeroWhatsapp(StripHTML.StripString(request.getParameter("whatsapp")));
    	usuario_bean.setNumeroTelegram(StripHTML.StripString(request.getParameter("telegram")));
    	usuario_bean.setIdTelegram(StripHTML.StripString(request.getParameter("idTelegram")));
    	usuario_bean.setUuidUsuario(request.getParameter("usuario_uuid"));
    	usuario_bean.setTipoUsuario(request.getParameter("usuario_tipo"));
    	
    	// Atualização dos dados da sessão
    	HttpSession session = request.getSession();
		session.setAttribute("usuario_nickname", usuario_bean.getNickname());
		session.setAttribute("usuario_email", usuario_bean.getEmail());
		session.setAttribute("usuario_whatsapp", usuario_bean.getNumeroWhatsapp());
		session.setAttribute("usuario_telegram", usuario_bean.getNumeroTelegram());
		session.setAttribute("usuario_id_telegram", usuario_bean.getIdTelegram());
		session.setAttribute("usuario_uuid", usuario_bean.getUuidUsuario());
		session.setAttribute("usuario_tipo", usuario_bean.getTipoUsuario());
    	
    	// Alteração dos Dados
    	if (usuario_dao.AlterarDados(usuario_bean)) {
    		InputStream avatar = null;
            Part partes_avatar = request.getPart("avatar");
            
            // Caso a imagem seja encaminhada com sucesso à Servlet
            // Tal será processada e inserida no banco de dados
            if (partes_avatar != null && request.getPart("avatar").getSize() > 0) { avatar = partes_avatar.getInputStream(); }
            
            // Alteração do Avatar
        	usuario_dao.AlterarAvatarCadastro(usuario_bean.getEmail(), avatar);
    	}
    	
    	// Email já registrado
    	else {     	    
    	    ServletOutputStream out = response.getOutputStream();
    	    out.println("0");
    	}
    }
}