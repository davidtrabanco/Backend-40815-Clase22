import {prodController} from "../controller/products.js";
import {chatController} from "../controller/chat.js";
import {getDate} from "../lib/getDate.js";

export const initWebSocket = (io) =>{

    io.on("connection", async (socket)=>{
        console.log(`New user connected ID:${socket.id}`);

        //NEW CONNECTION
        socket.emit("productsList", await prodController.getAll())
        socket.emit( "chatMsg", await chatController.getAll())


        //NEW PRODUCT
        socket.on( "newProduct", async (product) =>{
            await prodController.add(product);
            io.sockets.emit("productsList", await prodController.getAll())
        } )


        //FILTER PROD
        socket.on("filterProd", async (filterParams)=>{
            socket.emit("productsList", await prodController.filter(filterParams))
        });

        
        //NEW MSG
        socket.on( 'newChatMsg', (msg)=>{
            msg.date = getDate();
            chatController.addMsg(msg);
            io.sockets.emit( "newMessage",[msg])
        });
    })



}