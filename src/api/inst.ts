import axios, { AxiosRequestConfig } from 'axios'

const baseURL = process.env.REACT_APP_API_URL
const apiKey = process.env.REACT_APP_API_KEY

const instance = axios.create({ baseURL })

instance.interceptors.request.use(
  (config: AxiosRequestConfig): AxiosRequestConfig => {
    if (config.headers && apiKey) {
      config.headers.auth = apiKey
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

export default instance
