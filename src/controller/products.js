import {contenedor} from "./Contenedor.js";

export const prodController = {};

prodController.getAll = () =>{
    const products = contenedor.getAll();
    const prodFound = products.length > 0 ? true : false;
    
    return { productsList: products, prodFound: prodFound }
}

prodController.add = (product) =>{
    contenedor.save(product);
}
