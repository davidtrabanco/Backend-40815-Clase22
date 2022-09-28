import {prodController} from "../controller/products.js";
import {chatController} from "../controller/chat.js";

export const initWebSocket = (io) =>{

    io.on("connection", (socket)=>{
        console.log(`New user connected ID:${socket.id}`);

        //NEW CONNECTION
        socket.emit("productsList", prodController.getAll())
        socket.emit( "chatMsg", chatController.getAll())

        //NEW PRODUCT
        socket.on( "newProduct", (product) =>{
            prodController.add(product);
            io.sockets.emit("productsList", prodController.getAll())
        } )

        //NEW MSG
        socket.on( 'newChatMsg', (msg)=>{
            msg.date = `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`
            chatController.addMsg(msg);
            io.sockets.emit( "chatMsg",[msg])
        })
    })



}