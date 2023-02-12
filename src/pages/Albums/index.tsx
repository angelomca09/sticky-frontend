import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import api from "../../api";
import { IAlbum } from "../../interfaces/IAlbum";
import { ISticker } from "../../interfaces/ISticker";
import { Button } from "../../layout/Button";
import { SearchBar } from "../../layout/SearchBar"
import { Title } from "../../layout/Title"
import { getUser } from "../../services/user";
import { AlbumCard } from "./AlbumCard";
import { AlbumModal } from "./AlbumModal";
import "./styles.css";
export const Albums = () => {

  const user = getUser()!;

  const [albums, setAlbums] = useState<IAlbum[]>([]);
  const [stickers, setStickers] = useState<ISticker[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  function getUserInfo() {
    api.getUserById(user.profile?.id!).then(res => {
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

  return (
    <>
      <AlbumModal isOpen={isModalOpen} closeModal={closeModal} updateUserInfo={getUserInfo} />
      <SearchBar to="/" placeholder="álbuns" />
      <Title title="Meus Álbuns" />
      <main className="container cards">
        <div className="albums">
          {albums.map((album, i) => (
            <AlbumCard key={i} album={album} stickers={stickers} />
          ))}
          <article className="centered">

            <Button onClick={openModal} ><FaPlus /></Button>
          </article>
        </div>
      </main>
    </>
  )
}
