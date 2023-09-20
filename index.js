const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const PORT = process.env.PORT || 3000; // Use the provided PORT or default to 3000

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  socket.on('chat message', (data) => { // Receive both name and message
    console.log('message from ' + data.name + ': ' + data.message);
    io.emit('chat message', data); // Broadcast the name and message to all clients
  });
});


server.listen(PORT, () => {
  console.log(`Now listening @ http://localhost:${PORT}`);
});



