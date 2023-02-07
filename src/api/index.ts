import axios from "axios";
import ILogin from "../interfaces/ILogin";
import { IUser } from "../interfaces/IUser";
import { getToken } from "../services/user";

const api = axios.create({
  baseURL: "http://localhost:3000"
})

async function singIn(form: { username: string, password: string, email: string, telephone: string }) {
  return api.post("auth/signIn", form).then((res): ILogin => res.data)
}

async function logIn(form: { username: string, password: string }) {
  return api.post("auth/logIn", form).then((res): ILogin => res.data)
}

async function getUserById(userId: string) {
  return api.get(`user/${userId}`, { headers: { "Authorization": "Basic " + getToken() } })
    .then((res): IUser => res.data)
}

export default {
  singIn,
  logIn,
  getUserById
}