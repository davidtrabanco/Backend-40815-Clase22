import {chatDbDAO} from "../DAOs/index.js"
import {chatNormalizerDAO} from "../DAOs/index.js"


let chatBuffer = await chatDbDAO.getDocuments();
console.log('Se obtuvo el historial de Chat desde DB');


export const chatController = {};

chatController.getAll = () =>{

    //creo el schema
    const chatSchema = {
        id: 'chat',
        messages: chatBuffer
    }

    //Normalizo
    const chatNormalized = chatNormalizerDAO.normalize( chatSchema )
    console.log('Se normalizo el chat');

    console.log(chatNormalized);
    return chatNormalized;
}

chatController.addMsg = (msg) =>{
    chatBuffer.push(msg);
    chatDbDAO.addDocument( msg ); //No utilizo await para no demorar la entrega de mensajes
}


