import axios from 'axios';
import { bodyCreatePost, bodyLogin, bodyRegister } from './types';

const api = axios.create({
  baseURL: 'http://localhost:8080',
});

export const requestLogin = async (endpoint: string, body: bodyLogin) => {
    const { data } = await api.post(endpoint, body);
    return data;
}

export const setToken = (token: string) => {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export const requestRegister = async (endpoint: string, body: bodyRegister) => {
    const { data } = await api.post(endpoint, body);
    return data;
}

export const requestCreatePost = async (endpoint: string, body: bodyCreatePost) => {
    const { data } = await api.post(endpoint);
    return data;
}

export const requestGetPosts = async (endpoint: string) => {
    const { data } = await api.get(endpoint);
    return data;
}