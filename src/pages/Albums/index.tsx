import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import api from "../../api";
import { IAlbum } from "../../interfaces/IAlbum";
import { ISticker } from "../../interfaces/ISticker";
import { Button } from "../../layout/Button";
import { Title } from "../../layout/Title"
import { getUser } from "../../services/user";
import { AlbumCard } from "./AlbumCard";
import { AlbumModal } from "./AlbumModal";
import { EditAlbumModal } from "./EditAlbumModal";
import "./styles.css";
export const Albums = () => {

  const user = getUser()!;

  const [albums, setAlbums] = useState<IAlbum[]>([]);
  const [stickers, setStickers] = useState<ISticker[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [selectedAlbumId, setSelectedAlbumId] = useState("");

  const subtitle = `${stickers.length} figurinhas`

  async function getUserInfo() {
    return api.getUserById(user.profile?.id!).then(res => {
      setAlbums(res.albums)
      setStickers(res.stickers)
    })
  }

  useEffect(() => {
    getUserInfo()
  }, [])

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  function openEditModal(albumId: string) {
    setSelectedAlbumId(albumId)
    setIsEditModalOpen(true);
  }

  function closeEditModal() {
    setSelectedAlbumId("")
    setIsEditModalOpen(false);
  }

  return (
    <>
      <AlbumModal isOpen={isModalOpen} closeModal={closeModal} updateUserInfo={getUserInfo} />
      <EditAlbumModal isOpen={isEditModalOpen} closeModal={closeEditModal} updateUserInfo={getUserInfo} albumId={selectedAlbumId} />
      <main className="container cards">
        <Title title="Minha Coleção" subtitle={subtitle} />
        <div className="albums">
          {albums.map((album, i) => (
            <AlbumCard key={i} album={album} stickers={stickers} selectAlbum={openEditModal} />
          ))}
          <article className="centered">

            <Button onClick={openModal} ><FaPlus /></Button>
          </article>
        </div>
      </main>
    </>
  )
}
