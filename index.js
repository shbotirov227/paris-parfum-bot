const TelegramApi = require("node-telegram-bot-api");
const { gameOptions, againOptions } = require("./options.js");
const token = "5102324238:AAGMTgK44v4leirGLLg4YcfbUD0LeJ_JYWo";

const bot = new TelegramApi(token, {polling: true});

const chats = {};



const startGame = async (chatId) => {
	await bot.sendMessage(chatId, `0 - 10 gacha raqam tanlang !`)
    const randomNumber = Math.floor(Math.random() * 10);
    chats[chatId] = randomNumber;
	// console.log(chats[chatId]);
    await bot.sendMessage(chatId, "Tanlang", gameOptions)
}

const start = () => {

    bot.setMyCommands([
        {command: "/start", description: "Start"},
        {command: "/info", description: "Ma'lumot"},
        {command: "/game", description: "Ma'lumot"},
    ])

    bot.on("message", async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;

        if (text === "/start") {
            await bot.sendSticker(chatId, "https://tlgrm.ru/_/stickers/ccd/a8d/ccda8d5d-d492-4393-8bb7-e33f77c24907/1.jpg")
            await bot.sendMessage(chatId, "Assalomu alaykum, Paris Parfum telegram botiga hush kelibsiz !")
        }

        if (text === "/info") {
            await bot.sendMessage(chatId, `Sizning isminggiz ${msg.from.first_name} ${msg.from.last_name}`)
        }

        if (text === "/game") {
            return startGame(chatId);
        }
        return bot.sendMessage(chatId, "Men seni tushunmadim boshqatdan urinib ko'r")
    })

	bot.on("callback_query", async msg => {
		const data = msg.data;
		const chatId = msg.message.chat.id;

		if (data === "/again") {
			return startGame (chatId)
		}

		if (data === chats[chatId]) {
			return await bot.sendMessage(chatId, `Tabriklayman topdinggiz ${chats[chatId]}`, againOptions)
		} else {
			return await bot.sendMessage(chatId, `Afsuski topa olmadinggiz, bot ${chats[chatId]} raqamini o'ylagan edi`, againOptions)
		}

	})
}


start ();