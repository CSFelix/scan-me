/* 
	***************
	*** Módulos ***
	***************

	********************
	*** Initializing ***
	********************

	- npm init

	****************
	*** Packages ***
	****************

	- Express: npm install express
	- Neo4J: npm install neo4j-driver
	- Venom: npm i --save venom-bot
	- Telegram bot: yarn add node-telegram-bot-api
*/
const express = require('express');
const neo4j = require('neo4j-driver');
const venom = require('venom-bot');
const TelegramBot = require('node-telegram-bot-api');

var app = express();
var driver = neo4j.driver('bolt://localhost', neo4j.auth.basic('---', '---'));
var session = driver.session();

var whatsapp_bot;
var telegram_bot;

/*
	********************
	*** WhatsApp Bot ***
	******************** 
*/
const sessions = ['scanme-whats-bot'];

venom.create(
		sessions[0],
    	(base64Qr, asciiQR, attempts, urlCode) => { console.log("\n" + asciiQR + "\n"); },
   		undefined,
    	{ logQR: false }
	)
	.then((client) => { whatsapp_bot = client; })
	.catch((error) => { console.log(error); });

function sendMessageWhatsApp(client_whats) {

	// Send 'Hello' and Product's Datas
	setTimeout(() => {
		client_whats.sendText(`${comprador.numero_whatsapp}@c.us`, `${mensagens.mensagem1}`);
	}, 3000);

	setTimeout(() => {
		client_whats.sendText(`${comprador.numero_whatsapp}@c.us`, `${mensagens.mensagem2}`); 
	}, 6000);

	// Send Seller's Datas
	setTimeout(() => {
		client_whats.sendText(`${comprador.numero_whatsapp}@c.us`, `${mensagens.mensagem3}`);
		
		// cartão de contato do whatsapp é enviado somente se
		// divulgador possui um número do whatsapp cadastrado
		if (divulgador.numero_whatsapp != '') {
			client_whats.sendContactVcard(`${comprador.numero_whatsapp}@c.us`, `${divulgador.numero_whatsapp}@c.us`, `${divulgador.nickname}`);
		}
	}, 9000);

	// Send "Good Bye"
	setTimeout(() => {
		client_whats.sendText(`${comprador.numero_whatsapp}@c.us`, `${mensagens.mensagem4}`);
	}, 12000);
}

/*
	********************
	*** Telegram Bot ***
	******************** 
*/
const token = '---';
telegram_bot = new TelegramBot(token, { polling: true });

telegram_bot.on('message', function (msg) {
    const chatId = msg.chat.id;
    
    if (msg.text === 'my id') { 
        telegram_bot.sendMessage(chatId, 'Your id: ' + msg.from.id); 
        console.log(msg, chatId);
        console.log('\n\n\n');
    }
});

function sendMessageTelegram(client_telegram) {
	
	setTimeout(() => {
		client_telegram.sendMessage(comprador.id_telegram, mensagens.mensagem1); 
	}, 3000);

	setTimeout(() => {
		client_telegram.sendMessage(comprador.id_telegram, mensagens.mensagem2); 
	}, 6000);

	setTimeout(() => {
		client_telegram.sendMessage(comprador.id_telegram, mensagens.mensagem3); 
	}, 9000);

	setTimeout(() => {
		client_telegram.sendMessage(comprador.id_telegram, mensagens.mensagem4); 
	}, 12000);
}

/*
	*************
	*** Rotas ***
	*************
*/
app.get('/whatsapp_bot', function(req, res) {
	comprador.uuid = req.query.comprador_uuid;
	produto.uuid = req.query.produto_uuid;
	configuracoes.idioma = req.query.idioma;

	AtivarBots(whatsapp_bot, telegram_bot);
	res.end('Done');
});

/*	
	***************
	*** Objetos ***
	***************
*/

var configuracoes = { idioma: '' }

var comprador = {
	uuid: '',
	nickname: '',
	numero_telegram: '',
	id_telegram: '',
	numero_whatsapp: ''
};

var divulgador = {
	nickname: '',
	email: '',
	numero_telegram: '',
	numero_whatsapp: ''
};

var produto = {
	uuid: '',
	nome: '',
	tipoPrincipal: '',
	descricao: '',
	estoque: '',
	moeda: '',
	preco: '',
	link: ''
};

var mensagens = {
	mensagem1: '',
	mensagem2: '',
	mensagem3: '',
	mensagem4: ''
}

/*
	*************************************
	*** Transformação das Informações ***
	*************************************
*/
function TransformarNumero(numero) { 
	
	// Caso usuário ter o número cadastrado
	// é adicionado os dígitos 55 no começo
	if (numero != '') { return '55' + numero; }

	// Caso contrário, é retornado o número em branco
	else { return numero; }
}

function TransformarMoeda(codigoMoeda) { return (codigoMoeda === '1') ? 'R$' : 'U$'; }

function TransformarTipoPrincipal(tipo) {
	switch (tipo) {
		case '1': return 'Doces';
		case '2': return 'Salgados';
		case '3': return 'Outros Alimentos';
		case '4': return 'Celulares';
		case '5': return 'Informática';

		case '6': return 'Games';
		case '7': return 'Livros';
		case '8': return 'Mangás';
		case '9': return 'Brinquedos';
		case '10': return 'Decoração';

		case '11': return 'Roupas';
		case '12': return 'Perfumaria';
		case '13': return 'Eletrodomésticos';
		case '14': return 'Móveis';
		case '15': return 'Empresariais';

		case '16': return 'Carros';
		case '17': return 'Motos';
		case '18': return 'Caminhões';
		case '19': return 'Caminhonetes';
		default: return 'Outros';
	}
}

