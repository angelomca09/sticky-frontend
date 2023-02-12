import { IAlbum, IAlbumWithStickers } from "../interfaces/IAlbum";
import { ISticker } from "../interfaces/ISticker";
import { removeDuplicates } from "./arrayFunctions";

function stickerCountPerAlbum(album: IAlbum, collection: ISticker[]): number {
  let stickerCount = 0;
  const collection_id: string[] = removeDuplicates(collection.map(sticker => sticker._id));
  const albumSticker_id: string[] = album.stickers;

  collection_id.forEach(sticker => stickerCount += +(albumSticker_id.includes(sticker)));

  return stickerCount;
}

function stickerCountPerAlbumWithSticker(album: IAlbumWithStickers, collection: ISticker[]): number {
  let stickerCount = 0;
  const collection_id: string[] = removeDuplicates(collection.map(sticker => sticker._id));
  const albumSticker_id: string[] = album.stickers.map(s => s._id);

  collection_id.forEach(sticker => stickerCount += +(albumSticker_id.includes(sticker)));

  return stickerCount;
}

export {
  stickerCountPerAlbum,
  stickerCountPerAlbumWithSticker
}