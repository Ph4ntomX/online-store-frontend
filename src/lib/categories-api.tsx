import axios from "axios";
import { URL } from "./constants";
import type { Category } from "../types/skill";

export const getCategory: (id: string) => Promise<Category> = async (id: string) => {
    try {
        const response = await axios.get(`${URL}/categories/${id}`);
        return response.data;
    } catch (error) {}
};

export const getCategories: () => Promise<Category[]> = async () => {
    const response = await axios.get(`${URL}/categories`);
    return response.data;
};

export const createCategory: (category: Category) => Promise<Category> = async (category: Category) => {
    try {
        const response = await axios.post(`${URL}/categories`, category);
        return response.data;
    } catch (error) {}
};

export const updateCategory: (category: Category) => Promise<Category> = async (category: Category) => {
    const response = await axios.put(`${URL}/categories/${category._id}`, category);
    return response.data;
};

export const deleteCategory: (id: string) => Promise<boolean> = async (id: string) => {
    try {
        const response = await axios.delete(`${URL}/categories/${id}`);
        return true;
    } catch (error) {
        return false;
    }
};
