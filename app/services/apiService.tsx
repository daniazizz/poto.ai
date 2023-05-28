import axios from "axios";

const prod = false;

const api = axios.create({
  baseURL: prod
    ? "https://thinketh-app.azurewebsites.net/api"
    : "http://192.168.0.253:8000/api",
});

export default api;
