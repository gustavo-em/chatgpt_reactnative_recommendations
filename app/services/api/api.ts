/**
 * This Api class lets you define an API endpoint and methods to request
 * data and process it.
 *
 * See the [Backend API Integration](https://github.com/infinitered/ignite/blob/master/docs/Backend-API-Integration.md)
 * documentation for more details.
 */
import { ApisauceInstance, create } from "apisauce"
import Config from "../../config"
import type { ApiConfig } from "./api.types"

/**
 * Configuring the apisauce instance.
 */
export const DEFAULT_API_CONFIG: ApiConfig = {
  url: Config.API_URL,
  timeout: 20000,
}

/**
 * Manages all requests to the API. You can use this class to build out
 * various requests that you need to call from your backend API.
 */
export class Api {
  apisauce: ApisauceInstance
  config: ApiConfig

  /**
   * Set up our API instance. Keep this lightweight!
   */
  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: "application/json",
      },
    })
  }
}

// Singleton instance of the API for convenience
const api = new Api()

api.apisauce.axiosInstance.interceptors.request.use(async (config) => {
  return config
})

api.apisauce.axiosInstance.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      return response
    }
    return Promise.reject(response)
  },
  (error) => {
    console.log("errorrr", error)
    if (error) {
      if (error.response && error.response.status === 401) {
        console.log(error)
        return Promise.reject(error)
      }
    } else {
      console.log(error)
      return Promise.reject(error)
    }

    return Promise.reject(error)
  },
)

export default api
