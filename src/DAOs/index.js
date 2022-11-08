import MongoDbDAOchat from "./chat/MongoDb.js";
import NormalizerDAOchat from "./chat/Normalizer.js";


export const chatDbDAO = new MongoDbDAOchat ();
export const chatNormalizerDAO = new NormalizerDAOchat();
