import MongoDBManager from "../../models/mongoDBManager.js"
import {mongoDbCredential} from "../../config/dbConnections.js"

//MongoDB:
const schema = { 
    author: {
        email: {type: String},
        name: {type: String},
        lastname: {type: String},
        age: {type: String},
        nickname: {type: String },
        avatar: {type: String}
    },
    text : {type: String},
};

const urlConnection = `mongodb+srv://${mongoDbCredential.user}:${mongoDbCredential.password}@cluster0.zbawm.mongodb.net/${'chatMessages'}`;

const collection = 'messages';

export default class MongoDbDAOchat extends MongoDBManager{
    constructor(){
        super(urlConnection, collection, schema)
    }
}