function TransformarMensagem(mensagens) {

	// idioma Português Brasileiro
	if (configuracoes.idioma == '1') {
		mensagens.mensagem1 = `👋 Olá *${comprador.nickname}*, tudo bem? Estamos muito felizes por estar usando o _ScanMe_. Segue as informações do produto escaneado:`;
		mensagens.mensagem2 = `📦 Produto: *${produto.nome} - ${produto.tipoPrincipal}* 📦\nPreço: _${produto.moeda} ${produto.preco}_\n${produto.descricao}\nMais detalhes aqui: ${produto.link}`;
		mensagens.mensagem3 = `🏪 Divulgador: *${divulgador.nickname}* 🏪\nE-Mail: _${divulgador.email}_\nWhatsApp: _${divulgador.numero_whatsapp}_\nTelegram: _${divulgador.numero_telegram}_`;
		mensagens.mensagem4 = `☺️ A equipe _ScanMe_ agrade a preferência!`;
	}

	// idioma Inglês Americano
	else {
		mensagens.mensagem1 = `👋 What's up *${comprador.nickname}*, how's it going? We are so glad to you be using _ScanMe_. These are the information about the scanned product:`;
		mensagens.mensagem2 = `📦 Product: *${produto.nome} - ${produto.tipoPrincipal}* 📦\nPrice: _${produto.moeda} ${produto.preco}_\n${produto.descricao}\nMore infos: ${produto.link}`;
		mensagens.mensagem3 = `🏪 Promoter: *${divulgador.nickname}* 🏪\nE-Mail: _${divulgador.email}_\nWhatsApp: _${divulgador.numero_whatsapp}_\nTelegram: _${divulgador.numero_telegram}_`;
		mensagens.mensagem4 = `☺️ From _ScanMe_ Team!`;
	}
}

/* 
	**************************
	*** Exibição dos Dados ***
	**************************
*/
function ExibirComprador(usuario) {
	console.log('Nickname: ', usuario.nickname);
	console.log('Telegram: ', usuario.numero_telegram);
	console.log('Id Telegram: ', usuario.id_telegram);
	console.log('WhatsApp: ', usuario.numero_whatsapp);
	console.log('\n');
}

function ExibirDivulgador(usuario) {
	console.log('Nickname: ', usuario.nickname);
	console.log('Email: ', usuario.email);
	console.log('Telegram: ', usuario.numero_telegram);
	console.log('WhatsApp: ', usuario.numero_whatsapp);
	console.log('\n');
}

function ExibirProduto(mercadoria) {
	console.log('Nome: ', mercadoria.nome);
	console.log('Descrição: ', mercadoria.descricao);
	console.log('Tipo Principal: ', mercadoria.tipoPrincipal);
	console.log('Estoque: ', mercadoria.estoque);
	console.log('Moeda: ', mercadoria.moeda);
	console.log('Preço: ', mercadoria.preco);
	console.log('\n');
}

/* 
	*****************************
	*** Busca das Informações ***
	*****************************
*/
function AtivarBots(client_whats, client_telegram) {
	session
		.run('MATCH (n:Usuario {uuid_usuario: $comprador_uuid})'
	       + ' WITH n'
	       + ' MATCH (o:Produto {uuid: $produto_uuid}) <-[:Cadastrou]- (m:Usuario)'
		   + ' RETURN n, m, o',
			{comprador_uuid: comprador.uuid, produto_uuid: produto.uuid})
		.then(function(result) {
			result.records.forEach(function(record) {

				// Dados Comprador
				comprador.nickname         =   record._fields[0].properties.nickname;
				comprador.numero_telegram  =   TransformarNumero(record._fields[0].properties.numero_telegram);
				comprador.id_telegram      =   record._fields[0].properties.id_telegram;
				comprador.numero_whatsapp  =   TransformarNumero(record._fields[0].properties.numero_whatsapp);

				// Dados Divulgador
				divulgador.nickname        =   record._fields[1].properties.nickname;
				divulgador.email           =   record._fields[1].properties.email;
				divulgador.numero_telegram =   TransformarNumero(record._fields[1].properties.numero_telegram);
				divulgador.numero_whatsapp =   TransformarNumero(record._fields[1].properties.numero_whatsapp);

				// Dados Produto
				produto.nome               =   record._fields[2].properties.nome;
				produto.tipoPrincipal      =   TransformarTipoPrincipal(record._fields[2].properties.tipoPrincipal);
				produto.descricao          =   record._fields[2].properties.descricao;
				produto.estoque            =   record._fields[2].properties.estoque;
				produto.moeda              =   TransformarMoeda(record._fields[2].properties.moeda);
				produto.preco              =   record._fields[2].properties.preco;
				produto.link               =   'http://localhost:8080/Scan-Me/visualizar-produto.jsp?uuid-produto=' + produto.uuid + '&idioma=' + configuracoes.idioma;

				/* Exibição das Informações */
				ExibirComprador(comprador);
				ExibirDivulgador(divulgador);
				ExibirProduto(produto);
				console.log('\n\n----\n\n');

				/* Escolha do Idioma das Mensagens */
				TransformarMensagem(mensagens);

				/* Checagem se Comprador tem WhatsApp ou Telegram */
				if (comprador.numero_whatsapp != '') { sendMessageWhatsApp(client_whats); }
				else { sendMessageTelegram(client_telegram); }
			});
		})
		.catch(function(error) { console.log(error); });
}

/* 
	*****************************
	*** Iniciação do Servidor ***
	*****************************
*/
app.listen(3000);
console.log('Server Started');