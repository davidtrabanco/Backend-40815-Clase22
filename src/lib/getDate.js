export const getDate = () =>{
    return `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`;
}