import axios from "axios";

export const makeRequest = axios.create({
  baseURL: "http://localhost:8008/api/",
  withCredentials: true,
});