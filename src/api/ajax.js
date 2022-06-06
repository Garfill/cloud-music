import Request from "./request";

const ajax = new Request({
  baseURL: "http://localhost:3090",
  requestInterceptor(config) {
    return config;
  },
  responseInterceptor(response) {
    return response
  }
})

export default ajax;