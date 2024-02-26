/* 
	Variáveis
*/

var vueMainContent = new Vue({
  el: '#mainContent',
  data: {
	tituloLoginPortugues: 'Login',
	tituloLoginEnglish: 'Login',
	tituloLoginAtiva: '',
	  
    labelLoginPortugues: 'Seu Email',
    labelLoginEnglish: 'Your Email',
    labelLoginAtiva: '',

    labelSenhaPortugues: 'Sua Senha',
    labelSenhaEnglish: 'Your Password',
    labelSenhaAtiva: '',

    botaoLoginPortugues: 'Entrar',
    botaoLoginEnglish: 'Sign In',
    botaoLoginAtiva: '',

    botaoCadastrarPortugues: 'Cadastre-se',
    botaoCadastrarEnglish: 'Sign Up',
    botaoCadastrarAtiva: '',

    esqueceuSenhaPortugues: 'Esqueceu sua Senha?',
    esqueceuSenhaEnglish: 'Forgot your Password?',
    esqueceuSenhaAtiva: ''
  }
});

/*
	Controladores
*/
const vueAtivarControladorIdiomaLogin = () => {
	
	loginLocalStorage = localStorage.getItem('language');
	
	// português - br
	if ((loginLocalStorage == '1') 
		|| (typeof loginLocalStorage !== 'undefined' && loginLocalStorage !== null && loginLocalStorage != '2')) {
		
		vueMainContent.tituloLoginAtiva = vueMainContent.tituloLoginPortugues;
		vueMainContent.labelLoginAtiva = vueMainContent.labelLoginPortugues;
		vueMainContent.labelSenhaAtiva = vueMainContent.labelSenhaPortugues;
		vueMainContent.botaoLoginAtiva = vueMainContent.botaoLoginPortugues;
		vueMainContent.botaoCadastrarAtiva = vueMainContent.botaoCadastrarPortugues;
		vueMainContent.esqueceuSenhaAtiva = vueMainContent.esqueceuSenhaPortugues;
	}

	// english - eua
	else {
		vueMainContent.tituloLoginAtiva = vueMainContent.tituloLoginEnglish;
		vueMainContent.labelLoginAtiva = vueMainContent.labelLoginEnglish;
		vueMainContent.labelSenhaAtiva = vueMainContent.labelSenhaEnglish;
		vueMainContent.botaoLoginAtiva = vueMainContent.botaoLoginEnglish;
		vueMainContent.botaoCadastrarAtiva = vueMainContent.botaoCadastrarEnglish;
		vueMainContent.esqueceuSenhaAtiva = vueMainContent.esqueceuSenhaEnglish;
	}
};