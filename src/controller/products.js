import dbManager from "../models/MySQLmanager.js";
import {dbProductsConfig} from "../config/dbConnections.js";
import {getProductsFake} from "../models/fakerManager.js"

//Defino la estructura de la tabla:
const tableStructure = (table) => {
    table.increments('id').primary();
    table.string('title', 64).notNullable();
    table.float('price').notNullable();
    table.string('thumbnail');
}

//creo el controlador de la tabla
const tableProducts = new dbManager( dbProductsConfig, "products", tableStructure)

export const prodController = {};

prodController.getAll = async () =>{
    // const products = await tableProducts.retrieveAllRecords();
    // const prodFound = products.length > 0 ? true : false;
    // return { productsList: products, prodFound: prodFound }

    //OBTENGO DESDE FAKER:
    const products = await getProductsFake(5);
    const prodFound = products.length > 0 ? true : false;
    console.log( 'FAKER GENERADO');
    return { productsList:  products, prodFound: prodFound }
}

prodController.add = async (newProduct) =>{
    await tableProducts.insertRecord(newProduct);
}

prodController.filter = async (filter) =>{
    const products = await tableProducts.retrieveFilterRecords(filter.column, filter.comparison, filter.value)
    const prodFound = products.length > 0 ? true : false;
    
    return { productsList: products, prodFound: prodFound }
}
