/* elementos */
const botaoLigarCamera = document.getElementById("botaoLigarCamera");
const botaoDesligarCamera = document.getElementById('botaoDesligarCamera');

const video = document.createElement("video");

const elementoCanvas = document.getElementById("canvas");
const canvas = elementoCanvas.getContext("2d");

const mensagemAtivarCamera = document.getElementById("mensagemAtivarCamera");
const outputContainer = document.getElementById("output");
const mensagemQRCodeNaoEncontrado = document.getElementById("mensagemQRCodeNaoEncontrado");

var track;
var flag = false;


// ativação do bot
function AtivarBots(urlQRCode) {

	// Processamento da Uuid do Produto
	produto_uuid = urlQRCode.split('uuid-produto');
	produto_uuid = produto_uuid[1].split('idioma');
	produto_uuid = produto_uuid[0];
	produto_uuid = produto_uuid.slice(1, produto_uuid.length - 1)

	// AJAX
	req = new XMLHttpRequest();
	req.open('GET', 'http://localhost:3000/whatsapp_bot?comprador_uuid=' + sessionStorage.getItem('usuario_uuid') + '&produto_uuid=' + produto_uuid + '&idioma=' + localStorage.getItem('language'), true);
	req.onreadystatechange = function() { }
	req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
	req.send();
}

/* desenha uma linha no canvas >> usado para desenhar um quadrado ao redor do 
QR Code encontrado no vídeo (4 linhas) */
function desenharLinha(begin, end, color) {
  canvas.beginPath();
  canvas.moveTo(begin.x, begin.y);
  canvas.lineTo(end.x, end.y);
  canvas.lineWidth = 4;
  canvas.strokeStyle = color;
  canvas.stroke();
}

/* requisita permissão para acessar a câmera do dispositivo */
// facingMode: para smartphones, dá preferência para acessar a câmera traseira
botaoLigarCamera.addEventListener("click", function() {
	navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } }).then(function(stream) {
	
    	track = stream.getTracks()[0]; // captura a track (usado para parar a câmera ao encontrar o QR Code)

    	video.srcObject = stream;
      	video.setAttribute("playsinline", true); // playsinline: força iOS Safari a não usar o modo tela cheia para reproduzir o vídeo

      	video.play();
      	console.log(track);
      	requestAnimationFrame(tick);
	});
});

/* desligar captura pela câmera */
botaoDesligarCamera.addEventListener("click", function() {
	
	// finalizar uso da cãmera e remover exibição do vídeo
	track.stop();
	track.readyState = "live";
	video.remove();
	
	// recarregar página para sistema limpar cache da câmera no navegador
	location.reload();
});

/* requisita e processa cada frame salvo pela câmera e tenta encontrar o QR Code */
function tick() {
	mensagemAtivarCamera.innerText = "⌛ Loading video...";
	
	// quando o primeiro frame é capturado pela câmera
	// a reprodução do vídeo é iniciada no canvas
  	if (video.readyState === video.HAVE_ENOUGH_DATA) {

  		// esconde mensagem de ativar câmera e exibe o canvas com o vídeo
    	mensagemAtivarCamera.hidden = true;
    	botaoLigarCamera.hidden = true;
    	elementoCanvas.hidden = false;
    	botaoDesligarCamera.hidden = false;
    	outputContainer.hidden = false;

    	// define o width e a height do canvas
    	// e desenha os frames do vídeo dentro dele
        // elementoCanvas.height = video.videoHeight;
        // elementoCanvas.width = video.videoWidth;
    	elementoCanvas.style.width = "30vw";
    	elementoCanvas.style.height = "30vw";
        canvas.drawImage(video, 0, 0, elementoCanvas.width, elementoCanvas.height);

        // o frame é capturado e enviado à biblioteca jsQR a fim de encontrar QR Codes
        var imageData = canvas.getImageData(0, 0, elementoCanvas.width, elementoCanvas.height);
        var code = jsQR(imageData.data, imageData.width, imageData.height, { inversionAttempts: "dontInvert", }); // frame não é invertido (horizontalmente)
    	
    	// QR encontrado
        if (code) {

        	// um quadrado é desenhado ao redor do QRCode usando a função "desenhaLinha"
        	desenharLinha(code.location.topLeftCorner, code.location.topRightCorner, "#FF3B58");
          	desenharLinha(code.location.topRightCorner, code.location.bottomRightCorner, "#FF3B58");
          	desenharLinha(code.location.bottomRightCorner, code.location.bottomLeftCorner, "#FF3B58");
          	desenharLinha(code.location.bottomLeftCorner, code.location.topLeftCorner, "#FF3B58");
          
          	// esconde a mensagem de "QR Code não encontrado"
        	mensagemQRCodeNaoEncontrado.hidden = true;

        	// torna flag "true" para encerrar o uso da câmera do dispositivo
          	flag = true;
          	
          	// ativação dos bots
          	AtivarBots(code.data);
          	
          	// Redirecionamento da Página
          	window.location.href = code.data;
        } 

        // qr code não encontrado
        else {

        	// exibe mensagem dizendo de que não foi encontrado QR Code
        	mensagemQRCodeNaoEncontrado.hidden = false;
        }
  	}

  	// atualiza a reprodução do vídeo com um novo frame capturado
  	if (!flag) { requestAnimationFrame(tick); }
  	
  	// dispositivo não possui câmera a ser usada
  	else { 		      		
  		track.stop();
  		console.log(track);
  		track.readyState = "live";

  		video.remove();

  		mensagemAtivarCamera.innerText = "🎥 Unable to access video stream (please make sure you have a webcam enabled)";
  		mensagemAtivarCamera.hidden = false;
  		botaoLigarCamera.hidden = false;
    	elementoCanvas.hidden = true;
    	botaoDesligarCamera.hidden = true;
    	outputContainer.hidden = true;
  	}
}