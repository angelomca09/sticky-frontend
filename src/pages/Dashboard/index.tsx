
import { useState, useEffect } from "react";
import api from "../../api";
import { IAlbum } from "../../interfaces/IAlbum";
import { ISticker } from "../../interfaces/ISticker";
import { getUser } from "../../services/user"
import { FaArrowRight } from "react-icons/fa"
import { Link } from "react-router-dom";

export const Dashboard = () => {

  const user = getUser()!;

  const [albums, setAlbums] = useState<IAlbum[]>([]);
  const [stickers, setStickers] = useState<ISticker[]>([]);

  useEffect(() => {
    api.getUserById(user.profile?.id!).then(res => {
      setAlbums(res.albums)
      setStickers(res.stickers)
    })
  }, [])

  return (
    <>
      <main className="container">
        <div className="grid">

          <article className="contrast">
            <div className="grid">
              <h1>Meus Álbuns: {albums.length}</h1>
              <div>
                <Link to="/albuns">
                  <button className="add outline contained rounded"
                    title="Álbuns"><FaArrowRight />
                  </button>
                </Link>
              </div>
            </div>
          </article>

          <article className="contrast">
            <div className="grid">
              <h1>Minhas Figurinhas: {stickers.length}</h1>
              <div >
                <Link to="/figurinhas">
                  <button className="add outline contained rounded"
                    title="Figurinhas"><FaArrowRight />
                  </button>
                </Link>
              </div>
            </div>
          </article>

        </div>
      </main>
    </>
  )
}
