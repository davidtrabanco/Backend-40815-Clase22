import {schema} from "normalizr";
import NormalizerManager from "../../models/normalizrManager.js";

//defino los esquemas:
const authorSchema = new schema.Entity("author",{}, {idAttribute: 'email'})

const messageSchema = new schema.Entity("message", {
    author: authorSchema
}, {idAttribute: '_id'})

const messagesSchema = new schema.Entity("messages", {
    messages: [messageSchema],
})

export default class NormalizerDAOchat extends NormalizerManager{
    constructor(){
        super(messagesSchema)
    }
}

