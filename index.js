const TelegramApi = require('node-telegram-bot-api');

const token = '6421815259:AAGC4Ar0gJWZ2xLE-MCkXAHckqr1Hesgov8';

const bot = new TelegramApi(token, {polling: true});

const chats ={};

const {gameOptions, againOptions} = require('./options');

const images= ['https://tlgrm.ru/_/stickers/bcc/c12/bccc1287-c51b-3e8b-bbf4-f6d78193c2d2/10.webp',
    'https://tlgrm.ru/_/stickers/bcc/c12/bccc1287-c51b-3e8b-bbf4-f6d78193c2d2/6.webp',
    'https://tlgrm.ru/_/stickers/bcc/c12/bccc1287-c51b-3e8b-bbf4-f6d78193c2d2/1.webp',
    'https://tlgrm.ru/_/stickers/bcc/c12/bccc1287-c51b-3e8b-bbf4-f6d78193c2d2/18.webp',
    'https://tlgrm.ru/_/stickers/bcc/c12/bccc1287-c51b-3e8b-bbf4-f6d78193c2d2/25.webp',
    'https://tlgrm.ru/_/stickers/bcc/c12/bccc1287-c51b-3e8b-bbf4-f6d78193c2d2/34.webp',
    'https://tlgrm.ru/_/stickers/5a8/1da/5a81da0b-bb92-4fd5-936e-ffeac7512b76/5.webp',
    'https://tlgrm.ru/_/stickers/5a8/1da/5a81da0b-bb92-4fd5-936e-ffeac7512b76/8.webp',
    'https://tlgrm.ru/_/stickers/c07/6b9/c076b9ea-9aa1-36ed-8187-04466f3b00ba/5.webp',
    'https://tlgrm.ru/_/stickers/c07/6b9/c076b9ea-9aa1-36ed-8187-04466f3b00ba/32.webp',
    'https://tlgrm.ru/_/stickers/5ed/9f6/5ed9f6e8-6a72-3133-8b99-b0ad772033b2/2.webp',
    'https://tlgrm.ru/_/stickers/5ed/9f6/5ed9f6e8-6a72-3133-8b99-b0ad772033b2/5.webp',
    'https://tlgrm.ru/_/stickers/5ed/9f6/5ed9f6e8-6a72-3133-8b99-b0ad772033b2/3.webp'
]


const randomSupport = ['Удачи тебе сегодня! Я знаю, что у тебя все получится',
    'Не переживай! Ты справишься',
    'Мысленно отправляю тебе положительные флюиды...',
    'Стремись к прогрессу, а не к совершенству',
    'Пока мы дышим, все можно исправить',
    'На самом деле жизнь проста, но мы настойчиво ее усложняем. -Конфуций',
    'Есть только один способ избежать критики: ничего не делайте, ничего не говорите и будьте никем. -Аристотель',
    'Всем великим переменам предшествует хаос. Д.Чопра',
    'Если проблема решается деньгами, то это не проблема, а расходы.',
    'Зачем волноваться и переживать, если можно не волноваться и не переживать?',
    'Мыслить позитивно — дело нелегкое. Гораздо легче — мыслить негативно.-Эрленд Лу',
    'Время, потерянное с удовольствием, не считается потерянным.-Джон Леннон',
    'Веди себя так, будто ты уже счастлив, и ты действительно станешь счастливее.',
    'Все паршиво... но нужно иногда находить повод для улыбки!-Г.Хаус',
    'Нельзя всегда получать всё, что хочешь, но если попробовать, то окажется, что иногда можно. -Г.Хаус',

];

const startGame = async (chatId)=> {

    await bot.sendMessage(chatId, `Итак! я загадаю число от 0 до 9, а ты попробуешь угадать его `)
    const randomNumber = Math.floor(Math.random() * 10)
    chats[chatId]= randomNumber;
    await bot.sendMessage(chatId, 'Да начнется игра...', gameOptions);
}

const start =()=> {





    bot.setMyCommands([
        {command: '/start', description:'Приветствие'},
        {command: '/info', description: 'Информация о пользователе'},
        {command: '/support', description: 'Найду слова,чтобы сделать твой день лучше'},
        {command: '/game', description: 'Испытый удачу, сыграй в игру'}
    ])

    bot.on('message',  async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;

        if(text ==='/start') {
            await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/c07/6b9/c076b9ea-9aa1-36ed-8187-04466f3b00ba/52.webp')
            return  bot.sendMessage(chatId, `Привет! Рад видеть тебя! Посмотри что я могу в панели управления:)`)
        }
        if(text === '/info'){
            await  bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/c07/6b9/c076b9ea-9aa1-36ed-8187-04466f3b00ba/51.webp')
            await  bot.sendMessage(chatId, `Меня зовут бот-ммм, а тебя ${msg.from.first_name} ${msg.from.last_name}`)
            return  bot.sendMessage(chatId, 'Приятно познакомиться')
        }
        if(text === '/game'){
            return startGame(chatId)

        }
        if(text === '/support'){
            const randPic= Math.floor(Math.random() * images.length)
            const rand = Math.floor(Math.random() * randomSupport.length)
            await bot.sendSticker(chatId, `${images[randPic]}`)
            return bot.sendMessage(chatId, `${randomSupport[rand]}`)
        }
        return bot.sendMessage(chatId, `${msg.from.first_name} я тебя не понимаю, попробуй еще раз`)
    })
    bot.on('callback_query', async msg => {

        const data = msg.data;
        const chatId = msg.message.chat.id;
        if(data === '/again'){
           return startGame(chatId)
        }
        if(data == chats[chatId]){
            await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/89b/055/89b05531-e12c-36dd-86ab-d7301005406f/2.webp')
              return bot.sendMessage(chatId, `Ура!Поздравляю ты угадал число ${chats[chatId]}`, againOptions)
        } else {
            return bot.sendMessage(chatId, `К сожалению, ты не угадал, бот загадал число ${chats[chatId]}`, againOptions)

        }


    })


}

start();