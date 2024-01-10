import axios, { CreateAxiosDefaults } from "axios";
import { APIErrorAdapter } from "./adapters/APIError.adapter";

const httpStatusValidation = (status: number) => status >= 200 && status < 300;

const axiosBaseConfig: CreateAxiosDefaults = {
  timeout: 60000,
  withCredentials: false,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  validateStatus: httpStatusValidation,
};

const http = axios.create({
  ...axiosBaseConfig,
  baseURL: import.meta.env.VITE_API_URL,
});

http.interceptors.response.use(
  (fulfilledResponse) => fulfilledResponse,
  (rejectedResponse) => Promise.reject(APIErrorAdapter(rejectedResponse))
);

export { http };
