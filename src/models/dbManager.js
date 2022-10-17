import knex from "knex";

export default class dbManager{
    constructor(knexConfig, tableName, structure) {
        this.dbKnex = knex(knexConfig);
        this.tableName = tableName;
        this.structure = structure;
        this.createTableIfNotExists();
    }

    createTableIfNotExists = async ()=> {
        const exists = await this.dbKnex.schema.hasTable(this.tableName)
        if(!exists) await this.createTable();
    }

    createTable = async()=>{
        try {
            await this.dbKnex.schema.createTable(this.tableName,this.structure)
            console.log(`Table: "${this.tableName}" was created successfully`);
            //this.dbKnex.destroy()
            return null;
        } catch (error) {
            console.error(`Create Table ERROR: ${error}`)
        }
    }

    insertRecord = async( object )=>{
        try {
            await this.dbKnex(this.tableName).insert(object)
            console.log(`Row was inserted into Table:${this.tableName}`)
            //this.dbKnex.destroy()
            return null;
        } catch (error) {
            console.error(`Insert a record into Table ERROR: ${error}`)
        }
    }

    retrieveAllRecords = async ()=>{
        try {
            const records = await this.dbKnex.from(this.tableName).select('*');
            //this.dbKnex.destroy()
            return Object.values(records);
        } catch (error) {
            console.error(`Retrieve All Records ERROR: ${error}`)
        }
    }

    retrieveFilterRecords = async (field, comparison, value)=>{
        try {
            const records = await this.dbKnex.from(this.tableName).where(field,comparison, value);
            //this.dbKnex.destroy()
            return Object.values(records);
        } catch (error) {
            console.error(`Retrieve All Records ERROR: ${error}`)
        }
    }
    
    deleteFilterRecords = async (field, comparison, value)=>{
        try {
            await this.dbKnex.from(this.tableName).where(field,comparison, value).del();
            console.log(`Row where ${field}${comparison}${value} was delete from Table:${this.tableName}`);
            //this.dbKnex.destroy();
            return null;
        } catch (error) {
            console.error(`Delete a record into Table ERROR: ${error}`)
        }
    }
    
    updateRedord = async (newObject, field, comparison, value)=> {
        try {
            await this.dbKnex.from(this.tableName).where(field,comparison, value).update(newObject);
            console.log(`Row where ${field}${comparison}${value} was updated in Table:${this.tableName}`)
            //this.dbKnex.destroy()
            return null;
        } catch (error) {
            console.error(`Update a record into Table ERROR: ${error}`)
        }
    }
}

