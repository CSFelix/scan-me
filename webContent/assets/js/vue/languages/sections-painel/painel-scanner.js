/* 
	Variáveis
*/

var vuePainelScanner = new Vue({
  el: '#painelScanner',
  data: {
    tituloScannerPortugues: '📱 Scanner de QR Code 📱',
    tituloScannerEnglish: '📱  QR Code Scan 📱',
    tituloScannerAtiva: '',
    
    infoMensagemAtivarCameraPortugues: '🎥 Clique no botão para ativar a câmera',
    infoMensagemAtivarCameraEnglish: '🎥 Click on the button to turn on the camera',
    infoMensagemAtivarCameraAtiva: '',
    
    botaoLigarCameraPortugues: 'Ligar a câmera',
    botaoLigarCameraEnglish: 'Turn on the camera',
    botaoLigarCameraAtiva: '',
    
    botaoDesligarCameraPortugues: 'Desligar a câmera',
    botaoDesligarCameraEnglish: 'Turn off the camera',
    botaoDesligarCameraAtiva: '',
    
    infoMensagemQRCodeNaoEncontradoPortugues: 'QR Code não encontrado.',
    infoMensagemQRCodeNaoEncontradoEnglish: 'No QR code detected.',
    infoMensagemQRCodeNaoEncontradoAtiva: ''
  }
});

/*
	Controladores
*/
const vueAtivarControladorPainelScanner = () => {
	
	loginLocalStorage = localStorage.getItem('language');
	
	// português - br
	if ((loginLocalStorage == '1') 
		|| (typeof loginLocalStorage !== 'undefined' && loginLocalStorage !== null && loginLocalStorage != '2')) {
		
		
		vuePainelScanner.tituloScannerAtiva = vuePainelScanner.tituloScannerPortugues;
		vuePainelScanner.infoMensagemAtivarCameraAtiva = vuePainelScanner.infoMensagemAtivarCameraPortugues;
		vuePainelScanner.botaoLigarCameraAtiva = vuePainelScanner.botaoLigarCameraPortugues;
		vuePainelScanner.botaoDesligarCameraAtiva = vuePainelScanner.botaoDesligarCameraPortugues;
		vuePainelScanner.infoMensagemQRCodeNaoEncontradoAtiva = vuePainelScanner.infoMensagemQRCodeNaoEncontradoPortugues;
	}

	// english - eua
	else {
		vuePainelScanner.tituloScannerAtiva = vuePainelScanner.tituloScannerEnglish;
		vuePainelScanner.infoMensagemAtivarCameraAtiva = vuePainelScanner.infoMensagemAtivarCameraEnglish;
		vuePainelScanner.botaoLigarCameraAtiva = vuePainelScanner.botaoLigarCameraEnglish;
		vuePainelScanner.botaoDesligarCameraAtiva = vuePainelScanner.botaoDesligarCameraEnglish;
		vuePainelScanner.infoMensagemQRCodeNaoEncontradoAtiva = vuePainelScanner.infoMensagemQRCodeNaoEncontradoEnglish;
	}
};