import axios from "axios";
import { URL } from "./constants";
import type { Order, CartProduct } from "../types/skill"

export const getOrders: () => Promise<Order[]> = async () => {
    try {
        const response = await axios.get(`${URL}/orders`);
        return response.data;
    } catch (error) {}
};

export const createOrder: (cart: CartProduct[]) => Promise<Order> = async (cart: CartProduct[]) => {
    try {
        const response = await axios.post(`${URL}/orders`, cart);
        return response.data;
    } catch (error) {}
};

export const updateOrder: (order: Order) => Promise<Order> = async (order: Order) => {
    try {
        const response = await axios.put(`${URL}/orders/${order.billplz_id}`, order);
        return response.data;
    } catch (error) {}
};

export const deleteOrder: (id: string) => Promise<boolean> = async (id: string) => {
    try {
        const response = await axios.delete(`${URL}/orders/${id}`);
        return true;
    } catch (error) {
        return false;
    }
};

