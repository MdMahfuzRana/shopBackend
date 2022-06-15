const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { ragister } = require('./Controllers/UserRagistration');
const { UserSignIn } = require('./Controllers/UserSignIn');
const { dbconfig } = require('./Db/Config');
const Auth = require('./Controllers/Auth');
const { Server } = require("socket.io");
const { search } = require('./Controllers/ProductSearch');
const { getProducts } = require('./Controllers/FilterByPrice');
const Products = require('./Models/Products');
const app = express();
const port = process.env.PORT || 8080;
const server = require('http').createServer(app);
const io = new Server(server, {
    cors: {
      origin: "https://shopbackendd.herokuapp.com",
      methods: ["GET", "POST"],
      rejectUnauthorized: false
    },
  });


app.use(cors());
app.use(express.json());  // for parsing application/json


dbconfig()


io.on('connection', (socket) => {
    socket.on('ow',(data)=>{
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
    socket.on('page',(value)=>{
        var page = value;
        const limit = 2;
        const lastIndex = page * limit;
        const offset = (page - 1) * limit;
        Products.find()
        .then(res=>{
            if(!res)return;
            var allprodcts = res.slice(offset,lastIndex)
            socket.emit('result',allprodcts)
            const totalPage = Math.ceil(res.length/limit)
            const totalPgaeArr = Array.from(Array(totalPage).keys())
            socket.emit('totalPage',totalPgaeArr)
        })
        .catch(err=>{
            return console.log('found error',err);
        })

    })

    // socket.emit('products',allprodcts)
    // console.log(allprodcts)

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

