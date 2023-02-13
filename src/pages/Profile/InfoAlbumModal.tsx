import { useState, useEffect } from "react";
import api from "../../api";
import { IAlbumWithStickers } from "../../interfaces/IAlbum";
import { ISticker } from "../../interfaces/ISticker";
import { stickerCountPerAlbumWithSticker } from "../../utils/stickerCount";

interface IInfoAlbumModalProps {
  albumId?: string;
  userStickers: ISticker[];
  isOpen: boolean;
  closeModal: () => void;
}

export const InfoAlbumModal = ({ albumId, userStickers, isOpen, closeModal }: IInfoAlbumModalProps) => {

  const [album, setAlbum] = useState<IAlbumWithStickers | null>(null);
  const [filterText, setFilterText] = useState("");
  const userStickersId = userStickers.map(s => s._id);
  const filteredStickers = filterText && album ? album.stickers.filter(a => a.name.toLowerCase().includes(filterText.trim().toLowerCase())) : (album?.stickers ?? [])

  const albumProgressCount = album ? stickerCountPerAlbumWithSticker(album, userStickers) : 0;
  const albumTotalCount = album?.stickers.length ?? 0;
  const restCount = albumTotalCount - albumProgressCount;
  const restText = (() => {
    switch (restCount) {
      case 0: return "Completo!"
      case 1: return `falta 1`
      default: return `faltam ${restCount}`
    }
  })();

  useEffect(() => {
    if (albumId)
      api.getAlbum(albumId).then(album => setAlbum(album))

    else setAlbum(null)

  }, [albumId])

  return (
    <>

      <dialog open={isOpen} >
        <article>
          <div aria-label="Close" className="close" data-target="modal-example" onClick={closeModal}></div>
          <section>
            <h3>{album?.name}</h3>
            <p>
              <b>{albumProgressCount}</b>
              <small> figurinhas de </small>
              <b>{albumTotalCount}</b>
              <small> ({restText})</small>
            </p>
            <span>Páginas: {album?.pages}</span>
          </section>
          <input type="search" value={filterText} placeholder="Filtrar" onChange={(event) => setFilterText(event.target.value)} />
          <div className="stickers">
            {filteredStickers.map((sticker, i) => {
              const stickerCount = userStickersId.filter(id => sticker._id === id).length;
              return (
                <div key={i} >
                  <h4>{sticker.number}. {sticker.name}</h4>

                  <div className="count-buttons">
                    {stickerCount} un.
                  </div>
                </div>
              )
            })}
          </div>
        </article>
      </dialog>
    </>
  )
}
