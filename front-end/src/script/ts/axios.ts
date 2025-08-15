import type { AnyZodObject } from 'astro:schema';
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.PUBLIC_API_URL,
});

export async function UserLogin(id: string) {
  return api.post("/user/login", { id }).then((response) => {
    return response.data;
  }).catch((err) => {
    return err.response?.data ?? err.message;
  });
};

export async function User(uid: string) {
  return api.get("/user?uid=" + uid).then((response) => {
    return response.data;
  }).catch((err) => {
    return err.response?.data ?? err.message;
  });
};
