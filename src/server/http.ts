import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios'  
import type { Context } from 'koishi'  

// export class HttpClient {
//   private http: AxiosInstance
//   private retryCount = 3
//   private retryDelay = 1000

//   constructor(private token: string) {
//     this.http = axios.create({
//       baseURL: 'https://api.siliconflow.cn',
//       timeout: 10000,
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${this.token}`
//       }
//     })
//   }
// }

export const createHttpServer = (token: string): AxiosInstance => {
  return axios.create({
    baseURL: 'https://api.siliconflow.cn',
    timeout: 300000,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
}