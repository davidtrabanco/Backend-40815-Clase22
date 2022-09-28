 let socket = io.connect();

const getTemplate = async (fileName) =>{
    const template = await fetch( "../templates/" + fileName)
    return await template.text();
}

//PRODUCTS --------------------------------------------------------------
socket.on("productsList", async (products) =>{
    const template = await getTemplate("productsTable.ejs")
    const htmlCode = ejs.render(template, products)
    document.querySelector(".product-list").innerHTML = htmlCode;
})

document.querySelector(".add-product").addEventListener("click", (e)=>{
    e.preventDefault();

    const product = {
        title : document.getElementById("prod-name").value,
        price : document.getElementById("prod-price").value,
        thumbnail : document.getElementById("prod-img").value
    }

    socket.emit( "newProduct", product);

    document.getElementById("prod-name").value="";
    document.getElementById("prod-price").value="";
    document.getElementById("prod-img").value="";
})

//CHAT --------------------------------------------------------------
socket.on( "chatMsg", async (messages) =>{
    const template = await getTemplate("chat.ejs")
    const htmlCode = ejs.render(await template, { messages: messages})
    document.querySelector('.messagesList').insertAdjacentHTML('beforeend', await htmlCode);
})

document.querySelector( ".chat-send").addEventListener("click", (e) =>{
    e.preventDefault();
    const msg = {
        email: document.getElementById("chat-email").value,
        msg: document.getElementById("chat-msg").value
    }
    socket.emit( "newChatMsg", msg)
    document.getElementById("chat-msg").value="";
})

