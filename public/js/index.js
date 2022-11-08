export let socket = io.connect()

export const getTemplate = async (fileName) =>{
    const template = await fetch( "../templates/" + fileName)
    return await template.text();
};


