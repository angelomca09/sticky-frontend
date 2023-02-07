import axios from "axios";
import IUser from "../interfaces/IUser";

const api = axios.create({
  baseURL: "http://localhost:3000"
})

async function singIn(form: { username: string, password: string, email: string, telephone: string }) {
  return api.post("auth/signIn", form).then((res): IUser => res.data)
}

async function logIn(form: { username: string, password: string }) {
  return api.post("auth/logIn", form).then((res): IUser => res.data)
}

export default {
  singIn,
  logIn
}