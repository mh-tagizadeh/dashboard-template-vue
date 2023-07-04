import axios from "axios";
import toastr from "toastr";

const API_ENDPOINT = import.meta.env.VITE_APP_API_ENDPOINT;

const APP_URL = import.meta.env.VITE_APP_URL;

const authHeader = () => {
  return { 
    "Content-Type": "application/json",
  };
};

const client = axios.create({
  baseURL: API_ENDPOINT,
  headers: {
    Authorization: "Bearer " + localStorage.getItem("access_token"),
    "Content-Type": "application/json",
  },
});

class DataService {
  static get(path = "", data = {}) {
    return client({
      method: "GET",
      url: path,
      params: data,
      headers: { ...authHeader() },
    });
  }

  static post(path = "", data = {}, optionalHeader = {}) {
    return client({
      method: "POST",
      url: path,
      data,
      headers: { ...authHeader(), ...optionalHeader },
    });
  }

  static patch(path = "", data = {}) {
    return client({
      method: "PATCH",
      url: path,
      data: JSON.stringify(data),
      headers: { ...authHeader() },
    });
  }

  static delete(path = "", data = {}) {
    return client({
      method: "DELETE",
      url: path,
      data: JSON.stringify(data),
      headers: { ...authHeader() },
    });
  }

  static put(path = "", data = {}) {
    return client({
      method: "PUT",
      url: path,
      data: JSON.stringify(data),
      headers: { ...authHeader() },
    });
  }
}

/**
 * axios interceptors runs before and after a request, letting the developer modify req,req more
 * For more details on axios interceptor see https://github.com/axios/axios#interceptors
 */
client.interceptors.request.use((config) => {
  // do something before executing the request
  // For example tag along the bearer access token to request header or set a cookie



  const requestConfig = config;
  const { headers } = config;
  requestConfig.headers = {
    ...headers,
    Authorization: "Bearer " + localStorage.getItem("access_token"),
  };

  return requestConfig;
});

client.interceptors.response.use(
  (response) => {
    if (response.status === 200 || response.status === 201) {
      return response;
    }
  },
  (error) => {
    /**
     * Do something in case the response returns an error code [3**, 4**, 5**] etc
     * For example, on token expiration retrieve a new access token, retry a failed request etc
     */
    const { response } = error;
    const originalRequest = error.config;
    if (response) {

      if (response.status == 401 && response.data.message === 'Unauthenticated.') {


        localStorage.removeItem("access_token");

        window.location.href = APP_URL + '/login'

        throw response
        
      } 


      if (
        (response.status === 400 ||
        response.status === 401 ||
        response.status === 403 ||
        response.status === 404 )
        && response.data
      ) {

        if (response.data.message) {
          let mes = response.data.message;
          toastr.error(mes)
        }

        throw response

      }

      if (response.status === 422) {
        if (response.config.url === '/api/login') {

          toastr.error(response.data.message)

        }
        else if (response.data) {
          let errors = response.data;
          for (var err in errors) {
            var e = errors[err];
            for (var mes in e) {
              toastr.error(e[mes])
            }
          }
        }

        throw response;
      }

      if (response.status === 500) {
        toastr.error(response.data.message)
      } else {
        return originalRequest;
      }


      throw response;
    }

    return Promise.reject(error);
  }
);
export { DataService };