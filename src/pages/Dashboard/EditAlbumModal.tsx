import { useState, useEffect } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import api from "../../api";
import { IAlbumWithStickers } from "../../interfaces/IAlbum";
import { ISticker } from "../../interfaces/ISticker";
import { Button } from "../../layout/Button";
import { getUser } from "../../services/user";
import { stickerCountPerAlbum, stickerCountPerAlbumWithSticker } from "../../utils/stickerCount";

interface IEditAlbumModalProps {
  albumId?: string;
  isOpen: boolean;
  closeModal: () => void;
  updateUserInfo: () => Promise<void>;
}

export const EditAlbumModal = ({ albumId, isOpen, closeModal, updateUserInfo }: IEditAlbumModalProps) => {

  const [album, setAlbum] = useState<IAlbumWithStickers | null>(null);
  const [filterText, setFilterText] = useState("");
  const user = getUser();
  const [userStickers, setUserStickers] = useState<ISticker[]>([]);
  const userStickersId = userStickers.map(s => s._id)
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

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  function getUserInfo() {
    api.getUserById(user?.profile?.id!).then(data => setUserStickers(data.stickers))
  }

  useEffect(() => {
    getUserInfo();
  }, [])

  useEffect(() => {
    if (albumId)
      api.getAlbum(albumId).then(album => setAlbum(album))

    else setAlbum(null)

  }, [albumId])

  async function addSticker(stickerId: string) {
    await api.addStickerToUser(stickerId)
      .then(async () => {
        getUserInfo();
        await updateUserInfo();
      }
      )
  }

  async function removeSticker(stickerId: string) {
    await api.removeStickerFromUser(stickerId)
      .then(async () => {
        await updateUserInfo();
        getUserInfo();
      }
      )
  }

  async function deleteAlbum(albumId?: string) {
    if (!albumId) return;
    await api.deleteAlbumFromUser(albumId).then(async () => {
      toast.success("Álbum removido com sucesso!")
      await updateUserInfo();
      setIsDeleteModalOpen(false);
      closeModal();
    })
  }

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
                    <Button contrasted onClick={() => removeSticker(sticker._id)} ><FaMinus /></Button>
                    {stickerCount}
                    <Button contrasted onClick={() => addSticker(sticker._id)} ><FaPlus /></Button>
                  </div>
                </div>
              )
            })}
          </div>
          <span className="delete-text" onClick={() => setIsDeleteModalOpen(true)}><small>Excluir álbum</small></span>
        </article>
      </dialog>
      <dialog open={isDeleteModalOpen} >

        <article>
          <h3>Deseja mesmo remover o álbum?</h3>

          <footer>
            <button className="secondary" onClick={() => setIsDeleteModalOpen(false)}>Cancelar</button>
            <button onClick={() => deleteAlbum(albumId)}>Confirmar</button>
          </footer>
        </article>

      </dialog>
    </>
  )
}
