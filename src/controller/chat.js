import dbManager from "../models/dbManager.js";
import {dbChatConfig} from "../config/dbConnections.js";

//Defino la estructura de la tabla:
const tableStructure = (table) => {
    table.increments('id').primary();
    table.string('email', 64);
    table.string('message', 256);
    table.string('date', 16);
}

//creo el controlador de la tabla
const tableChat = new dbManager(dbChatConfig, "chatHistoric", tableStructure)

let chatBuffer = await tableChat.retrieveAllRecords();

export const chatController = {};

chatController.getAll = () =>{
    return chatBuffer;
}

chatController.addMsg =  (msg) =>{
    chatBuffer.push(msg);
    tableChat.insertRecord(msg);
}