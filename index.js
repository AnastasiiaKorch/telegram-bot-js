const TelegramApi = require('node-telegram-bot-api');

const token = '6421815259:AAGC4Ar0gJWZ2xLE-MCkXAHckqr1Hesgov8';

const bot = new TelegramApi(token, {polling: true});

const chats={};

const {gameOptions, againOptions} = require('./options')



const startGame = async (chatId)=> {
    await bot.sendMessage(chatId, 'Сейчас я загадаю число от 0 до 9, а ты попробуй угадать его')
    const randomNumber = Math.floor(Math.random() * 10);
    chats[chatId] = randomNumber;
    await bot.sendMessage(chatId, 'Отгадай', gameOptions)
}



const start = ()=> {
    bot.setMyCommands([
        {command: '/start', description: 'Приветствие'},
        {command: '/game', description: 'Испытай удачу,попробуй угадать число'},
        {command: '/support', description: 'Генерация поддержки'},
        {command: '/listener', description: 'Выслушаю тебя'}
    ])

    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;
        console.log(msg)
        if(text === '/start'){
            await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/c07/6b9/c076b9ea-9aa1-36ed-8187-04466f3b00ba/52.webp');
            await bot.sendMessage(chatId, `Добро пожаловать в телеграм бот эмоциональной поддержки`);
            return bot.sendMessage(chatId,`${msg.from.first_name}, выбирай чем я могу тебе помочь` );
        }
        if(text === '/game'){
            return startGame(chatId);
        }

        if(text === '/support'){
            await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/8eb/10f/8eb10f4b-8f4f-4958-aa48-80e7af90470a/14.webp')
            return bot.sendMessage(chatId, `${msg.from.first_name} ты охуенна!`);
        }

        return bot.sendMessage(chatId, `${msg.from.first_name} я тебя не понял, попробуй снова`)
    })
    bot.on('callback_query', async msg => {
        const data = msg.data;
        const chatId= msg.message.chat.id;
        if(data === '/again'){
            return startGame(chatId)
        }
        if(data === chats[chatId]){
            return await bot.sendMessage(chatId,`Поздравляю ты угадал число ${chats[chatId]}`, againOptions)
        } else {
            return await bot.sendMessage(chatId,`К сожалению ты не угадал число, бот загадал ${chats[chatId]}`, againOptions)
        }





    } )
}

start();