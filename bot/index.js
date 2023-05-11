const {Telegraf} = require('telegraf');
const axios = require('axios')

const bot = new Telegraf('5689007865:AAEvGL1IXtp-c12ws-P_Y9cnUTnLlnTthcA');
function esperar(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

bot.start(async(ctx)=>{
    await ctx.reply('Hola!!!')
    await ctx.reply('Como estas??')
    await ctx.reply(`Instrucciones del juego y pasos a seguir presionando: /comoJuego`)
})

bot.command('comoJuego',ctx=>{
    ctx.reply(`
El killer es un juego de azar donde cargara el nombre de los participantes y se iran eliminando de a uno a medida que avanza el juego. La eliminacion sera a modo de asesinato, en donde se ejemplificara la manera en la que el asesino mato a su victima, como vestia y en donde fue.

Para iniciar el juego debera correr el juego debera presionar el comando /iniciar.

Para ver las armas que se podran utilizar en el juego presione el comando /armas.

Para ver los disfraces que se podran utilizar en el juego presione el comando /disfraces.

Para ver los lugares en donde trascurrira el juego presione el comando /lugares.`)
})

bot.command('armas', async ctx=>{
    await ctx.reply("Las armas son:")
    axios.get("http://localhost:3001/gun")
    .then(data=>{
        let response= '';
        for (let i = 0; i < data.data.length; i++) {
            response = '\n' + data.data[i] + response;
        }
        ctx.reply(response)
    })
})

bot.command('disfraces',async ctx=>{
    await ctx.reply("Las disfraces son:")
    axios.get("http://localhost:3001/costume")
    .then(data=>{
        let response= '';
        for (let i = 0; i < data.data.length; i++) {
            response = '\n' + data.data[i] + response;
        }
        ctx.reply(response)
    })
})

bot.command('lugares',async ctx=>{
    await ctx.reply("Las lugares son:")
    axios.get("http://localhost:3001/place")
    .then(data=>{
        let response= '';
        for (let i = 0; i < data.data.length; i++) {
            response = '\n' + data.data[i] + response;
        }
        ctx.reply(response)
    })
})

bot.command('iniciar', async ctx=>{
    await ctx.reply(`
Para iniciar el juego debe indicarme los participantes.

Como lo hara? Va a copiar el mensaje proximo al que esta leyendo y por debajo de ello va a ingresar los nombres de los participantes separados por enter.
`)
    ctx.reply("<INGRESO DE JUGADORES>")
})

bot.hears(/<INGRESO DE JUGADORES>/, async ctx=>{
    const  jugadores =  ctx.message.text.split("<INGRESO DE JUGADORES>")[1].split("\n")
    jugadores.shift()
    try {
        const response = await axios.post("http://localhost:3001/player", {jugadores:jugadores, id_player:ctx.from.id})
        await ctx.reply(`Jugadores cargados de manera correcta.`)
        await ctx.reply(`
A continuacion se van a ir enviando mensajes en donde indicara los detalles del asesinato.

En el momento que escribas el comando /next se ejecutara la primera muerte. Para que siga la segunda, tercera y asi deberas ejecturalo cada vez que quieras que haya una muerte.
`)
    } catch (error) {
        ctx.reply("Error al cargarlos")
    }    
})

bot.command('next', async ctx=>{
    await axios.get("http://localhost:3001/all")
    .then(async data=>{
        let prov = [ "si", "si", "si","si", "no"]
        let costumes= [];
        let guns =[];
        let place = [];
        let players =[];
        for (let i = 0; i < data.data.length; i++) {
            if(data.data[i].hasOwnProperty("costumes")){
                for (let j = 0; j < data.data[i].costumes.length; j++) {
                    costumes.push(data.data[i].costumes[j])
                }
            }
            if(data.data[i].hasOwnProperty("guns")){
                for (let j = 0; j < data.data[i].guns.length; j++) {
                    guns.push(data.data[i].guns[j])
                }
            }
            if(data.data[i].hasOwnProperty("place")){
                for (let j = 0; j < data.data[i].place.length; j++) {
                    place.push(data.data[i].place[j])
                }
            }
            if(data.data[i].hasOwnProperty("players")){
                for (let j = 0; j < data.data[i].players.length; j++) {
                    // players = '\n' + data.data[i].players[j] + players;
                    players.push(data.data[i].players[j])
                }
            }
        }
        let i_asesino =' ';
        let i_muerto =' ';
        let i_guns ='';
        let i_costumes = '';
        let i_place = '';
        let jugando = '';
        while(i_asesino == i_muerto){
                i_asesino = Math.floor(Math.random() * players.length);
                i_muerto = Math.floor(Math.random() * players.length);
            }
            killed =  Math.floor(Math.random() * prov.length);
            i_guns = Math.floor(Math.random() * guns.length);
            i_costumes = Math.floor(Math.random() * costumes.length);
            i_place = Math.floor(Math.random() * place.length);
            if(prov[killed] == "si"){
                await ctx.reply(`${players[i_muerto]} fue asesinado/a por ${players[i_asesino]}.
            
${players[i_asesino]} vestia de ${costumes[i_costumes]} y logro matar a ${players[i_muerto]} atacandolo/a con ${guns[i_guns]} en ${place[i_place]}.
            
Dejando a ${players[i_muerto]} FUERA DE JUEGO `)
            players = players.filter((p)=> p!=players[i_muerto])
            }else{
                await ctx.reply(`${players[i_asesino]} no pudo asesinar con ${guns[i_guns]} a ${players[i_muerto]}.
            
${players[i_asesino]} vestia de ${costumes[i_costumes]}, pero ${players[i_muerto]} logro identificarlo/a y pudo salir corriendo de ${place[i_place]} con vida.`)
            }
            
            if(players.length == 1){
                await ctx.reply(`EL GANADOR ES: ${players[0]}`)
                await ctx.reply(`Para finalizar el juego y poder jugar con distintas personas precione /reiniciar`)
            }
            else{
                for (let i = 0; i < players.length; i++) {
                    jugando = '\n' + players[i] + jugando
                }
                await ctx.reply(`Siguen vivos: ${jugando}`)
                await ctx.reply('Para la siguiente presione /next')
                await axios.put("http://localhost:3001/player/update", {jugadores:players, id_player:ctx.from.id} )
            }

        
        })
    })
    
    bot.command('reiniciar', ctx=>{
        axios.delete(`http://localhost:3001/player/delete/${ctx.from.id}`)
        ctx.reply('Para iniciar un nuevo juego presione /iniciar')
    })
    
    
    bot.launch()