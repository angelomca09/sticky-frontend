import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { IUser } from "../../interfaces/IUser";
import { Title } from "../../layout/Title"
import { AlbumCard } from "./AlbumCard";
import { InfoAlbumModal } from "./InfoAlbumModal";
import "./styles.css";

export const Profile = () => {

  const user = (useLoaderData() as IUser);

  const { albums, stickers } = (() => user ?? { albums: null, stickers: null })()

  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

  const [selectedAlbumId, setSelectedAlbumId] = useState("");

  const subtitle = `${stickers.length} figurinhas`

  function openInfoModal(albumId: string) {
    setSelectedAlbumId(albumId)
    setIsInfoModalOpen(true);
  }

  function closeInfoModal() {
    setSelectedAlbumId("")
    setIsInfoModalOpen(false);
  }

  return (
    <>
      <InfoAlbumModal isOpen={isInfoModalOpen} userStickers={stickers} closeModal={closeInfoModal} albumId={selectedAlbumId} />
      <main className="container cards">
        <Title title={`Coleção de ${user.username ?? ""}`} subtitle={subtitle} />
        <div className="albums">
          {albums.map((album, i) => (
            <AlbumCard key={i} album={album} stickers={stickers} selectAlbum={openInfoModal} />
          ))}
        </div>
      </main>
    </>
  )
}
