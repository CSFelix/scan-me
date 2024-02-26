/* Elementos */

const swithTipoUsuario = document.getElementById('switchTipoUsuario');
const inputTipoUsuario = document.getElementById('inputTipoUsuario');
const tagComprador = document.getElementById('tagComprador');
const tagVendedor = document.getElementById('tagVendedor');

/* 
 * Tratamento do Clique no Switch do Tipo de Usuário 
 * É utilizado um bloco try-catch, pois este código é usado somente na página
 * de cadastro e alteração de dados do usuário, logo, para nã ogerar erro nas demais páginas
 * que contém a importação do código, é adicionado o bloco.
 * */

try {
	swithTipoUsuario.addEventListener('click', function() {
		
		/* Tratamento do Input e das Tags */
		
		// [Tipo Comprador] 
		// label de comprador é ativada
		// e label de vendedor é desativada
		if (inputTipoUsuario.checked) {
			tagComprador.classList.add('tagAtivada');
			tagVendedor.classList.remove('tagAtivada');
		}
		
		// [Tipo Vendedor] 
		// label de comprador é desativada
		// e label de vendedor é ativada
		else {
			tagComprador.classList.remove('tagAtivada');
			tagVendedor.classList.add('tagAtivada');
		}
	});
}

catch (e) { console.log(e); }