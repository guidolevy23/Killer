const axios = require('axios')

const getArmas = async ()=>{
    const response = await axios.get("http://localhost:3001/gun")
    .then(data=>{
        let response= '';
        for (let i = 0; i < data.data.length; i++) {
            response = '\n' + data.data[i] + response;
        }
        console.log(response)
        return response
    })
    return response
}

const getDisfraces = ()=>{
    const response = axios.get("http://localhost:3001/costume")
    .then(data=>{
        let response= '';
        for (let i = 0; i < data.data.length; i++) {
            response = '\n' + data.data[i] + response;
        }
        return response
    })
    return response
}
const getLugares = ()=>{
    const response = axios.get("http://localhost:3001/place")
        .then(data=>{
            let response= '';
            for (let i = 0; i < data.data.length; i++) {
                response = '\n' + data.data[i] + response;
            }
            return response
        })
        return response
}

const cargarJugadores = async(ctx)=>{
    const  jugadores =  ctx.message.text.split("<INGRESO DE JUGADORES>")[1].split("\n")
    jugadores.shift()
    try{
        await axios.post("http://localhost:3001/player", {jugadores:jugadores, id_player:ctx.from.id})
        return `Jugadores cargados de manera correcta.

A continuacion se van a ir enviando mensajes en donde indicara los detalles del asesinato.

En el momento que escribas el comando /next se ejecutara la primera muerte. Para que siga la segunda, tercera y asi deberas ejecturalo cada vez que quieras que haya una muerte.`
    }catch(error){
        return "Error al cargarlos"
    }

}

const next =async (ctx)=>{
    const response = await axios.get("http://localhost:3001/all")
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
            const muerto = players[i_muerto];
            const asesino = players[i_asesino];
            const disfraz =costumes[i_costumes]
            const lugar = place[i_place]
            const arma = guns[i_guns]
            if(prov[killed] == "si"){
                players = players.filter((p)=> p!=players[i_muerto])
                await axios.put("http://localhost:3001/player/update", {jugadores:players, id_player:ctx.from.id} )
                if(players.length == 1){
                    return `${muerto} fue asesinado/a por ${asesino}.
            
${asesino} vestia de ${disfraz} y logro matar a ${muerto} atacandolo/a con ${arma} en ${lugar}.
            
Dejando a ${muerto} FUERA DE JUEGO.

EL GANADOR ES: ${players[0]}.

Para finalizar el juego y poder jugar con distintas personas precione /reiniciar`
                }
                for (let i = 0; i < players.length; i++) {
                    jugando = '\n' + players[i] + jugando
                }
                return await ctx.reply(`${muerto} fue asesinado/a por ${asesino}.
            
${asesino} vestia de ${disfraz} y logro matar a ${muerto} atacandolo/a con ${arma} en ${lugar}.
            
Dejando a ${muerto} FUERA DE JUEGO.

Siguen vivos: ${jugando}

Para la siguiente presione /next
`)
            }else{
            
                return `${asesino} no pudo asesinar con ${arma} a ${muerto}.
            
${asesino} vestia de ${disfraz}, pero ${muerto} logro identificarlo/a y pudo salir corriendo de ${lugar} con vida.`
            }               
        })
        return response
}

const deleteGame =(ctx)=>{
    axios.delete(`http://localhost:3001/player/delete/${ctx.from.id}`)
}

const FUNCTIONS = {
    getArmas,
    getDisfraces,
    getLugares,
    deleteGame,
    cargarJugadores,
    next

}

module.exports = FUNCTIONS