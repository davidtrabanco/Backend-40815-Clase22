
 class Contenedor {
    constructor(){
        this.objects = [
            {"title":"Coca Cola",
            "price":"210",
            "thumbnail":"https://cdn0.iconfinder.com/data/icons/vectr-examples/458/food-coke-128.png",
            "id":1},
            {"title":"Cerveza"
            ,"price":"350",
            "thumbnail":"https://cdn1.iconfinder.com/data/icons/drink-beverage/512/26-beer-bottle-glass-drink-128.png",
            "id":2},
            {"title":"Smoothie",
            "price":"140",
            "thumbnail":"https://cdn1.iconfinder.com/data/icons/drink-beverage/512/15-juice-cup-smoothie-plastic-128.png"
            ,"id":3}
        ];
        this.lastId = 0;
    }

    getAll(){
        //obtengo el último ID:
        if(this.objects.length > 0){
            this.lastId = this.objects[this.objects.length-1].id
        }
        return this.objects;
    }

    save(object){
        this.getAll()
        //Agrego el ID al objeto enviado
        this.lastId++
        object['id'] = this.lastId;

        //Agrego el objeto nuevo al array
        this.objects.push(object);

        return object.id;
    }

    update(id, newObject){
        this.objects.forEach(obj => {
            if( obj.id == parseInt(id)) {
                //creo un array con los Keys del producto enviado:
                const keys = Object.keys(newObject)
                //actualizo solo los Keys enviados:
                keys.forEach(key => {
                    obj[key]=newObject[key];
                });
            }
        });

        return "updated";
    }

    getById(id){
        //retorno el objecto filtrado:
        const objFound = this.objects.filter( obj=> obj.id == id);
        
        return objFound[0] === undefined ? null : objFound[0];
    }

    getRandom(){
        let idRandom = 0
        let product

        do {
            idRandom = parseInt(Math.random() * this.lastId + 1)
            product = this.getById(idRandom);
        } while (product === null);

        return product
    }

    deleteById(id){
        //Elimino el registro indicado mediante filtro y lo guardo
        this.objects = this.objects.filter( (obj) => obj.id != id );
        return "ID deleted"
    }

    async deleteAll(){
        this.objects = [];
        return "deleted"
    }
    
}

export const contenedor = new Contenedor();
