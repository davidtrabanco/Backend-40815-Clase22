
//Conexion a BD productos
export const dbProductsConfig = {
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      user: 'root',
      password: '',
      database: 'ecommerce'
    },
    pool: { min: 0, max: 10 }
};

//Conexión a BD para chat (local)
export const mongoDbCredential = {
    user: 'davidtrabanco',
    password: 'coder1234'
};