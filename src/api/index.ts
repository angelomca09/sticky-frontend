import axios from "axios";
import { IAlbum, IAlbumWithStickers } from "../interfaces/IAlbum";
import ILogin from "../interfaces/ILogin";
import { IUser } from "../interfaces/IUser";
import { getToken, getUser } from "../services/user";

const api = axios.create({
  baseURL: "http://localhost:3000",
})

function headers() {
  return { headers: { "Authorization": "Basic " + getToken() } }
}

async function singIn(form: { username: string, password: string, email: string, telephone: string }) {
  return api.post("auth/signIn", form).then((res): ILogin => res.data)
}

async function logIn(form: { username: string, password: string }) {
  return api.post("auth/logIn", form).then((res): ILogin => res.data)
}

async function getUserById(userId: string) {
  return api.get(`user/${userId}`, headers())
    .then((res): IUser => res.data)
}

async function getUserByUsername(username: string) {
  return api.get(`user/byUsername/${username}`, headers())
    .then((res): IUser => res.data || null)
}

async function getAlbum(albumId: string) {
  return api.get(`album/${albumId}`, headers())
    .then((res): IAlbumWithStickers => res.data)
}

async function getAlbums() {
  return api.get(`album`, headers())
    .then((res): IAlbum[] => res.data)
}

async function addAlbumToUser(albumId: string) {
  const data = {
    userId: getUser()?.profile?.id,
    albumId
  }
  return api.post("user/album", data, headers())
    .then(res => res.data)
}

async function deleteAlbumFromUser(albumId: string) {
  const data = {
    userId: getUser()?.profile?.id,
    albumId
  }
  return api.delete("user/album", { ...headers(), data })
    .then(res => res.data)
}

async function addStickerToUser(stickerId: string) {
  const data = {
    userId: getUser()?.profile?.id,
    stickerId
  }
  return api.post("user/sticker", data, headers())
    .then(res => res.data)
}
async function removeStickerFromUser(stickerId: string) {
  const data = {
    userId: getUser()?.profile?.id,
    stickerId
  }
  return api.delete("user/sticker", { ...headers(), data })
    .then(res => res.data)
}

export default {
  singIn,
  logIn,
  getUserById,
  getUserByUsername,
  getAlbum,
  getAlbums,
  deleteAlbumFromUser,
  addAlbumToUser,
  addStickerToUser,
  removeStickerFromUser
}