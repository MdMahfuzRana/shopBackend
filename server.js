const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { ragister } = require('./Controllers/UserRagistration');
const { UserSignIn } = require('./Controllers/UserSignIn');
const { dbconfig } = require('./Db/Config');
const Auth = require('./Controllers/Auth');
const { Server } = require("socket.io");
const { search } = require('./Controllers/ProductSearch');
const app = express();
const port = process.env.PORT || 8080;
const server = require('http').createServer(app);
const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });


app.use(cors());
app.use(express.json());  // for parsing application/json


dbconfig()


io.on('connection', (socket) => {
    console.log('new client connected');
    socket.on('ow',(data)=>{
        console.log(data)
    })
    socket.on('user',(data)=>{
        console.log(data)
    })
    socket.on('search',(value)=>{
        search(value)
        .then(res=>{
            socket.emit('result',res)
        })
        .catch(err=>{
            socket.emit('error',err)
        })
    })
});

app.get('/',(req, res) => {
    res.send('Hello World!');
});
app.post('/authUser',Auth,(req, res) =>{
    res.status(200).send(req.user);
})
app.post('/userRegistration',ragister)
app.post('/login',UserSignIn) 



server.listen(port, () => {
    console.log('server listening on port ' + port);
});

