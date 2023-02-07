import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000"
})

function singIn(form: { username: string, password: string, email: string, telephone: string }) {
  api.post("auth/signIn", form).then(res => console.log(res))
}

function logIn(form: { username: string, password: string }) {
  api.post("auth/logIn", form).then(res => console.log(res))
}

export default {
  singIn,
  logIn
}