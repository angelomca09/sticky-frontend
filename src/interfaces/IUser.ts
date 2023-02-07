import { IAlbum } from "./IAlbum";
import { ISticker } from "./ISticker";

export interface IUser {
  _id: string,
  username: string,
  email: string,
  telephone: string,
  albums: IAlbum[],
  stickers: ISticker[]
}