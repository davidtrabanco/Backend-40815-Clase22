import {chatStore} from "./FileManager.js";

export const chatController = {};

let chatBuffer = await chatStore.readFileJSON();

chatController.getAll = () =>{
    return chatBuffer;
}

chatController.addMsg =  (msg) =>{
    chatBuffer.push(msg);
    chatStore.writeFileJSON( chatBuffer )
}