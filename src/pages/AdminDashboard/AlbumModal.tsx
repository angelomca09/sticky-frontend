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

  function handlePagesChange(value: string) {
    if (+value <= 0) { setPages(1); return; }
    setPages(+value);
  }

  function handleClose() {
    closeModal();
    setName("");
    setPages(1);
  }

  async function addAlbum(event: React.FormEvent) {
    event.preventDefault();
    await api.createAlbum({ name, pages })
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
          <button type="submit">Confirmar</button>
        </form>

      </article>
    </dialog>
  )
}
