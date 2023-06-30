import axios from "axios";

const prod = true;

const instance = axios.create({
  baseURL: prod
    ? "https://thinketh-app.azurewebsites.net/api"
    : "http://192.168.0.254:8000/api",
});

const setBearerToken = (token: string) => {
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

// instance.interceptors.request.use((config) => {
//   console.log("Request sent");
//   console.log(config);
//   return config;
// });

// instance.interceptors.response.use(
//   (response) => {
//     console.log("Response received");
//     console.log(response);
//     return response;
//   },
//   (error) => {
//     console.log("Error received");
//     console.log(error.response);
//     return Promise.reject(error);
//   }
// );

export default { instance, setBearerToken };
