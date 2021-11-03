import axios from "axios";

const API = axios.create({
  baseURL: "https://g5imzjo8qf.execute-api.ap-northeast-2.amazonaws.com/v1",
});

export default API;
