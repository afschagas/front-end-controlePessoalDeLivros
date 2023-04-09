import axios from "axios";

// Cria uma instance Axios com a URL base ddo Web Service a ser acessado pelo app
export const inAxios = axios.create({
  baseURL: "https://mqmswm.hospedagemelastica.com.br/",
});
