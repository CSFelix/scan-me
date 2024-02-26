// navegador não suporta notificação
if (!('Notification') in window) { console.log("Notificações não suportadas pelo navegador / Notifications not supported by this browser"); }

// navegador suporta
else {
	
	// usuário não escolheu o tipo de permissão
	if (Notification.permission === 'default') { Notification.requestPermission(); }
}