import axios from "axios";

const baseApi = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

export default baseApi;