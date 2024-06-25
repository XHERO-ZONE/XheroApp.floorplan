import axios from 'axios';
// import { ACCESS_TOKEN_KEY } from 'core/constants';
import { createAxiosInstance } from './axios';

export default class NewService {
//   headers = {};
  axios;
//   defaultOptions = { namespace: undefined };

  constructor(options) {
    this.defaultOptions = { ...this.defaultOptions, ...options };
    // console.log('process.env', process.env);
    if (window.env && window.env.API_ENV === 'production') {
      const API_ENDPOINT = `${window.env.BASE_API_URL}/api/v1`;
      this.axios = createAxiosInstance({
        baseURL: API_ENDPOINT,
      });
    } else {
      // console.log('process.env', process.env);
      // console.log('window.env', window.env);

      const API_ENDPOINT = 'https://apis-dev.xheroapp.com';
      const endpoint = `${API_ENDPOINT}/api/v1`;
      this.axios = createAxiosInstance({
        baseURL: 'https://apis-dev.xheroapp.com',
      });
    }
  }

  toQueryString(params) {
    const keys = Object.keys(params);
    const segments = keys.map(
      (k) => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`
    );
    return segments.join('&');
  }

  async restAsync(
    action,
    params = {},
    options = {
      headers: {},
      method: 'post',
    }
  ) {
    const { headers } = options;
    const token = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJ1cm46YXVkaWVuY2U6cHJvZCIsImlzcyI6InVybjppc3N1ZXI6cHJvZCIsInVzZXIiOnsiaWQiOiI2NjRmZjMxZmVmMWI2YWUyOTRlZmIyOTgiLCJ1c2VybmFtZSI6Ijg0OTg1MTMzNzQ3IiwiZnVsbE5hbWUiOiJYaGVybyBtZW1iZXIiLCJiaXJ0aERheSI6WyIyMS8wMi8xOTk5IiwiMjM6NTg6MDAiXSwiYWRkcmVzcyI6WyJQaMaw4budbmcgMDQsIFF14bqtbiBHw7IgVuG6pXAsIFRow6BuaCBwaOG7kSBI4buTIENow60gTWluaCIsIjExMyBMZSBsYWkiXSwiZ2VuZGVyIjoibWFsZSIsInJvbGUiOiJ1c2VyIiwic3RhdHVzIjoiYWN0aXZlIiwiYXZhdGFyIjoiaHR0cHM6Ly9pcGZzLmZpbGViYXNlLmlvL2lwZnMvUW1QWTlMOVVzbllXRWM4N0c3UlNwZ2VyUTg0dGhjV3dCUkZnMUhuR2M5QzN5RiIsInJlZmVyZXJDb2RlIjoiODQ5ODUxMzM3NDciLCJ1c2VyIjoxfSwic2NvcGUiOiJ1c2VyIiwiaWF0IjoxNzE3NDgyNDI3LCJleHAiOjE3MTc1Njg4Mjd9.WxkOfIHs-YX_d3hWNbAc9tBMrviqncVXn4oA86HjZK-wXwA-4C-huFS5qyCswt8hNVPET1dmgTegKBXEVU7PXQ';
    try {
      const opts = {
        url: action,
        method: options.method,
        data: params,
        headers,
      };
      if (token) {
        Object.assign(opts.headers, { Authorization: `Bearer ${token}` });
      }
      const response = await this.axios.request(opts);
      return response.data;
    } catch (err) {
      if (err.response.status === 401) {
        // localStorage.removeItem(ACCESS_TOKEN_KEY);
        window.location.reload();
      }
      throw err.response;
    }
  }

  postFormData(action, data) {
    const headers = {
      'Content-Type': 'multipart/form-data',
    };
    return this.restAsync(action, data, {
      method: 'post',
      headers,
    });
  }

  get(action, params = {}, options = {}) {
    const { headers = {} } = options;
    const query = this.toQueryString(params);
    const path = query ? `${action}?${query}` : action;
    return this.restAsync(
      path,
      {},
      {
        method: 'get',
        headers,
      }
    );
  }

  post(action, params = {}, options = {}) {
    const { headers = {} } = options;
    return this.restAsync(action, params, {
      method: 'post',
      headers,
    });
  }

  put(action, params = {}, options = {}) {
    const { headers = {} } = options;
    return this.restAsync(action, params, {
      method: 'put',
      headers,
    });
  }

  delete(action, params = {}, options = {}) {
    const { headers = {} } = options;
    return this.restAsync(action, params, {
      method: 'delete',
      headers,
    });
  }

  uploadWithPreSignedUrl(config, file) {
    const { url, contentType } = config;
    return axios.put(url, file, { headers: { 'Content-Type': contentType } });
  }
}