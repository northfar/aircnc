
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');
const path = require('path');

const http = require('http');
const socketio = require('socket.io');

const app = express();
const server = http.Server(app);
const io = socketio(server);

const connectedUsers = {};

mongoose.connect('mongodb+srv://northon:ndmlf918@omnistack-ycjsr.mongodb.net/semana09?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

io.on('connection', socket => {
    const {user_id} = socket.handshake.query;
   
    connectedUsers[user_id] = socket.id;
 });
 


app.use((req, res, next) => {
    req.io = io;
    req.connectedUsers = connectedUsers;
    return next();
});

//req.query = acessar query params (filtros)
//req.params = acessar route params (edit. delete)
//req.body = acessar corpo da requisição (create, edit)

app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname,'..','uploads')));
app.use(routes);


server.listen(3333);