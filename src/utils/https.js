import axios from 'axios';
import queryString from 'querystring';

const defaultConfig = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + localStorage.getItem('token'),
  },
};

const http = {
  get: async (url, query = {}, config = {}) => {
    if (!url) throw new Error('URL is required');
    const param = queryString.stringify(query);
    if (param) url += `?${param}`;

    try {
      return await axios.get(url, { ...defaultConfig, ...config });
    } catch (error) {
      throw error;
    }
  },
  post: async (url, data = {}, config = {}) => {
    if (!url) throw new Error('URL is required');
    try {
      return await axios.post(url, data, {
        ...defaultConfig,
        ...config,
      });
    } catch (error) {
      throw error;
    }
  },
  put: async (url, data = {}, config = {}) => {
    if (!url) throw new Error('URL is required');
    try {
      return await axios.put(url, data, {
        ...defaultConfig,
        ...config,
      });
    } catch (error) {
      throw error;
    }
  },
  _delete: async (url, data = {}, config = {}) => {
    if (!url) throw new Error('URL is required');
    try {
      return await axios.delete(url, {
        ...defaultConfig,
        ...config,
      });
    } catch (error) {
      throw error;
    }
  },
};

export default http;
