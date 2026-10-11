import apiClient from "./axios";

export const getProducts = async (params = {}) => {
  const response = await apiClient.get("/products", { params });
  return response.data.data;
};

export const getProductById = async (id) => {
  const response = await apiClient.get(`/products/${id}`);
    return response.data.data;
};

export const createProduct = async (productData) => {
  const response = await apiClient.post("/products", productData);
    return response.data.data;
};

export const updateProduct = async (id, productData) => {
  const response = await apiClient.put(`/products/${id}`, productData);
  return response.data.data;
};