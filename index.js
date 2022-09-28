import express from "express";
import { Server as IOServer } from "socket.io";
import { Server as HttpServer } from "http";
import {initWebSocket} from "./src/routers/socket.js";

//Defino el servidor
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

//Servidor web sockets:
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
initWebSocket(io);

//Defino las rutas
app.use(express.static('./public'));

//Inicio el servidor:
const PORT = process.env.PORT || 8080
const server = httpServer.listen( PORT, ()=>{
    console.log(`Server UP on PORT:${server.address().port}`);
})



