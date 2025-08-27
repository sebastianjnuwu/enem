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

export async function UserUpdate(uid: string, name: string, email: string, phone: string) {
  return api.post("/user/update", { uid, name, email, phone }).then((response) => {
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

export async function PlanAll() {
  return api.get("/plan/all").then((response) => {
    return response.data;
  }).catch((err) => {
    return err.response?.data ?? err.message;
  });
};

export async function PlanCreate(data: any) {
  return api.put("/plan/create", data).then((response) => {
    return response.data;
  }).catch((err) => {
    return err.response?.data ?? err.message;
  });
};
