const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const http = require('http');
const { Server } = require('socket.io');
const AuthRoute = require('./Routes/AuthRoute');
const AppointmentRoute = require('./Routes/AppointmentRoute');
const SpecializationRoute = require('./Routes/SpecializationRoute');
const RoomRoute = require('./Routes/RoomRoute');
const MessageRoute = require('./Routes/MessageRoute');

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());

const server = http.createServer(app).listen(4250, () => {
    console.log('Server start at port 4250...');
});

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET, POST']
    }
});

io.on('connection', (socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on('join_room', (data) => {
        socket.join(data);
        console.log(`User with id: ${socket.id} join room ${data}`);
    });

    socket.on('send_message', (data) => {
        socket.to(data.room).emit('recieve_message', data);
        console.log(`user with id: ${data.id} send ${data.message} to ${data.room}`);
        console.log(data);
    });

    socket.on('disconnect', () => {
        console.log('User Disconnected', socket.id);
    });
});


mongoose.connect('mongodb://localhost/medicalcenters', {
    useNewUrlParser: true, useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to DataBase...');
}).catch((err) => {
    console.log(err.message);
});

app.use('/api/', AuthRoute);
app.use('/api/', AppointmentRoute);
app.use('/api/', SpecializationRoute);
app.use('/api/', RoomRoute);
app.use('/api/', MessageRoute);