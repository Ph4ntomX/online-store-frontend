import axios from "axios";
import { URL } from "./constants";
import type { User } from "../types/skill";

export const signUp: (user: User) => Promise<User> = async (user: User) => {
    try {
        const response = await axios.post(`${URL}/auth/signup`, user);
        return response.data;
    } catch (error) {}
};

export const logIn: (user: User) => Promise<User> = async (user: User) => {
    try {
        const response = await axios.post(`${URL}/auth/login`, user);
        return response.data;
    } catch (error) {}
};
