import React from 'react'
import { FaEdit } from 'react-icons/fa';
import { IAlbum } from '../../interfaces/IAlbum'
import { ISticker } from '../../interfaces/ISticker';
import { Button } from '../../layout/Button';
import { stickerCountPerAlbum } from '../../utils/stickerCount';

interface IAlbumCardProps {
  album: IAlbum;
  selectAlbum: (albumId: string) => void;
}

export const AlbumCard = ({ album, selectAlbum }: IAlbumCardProps) => {

  const albumTotalCount = album.stickers.length;

  return (
    <article>
      <div className="card-header">
        <h1>{album.name}</h1>
        <Button contrasted onClick={() => selectAlbum(album._id)}><FaEdit /></Button>
      </div>
      <p>
        <small>Figurinhas: {albumTotalCount} </small>|
        <small> Páginas: {album.pages}</small>
      </p>
    </article>
  )
}
