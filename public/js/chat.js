import {socket, getTemplate} from "./index.js";

const addMessageToDom = async (arrayMsjs) => {
    const template = await getTemplate('chatTemp.ejs');
    const htmlCode = ejs.render( await template,  {messages: arrayMsjs});
    document.querySelector('.messagesList').insertAdjacentHTML('beforeend', htmlCode);
}


//HISTORIAL de CHAT
socket.on('chatMsg', dataNormalized =>{ 
    const chatNormalized = dataNormalized.dataNormalized;
    const compressionRate = dataNormalized.compressionRate;

    //Muestro el rate de comprensión:
    document.getElementById('msgTitle').append(`Mensajes (compresión por Normalizr: ${compressionRate}%)`)

    //defino los esquemas:
    const authorSchema = new normalizr.schema.Entity("author",{}, {idAttribute: 'email'})
    const messageSchema = new normalizr.schema.Entity("message", {author: authorSchema}, {idAttribute: '_id'})
    const messagesSchema = new normalizr.schema.Entity("messages", {messages: [messageSchema],})

    //DENORMALIZO
    const chat = normalizr.denormalize(chatNormalized.result, messagesSchema, chatNormalized.entities);

    //nuevo array con el contenido de "_doc":
    const messages = chat.messages.map( message => message._doc);

    //Agrego los mensjaes
    addMessageToDom( messages );
});

//NUEVO MENSAJE
socket.on('newMessage', arrayMsj =>{
    addMessageToDom( arrayMsj );
});


//LISTENER ENVIAR MENSAJE
document.querySelector('#sendMessageForm').addEventListener('submit', (e)=>{
    e.preventDefault();
    //creo el objeto

    const objMessage = { 
        author: {
            email: document.getElementById('msj.email').value,
            name: document.getElementById('msj.name').value,
            lastname: document.getElementById('msj.lastname').value,
            age: document.getElementById('msj.age').value,
            nickname: document.getElementById('msj.nickname').value,
            avatar: document.getElementById('msj.avatar').value,
        },
        text : document.getElementById('msj.message').value,
    };

    //envío el objeto
    socket.emit('newChatMsg', objMessage);

    //elimino el mensaje del textbox y hago foco:
    document.getElementById('msj.message').value="";
    document.getElementById('msj.message').focus();
});

