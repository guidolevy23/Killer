const {Telegraf} = require('telegraf');
const axios = require('axios')
const MESSAGES = require('./messages.js')
const FUNCTIONS = require('./functions.js')
const bot = new Telegraf('5689007865:AAEvGL1IXtp-c12ws-P_Y9cnUTnLlnTthcA');
// const cloudinary = require('cloudinary').v2;

// // Configuration 
// cloudinary.config({
//     cloud_name: "di9meg3xu",
//     api_key: "346486911846515",
//     api_secret: "zBVk8tO79UcA4cSUY7h2pa-MpCU"
//   });
  
  
//   // Upload
  
//   const res = cloudinary.uploader.upload('./ladescon.jpeg', {public_id: "la_descon"})
  
//   res.then((data) => {
//     console.log(data);
//     console.log(data.secure_url);
//   }).catch((err) => {
//     console.log(err);
//   });
  
  
//   // Generate 
//   const url = cloudinary.url("la_descon", {
//     width: 100,
//     height: 150,
//     Crop: 'fill'
//   });
  
  
  
//   // The output url
//   console.log(url);


bot.start(async(ctx)=>{
    await ctx.reply('Hola!!!')
    await ctx.reply('Como estas??')
    await ctx.reply(`Instrucciones del juego y pasos a seguir presionando: /comoJuego`)
})

bot.command('comoJuego',ctx=>{ctx.reply(MESSAGES.instructions)})

bot.command('armas', async ctx=>{
    const response = await FUNCTIONS.getArmas();
    await ctx.reply(MESSAGES.armas);
    await ctx.reply(response)
})

bot.command('disfraces',async ctx=>{
    const response = await FUNCTIONS.getDisfraces();
    await ctx.reply(MESSAGES.disfraces)
    await ctx.reply(response)
})


bot.command('lugares',async ctx=>{
    const response = await FUNCTIONS.getDisfraces();
    await ctx.reply(MESSAGES.lugares);
    await ctx.reply(response)
})

bot.command('iniciar', async ctx=>{
    await ctx.reply(MESSAGES.iniciar)
    ctx.reply(MESSAGES.ingreso)
})

bot.hears(/<INGRESO DE JUGADORES>/, async ctx=>{
    const response = await FUNCTIONS.cargarJugadores(ctx)
    ctx.reply(response)
})

bot.command('next', async ctx=>{
    const response = await FUNCTIONS.next(ctx)
    ctx.reply(response)
})
    
bot.command('reiniciar', async ctx=>{
    FUNCTIONS.deleteGame(ctx)
    ctx.reply(MESSAGES.replay)
})

bot.hears(/la descon/,async ctx=>{
    try{
        const image = "https://res.cloudinary.com/di9meg3xu/image/upload/v1683772387/la_descon.jpg"
        await ctx.replyWithPhoto(image);
        await ctx.reply("AGUANTE LA DESCON WACHO")

    }catch(error){
        console.log(error)
    }
})

bot.launch()