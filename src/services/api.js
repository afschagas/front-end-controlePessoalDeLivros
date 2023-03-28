import axios from "axios";

// Cria uma instance Axios com a URL base ddo Web Service a ser acessado pelo app
export const inAxios = axios.create({baseURL: 'http://192.168.15.21:3001'});
