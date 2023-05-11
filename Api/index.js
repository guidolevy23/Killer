const server = require('./src/app.js');
const {database} = require('./src/db.js');

server.listen(3001 , async () =>{
    await database.sync({alter:true})
    console.log("listening in port 3001");
})

