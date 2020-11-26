import Axios from "axios";

const httpService = Axios.create({
    baseURL: 'http://localhost:8080/'
})

export default httpService;