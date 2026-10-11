import apiClient from "./axios";

export const getOrders = async (params = {}) => {
    const response = await apiClient.get("/orders", { params });
    return response.data.data;
};

export const getOrderById = async (id) => {
    const response = await apiClient.get(`/orders/${id}`);
    return response.data.data;
};

export const createOrder = async (orderData) => {
    const response = await apiClient.post("/orders", orderData);
    return response.data.data;
};

