import React from 'react'
import { FaEdit } from 'react-icons/fa';
import { IAlbum } from '../../interfaces/IAlbum'
import { ISticker } from '../../interfaces/ISticker';
import { Button } from '../../layout/Button';
import { stickerCountPerAlbum } from '../../utils/stickerCount';

interface IAlbumCardProps {
  album: IAlbum;
  stickers: ISticker[];
  selectAlbum: (albumId: string) => void;
}

export const AlbumCard = ({ album, stickers, selectAlbum }: IAlbumCardProps) => {

  const albumProgressCount = stickerCountPerAlbum(album, stickers);
  const albumTotalCount = album.stickers.length;
  const restCount = albumTotalCount - albumProgressCount;
  const restText = (() => {
    switch (restCount) {
      case 0: return "Completo!"
      case 1: return `falta 1`
      default: return `faltam ${restCount}`
    }
  })();

  return (
    <article>
      <div className="card-header">
        <h1>{album.name}</h1>
        <Button contrasted onClick={() => selectAlbum(album._id)}><FaEdit /></Button>
      </div>
      <p>
        <b>{albumProgressCount}</b>
        <small> figurinhas de </small>
        <b>{albumTotalCount}</b>
        <small> ({restText})</small>
      </p>
      <span>Páginas: {album.pages}</span>
    </article>
  )
}
