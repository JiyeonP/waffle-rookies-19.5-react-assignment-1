import axios from "axios";

const API = axios.create({
    baseURL: "https://p04fpgjlo3.execute-api.ap-northeast-2.amazonaws.com/v1/"
})

export default API;