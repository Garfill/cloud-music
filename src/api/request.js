import axios from 'axios';

class Request {
  constructor(options) {
    this.rawOptions = options;
    const {
      baseURL = '/',
      headers = null,
      timeout = 1000 * 60 * 5,
      requestInterceptor = null,
      responseInterceptor = null,
    } = options

    // 初始化实例
    this.instance = axios.create({
      baseURL,
      timeout,
      headers,
    })

    // 全局拦截器
    if (requestInterceptor) {
      if (typeof requestInterceptor === 'function') {
        this.instance.interceptors.request.use(requestInterceptor, (error) => {
          // 请求出错
          console.log(error, "网络出错111")
          return Promise.reject(error)
        })
      } else if (Array.isArray(requestInterceptor)) {
        requestInterceptor.forEach(item => {
          this.instance.interceptors.request.use(item, (error) => {
            // 请求出错
            console.log(error, "网络出错111")
            return Promise.reject(error)
          })
        })
      }
    }
    if (responseInterceptor) {
      if (typeof responseInterceptor === 'function') {
        this.instance.interceptors.response.use(responseInterceptor, (error) => {
          // 请求出错
          console.log(error, "网络出错222")
          return Promise.reject(error)
        })
      } else if (Array.isArray(responseInterceptor)) {
        responseInterceptor.forEach(item => {
          this.instance.interceptors.response.use(item, (error) => {
            // 请求出错
            console.log(error, "网络出错222")
            return Promise.reject(error)
          })
        })
      }
    }

  }

  request(options) {
    return new Promise((resolve, reject) => {
      if (!this.instance) {
        return reject(new Error('请先初始化实例'))
      }
      const {
        url = '',
        method = 'get',
        data = undefined,
        requestInterceptor,
        responseInterceptor,
      } = options
  
      let requestOptions = {}
      if (method === 'get') {
        requestOptions = {
          url,
          method,
          params: data,
        }
      } else {
        requestOptions = {
          url,
          method,
          data,
        }
      }
      // 单个实例请求拦截器
      if (requestInterceptor && typeof requestInterceptor === 'function') {
        requestInterceptor(requestOptions)
      }

      this.instance
        .request(requestOptions)
        .then(response => {
          // 返回数据拦截器
          if (responseInterceptor && typeof responseInterceptor === 'function') {
            responseInterceptor(response)
          }
          resolve(response.data)
        })
        .catch(error => {
          console.log(error, "网络出错333")
          reject(error)
        })
    })
  }

  get(options) {
    if (typeof options === 'string') {
      options = {
        url: options,
      }
    }
    return this.request({
      ...options,
      method: 'get',
    })
  }

  post(options) {
    if (typeof options === 'string') {
      options = {
        url: options,
      }
    }
    return this.request({
      ...options,
      method: 'post',
    })
  }


}

export default Request;