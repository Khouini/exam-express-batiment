const express = require('express');
const http = require("http");

const app = express();
const UserRouter = require('./routes/user');
const dbConfig = require('./config/db.json');
const {default: mongoose} = require('mongoose');
var path = require("path");

app.use(express.json());
app.use('/user', UserRouter);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "twig");

const server = http.createServer(app);
const io = require("socket.io")(server);

io.on("connection", (socket) => {
  console.log("User connected");
  socket.emit("msg", "A new user is connected");
  socket.on("typing", (data) => {
    socket.broadcast.emit("typing", data);
  });
  socket.on("msg", (data) => {
    console.log("d1" + data);
    //add(data);
    io.emit("msg", data);
  });
  socket.on("disconnect", () => {
    io.emit("msg", "An user is diconnected");
  });
});

async function main() {
    try {
        console.log('connecting to db');
        await mongoose.connect(dbConfig.url);
        console.log('db connected');
        server.listen(3000, () => {
            console.log('Server is listening on port 3000');
        });
    } catch (error) {
        console.log('🚀 ~ main ~ error:', error);
    }
}

main();
