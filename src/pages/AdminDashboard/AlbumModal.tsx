import { useState } from "react";
import { toast } from "react-toastify";
import api from "../../api";

interface IAlbumModalProps {
  isOpen: boolean;
  closeModal: () => void;
  updateAlbums: () => Promise<void>;
}

export const AlbumModal = ({ isOpen, closeModal, updateAlbums }: IAlbumModalProps) => {

  const [name, setName] = useState("");
  const [pages, setPages] = useState(1);
  const [image, setImage] = useState("");

  const canProceed = name && pages && image;

  function handlePagesChange(value: string) {
    if (+value <= 0) { setPages(1); return; }
    setPages(+value);
  }

  function handleClose() {
    closeModal();
    setName("");
    setPages(1);
    setImage("");
  }

  async function addAlbum(event: React.FormEvent) {
    event.preventDefault();
    await api.createAlbum({ name, pages, image })
      .then(async () => {
        toast.success("Álbum criado com sucesso!");
        await updateAlbums();
        handleClose();
      })
  }

  return (
    <dialog open={isOpen} >
      <article>
        <div aria-label="Close" className="close" data-target="modal-example" onClick={handleClose}></div>
        <h3>Adicione um álbum</h3>
        <form onSubmit={addAlbum}>
          <input type="text" placeholder="Nome" value={name} onChange={(event) => setName(event.target.value)} />
          <input type="number" placeholder="Páginas" value={pages} min={1} onChange={(event) => handlePagesChange(event.target.value)} />
          <input type="text" placeholder="Imagem" value={image} onChange={(event) => setImage(event.target.value)} />
          <button type="submit" disabled={!canProceed}>Confirmar</button>
        </form>

      </article>
    </dialog>
  )
}
