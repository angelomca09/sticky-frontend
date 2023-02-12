import { ISticker } from "./ISticker";

export interface IAlbum {
  _id: string,
  name: string,
  pages: number,
  stickers: string[]
}