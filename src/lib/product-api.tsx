import axios from "axios";
import { URL } from "./constants";
import type { Product } from "../types/skill";

const pageLimit = 6;

export const getProduct: (id: string) => Promise<Product> = async (id: string) => {
    try {
        const response = await axios.get(`${URL}/products/${id}`);
        return response.data;
    } catch (error) {}
};

export const getProducts: (category: string, page: number) => Promise<Product[]> = async (category: string, page: number) => {
    const response = await axios.get(`${URL}/products?page=${page}&limit=${pageLimit}${category !== 'all' ? `&category=${category}` : ''}`);
    return response.data;
};

export const addProduct: (product: Product) => Promise<Product> = async (product: Product) => {
    try {
        const response = await axios.post(`${URL}/products`, product);
        return response.data;
    } catch (error) {}
};

export const updateProduct: (product: Product) => Promise<Product> = async (product: Product) => {
    const response = await axios.put(`${URL}/products/${product._id}`, product);
    return response.data;
};

export const deleteProduct: (id: string) => Promise<void> = async (id: string) => {
    const response = await axios.delete(`${URL}/products/${id}`);
    return response.data;
};
