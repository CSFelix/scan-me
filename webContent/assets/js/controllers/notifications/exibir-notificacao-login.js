function ExibirNotificacao(titulo, texto) {
	
	// verificar se o navegador tem permissão de enviar notificações
	if (Notification.permission === 'granted') {
		const logo = 'images/logos/icone-padrao.png';
		var notification = new Notification(titulo, { body: texto, icon: logo });
	}
}