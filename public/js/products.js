import {socket, getTemplate} from "./index.js";

socket.on("productsList", async (products) =>{
        const template = await getTemplate("productTemp.ejs")
        const htmlCode = ejs.render(template, products)
        document.querySelector(".product-list").innerHTML = htmlCode;
    })


// socket.on("productsList", async (products) =>{
//     const template = await getTemplate("productsTable.ejs")
//     const htmlCode = ejs.render(template, products)
//     document.querySelector(".product-list").innerHTML = htmlCode;
// })

// document.querySelector("#newProductFrom").addEventListener("submit", (e)=>{
//     e.preventDefault();

//     const product = {
//         title : document.getElementById("prod-name").value,
//         price : document.getElementById("prod-price").value,
//         thumbnail : document.getElementById("prod-img").value
//     }

//     socket.emit( "newProduct", product);

//     document.getElementById("prod-name").value="";
//     document.getElementById("prod-price").value="";
//     document.getElementById("prod-img").value="";
// })

// document.querySelector("#filterProducts").addEventListener("submit", (e)=>{
//     e.preventDefault();

//     const filter = {
//         column : document.getElementById("fColumn").value,
//         comparison : document.getElementById("fComparison").value,
//         value : document.getElementById("fValue").value
//     }

//     socket.emit("filterProd", filter);
// })