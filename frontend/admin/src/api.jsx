import axios from "axios";

const API_URL = "https://rogue0707.com/api/products";

export const addProduct = async (productData) => {
  const response = await axios.post(`${API_URL}/add`, productData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response;
};

export const removeProduct = async (id) => {
  const response = await axios.delete(`${API_URL}/remove/${id}`);
  return response.data;
};

export const listProducts = async () => {
  const response = await axios.get(`${API_URL}/list`);
  return response.data;
};

export const getProduct = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};