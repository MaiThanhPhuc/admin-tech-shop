import axios from 'axios';
import authHeader from './auth-header';
const API_URL = process.env.REACT_APP_BASE_URL;

const generateRespObj = (status, message, data) => {
  return {
    status: status,
    message: message,
    data: data,
  };
};

class UserService {
  async addCategory(data) {
    const response = await axios.post(API_URL + `/adminSys/category`, data, {
      headers: authHeader(),
    });

    return generateRespObj(response.status, response.data.message, response.data.data);
  }

  async getAllCategory() {
    const resp = await axios.get(`${API_URL}/category`);
    return generateRespObj(resp.status, resp.data.message, resp.data.data);
  }

  async addStore(data) {
    const resp = await axios.post(`${API_URL}/adminSys/shop`, data, {
      headers: authHeader(),
    });
    return generateRespObj(resp.status, resp.data.message, resp.data.data);
  }

  // Handle Manufacture
  async getAllManufacture() {
    const resp = await axios.get(`${API_URL}/manufacturer`);
    return generateRespObj(resp.status, resp.data.message, resp.data.data);
  }

  async addProduct(data) {
    const resp = await axios.post(`${API_URL}/adminSys/product`, data, {
      headers: authHeader(),
    });

    return generateRespObj(resp.status, resp.data.message, resp.data.data);
  }
}

export default new UserService();
