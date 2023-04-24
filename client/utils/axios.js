import axios from "axios";
import qs from "qs";

export const makeRequest = axios.create({
  baseURL: "http://localhost:8008/api/",
  withCredentials: true,
  paramsSerializer: (params) =>
    qs.stringify(params, { arrayFormat: "comma", encode: false }),
});