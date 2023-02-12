import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import api from "../../api";
import { IAlbum } from "../../interfaces/IAlbum";
import { getUser } from "../../services/user";

interface IAlbumModalProps {
  isOpen: boolean;
  closeModal: () => void;
  updateUserInfo: () => void;
}

export const AlbumModal = ({ isOpen, closeModal, updateUserInfo }: IAlbumModalProps) => {

  const [albums, setAlbums] = useState<IAlbum[]>([]);
  const [filterText, setFilterText] = useState("");
  const filteredAlbums = filterText ? albums.filter(a => a.name.toLowerCase().includes(filterText.trim().toLowerCase())) : albums
  const user = getUser();
  const [userAlbuns, setUserAlbuns] = useState<string[]>([]);

  useEffect(() => {
    if (!isOpen) return
    api.getUserById(user?.profile?.id!).then(data => setUserAlbuns(data.albums.map(a => a._id)))
    api.getAlbums().then(albums => setAlbums(albums))

  }, [isOpen])

  function addAlbum(albumId: string) {
    api.addAlbumToUser(albumId)
      .then((res) => {
        toast.success("Álbum adicionado!");
        setUserAlbuns(res);
        updateUserInfo();
      })
  }

  return (
    <dialog open={isOpen} >
      <article>
        <div aria-label="Close" className="close" data-target="modal-example" onClick={closeModal}></div>
        <h3>Adicione um álbum</h3>
        <input type="search" value={filterText} onChange={(event) => setFilterText(event.target.value)} />
        <div className="albums">
          {filteredAlbums.map((album, i) => {
            const albumDisabled = userAlbuns.includes(album._id)
            return (
              <div key={i} aria-disabled={albumDisabled}
                onClick={() => {
                  if (!albumDisabled) addAlbum(album._id)
                }}>
                <h4>{album.name}</h4>
              </div>
            )
          })}
        </div>
      </article>
    </dialog>
  )
}
