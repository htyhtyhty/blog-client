import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
interface IInterceptors<T = AxiosResponse> {
  requestSuccessFn?:(config:any)=>InternalAxiosRequestConfig;
  requestFailureFn?:(config:any)=>any;
  responseSuccessFn?:(res:T)=>T;
  responseFailureFn?:(config:any)=>any;
}
interface IRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?:IInterceptors<T>
}

class Request {
  instance:AxiosInstance
  interceptorsObj?:IInterceptors
  constructor(config:IRequestConfig) {
    this.instance = axios.create(config)
    this.interceptorsObj = config.interceptors
    // 全局请求拦截
    this.instance.interceptors.request.use((config) => {
      const token = window.localStorage.getItem('token')
      if (token) {
        config.headers.Authorization = localStorage.getItem('token')
      }
      return config
    }, (err) => {
      console.log(err)
      return err
    })
     // 添加自定义请求/响应拦截
    this.instance.interceptors.request.use(
      this.interceptorsObj?.requestSuccessFn,
      this.interceptorsObj?.requestFailureFn)
    this.instance.interceptors.response.use(
      this.interceptorsObj?.responseSuccessFn,
      this.interceptorsObj?.responseFailureFn)
    // 全局响应拦截
    this.instance.interceptors.response.use((res:AxiosResponse) => res.data, (err) => {
      console.log(err)
      return err
    })
  }
  request<T>(config:IRequestConfig<T>) {
    if(config.interceptors?.requestSuccessFn) {
      config = config.interceptors.requestSuccessFn(config)
    }
    return new Promise<T>((resolve, reject) => {
      this.instance.request<any, T>(config).then((res) => {
        if (config.interceptors?.responseSuccessFn) {
          res = config.interceptors.responseSuccessFn(res)
        }
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  }
  get<T>(config:IRequestConfig<T>) {
    return this.request({ ...config, method: 'GET' })
  }
  post<T>(config:IRequestConfig<T>) {
    return this.request({ ...config, method: 'POST' })
  }
  delete<T>(config:IRequestConfig<T>) {
    return this.request({ ...config, method: 'DELETE' })
  }
  patch<T>(config:IRequestConfig<T>) {
    return this.request({ ...config, method: 'PATCH' })
  }
}
export default Request
