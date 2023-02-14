import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import api from "../../api";
import { IAlbum } from "../../interfaces/IAlbum";
import { Button } from "../../layout/Button";
import { Navbar } from "../../layout/Navbar";
import { Title } from "../../layout/Title"
import { AlbumCard } from "./AlbumCard";
import { AlbumModal } from "./AlbumModal";
import { EditAlbumModal } from "./EditAlbumModal";
import "./styles.css";

export const AdminDashboard = () => {

  const [albums, setAlbums] = useState<IAlbum[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [selectedAlbumId, setSelectedAlbumId] = useState("");

  async function getAlbumsInfo() {
    return api.getAlbums().then(res => {
      setAlbums(res)
    })
  }

  useEffect(() => {
    getAlbumsInfo()
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
      <AlbumModal isOpen={isModalOpen} closeModal={closeModal} updateAlbums={getAlbumsInfo} />
      <EditAlbumModal isOpen={isEditModalOpen} closeModal={closeEditModal} updateAlbums={getAlbumsInfo} albumId={selectedAlbumId} />
      <main className="container cards">
        <Title title="Todos os Álbuns" />
        <div className="albums">
          {albums.map((album, i) => (
            <AlbumCard key={i} album={album} selectAlbum={openEditModal} />
          ))}
          <article className="centered">

            <Button onClick={openModal} ><FaPlus /></Button>
          </article>
        </div>
      </main>
    </>
  )
}
