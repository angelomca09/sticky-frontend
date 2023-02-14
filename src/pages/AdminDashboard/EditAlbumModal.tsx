import { useState, useEffect } from "react";
import { FaEdit, FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import api from "../../api";
import { IAlbumWithStickers } from "../../interfaces/IAlbum";
import { ISticker } from "../../interfaces/ISticker";
import { Button } from "../../layout/Button";
import { StickerModal } from "./StickerModal";

interface IEditAlbumModalProps {
  albumId?: string;
  isOpen: boolean;
  closeModal: () => void;
  updateAlbums: () => Promise<void>;
}

export const EditAlbumModal = ({ albumId, isOpen, closeModal, updateAlbums }: IEditAlbumModalProps) => {

  const [albumStickers, setAlbumStickers] = useState<ISticker[]>([]);
  const [name, setName] = useState("");
  const [pages, setPages] = useState(1);

  const canProceed = name && pages;

  const [filterText, setFilterText] = useState("");
  const filteredStickers = filterText ? albumStickers.filter(a => a.name.toLowerCase().includes(filterText.trim().toLowerCase())) : albumStickers;
  const albumTotalCount = albumStickers.length ?? 0;
  const [selectedSticker, setSelectedSticker] = useState<ISticker | null>(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleteStickerModalOpen, setIsDeleteStickerModalOpen] = useState(false);
  const [isStickerModalOpen, setIsStickerModalOpen] = useState(false);

  async function getAlbumInfo(albumId: string) {
    return api.getAlbum(albumId).then(album => {
      setName(album.name);
      setPages(album.pages);
      setAlbumStickers(album.stickers)
    })
  }

  function clearForm() {
    setName("");
    setPages(1);
    setAlbumStickers([]);
  }

  async function updateAll() {
    if (!albumId) return
    await getAlbumInfo(albumId);
    await updateAlbums();
  }

  useEffect(() => {
    if (albumId)
      getAlbumInfo(albumId)

    else clearForm();

  }, [albumId])

  function handleStickerModalOpen(sticker?: ISticker) {
    if (sticker)
      setSelectedSticker(sticker);
    setIsStickerModalOpen(true);
  }

  function handleStickerModalClose() {
    setIsStickerModalOpen(false);
    setSelectedSticker(null);
  }

  function handlePagesChange(value: string) {
    if (+value <= 0) { setPages(1); return; }
    setPages(+value);
  }

  function handleRemoveStickerOpen(sticker: ISticker) {
    setSelectedSticker(sticker);
    setIsDeleteStickerModalOpen(true);
  }

  function handleRemoveStickerClose() {
    setSelectedSticker(null);
    setIsDeleteStickerModalOpen(false);
  }

  async function addStickerToAlbum(stickerId: string) {
    if (!albumId) return
    await api.addStickerToAlbum({ stickerId, albumId })
  }

  async function deleteAlbum(albumId?: string) {
    if (!albumId) return;
    await api.deleteAlbum(albumId).then(async () => {
      toast.success("Álbum removido com sucesso!")
      await updateAlbums();
      setIsDeleteModalOpen(false);
      closeModal();
    })
  }

  async function deleteSticker(stickerId?: string) {
    if (!stickerId) return;
    await api.deleteSticker(stickerId).then(async () => {
      toast.success("Figurinha removida com sucesso!")
      await updateAll();
      handleRemoveStickerClose();
    })
  }

  async function editAlbum(event: React.FormEvent) {
    event.preventDefault();
    if (!albumId) return;
    await api.editAlbum({ id: albumId, name, pages, stickers: albumStickers.map(s => s._id) })
      .then(() => {
        toast.success("Álbum salvo com sucesso!");
        updateAll();
      })
  }

  return (
    <>

      <dialog open={isOpen} >
        <article>
          <div aria-label="Close" className="close" data-target="modal-example" onClick={closeModal}></div>

          <form className="no-margin" onSubmit={editAlbum}>
            <label htmlFor="name">Nome</label>
            <input id="name" type="text" value={name} onChange={(event) => setName(event.target.value)} />
            <label htmlFor="pages">Páginas</label>
            <input id="pages" type="number" value={pages} min={1} onChange={(event) => handlePagesChange(event.target.value)} />
            <label htmlFor="">&nbsp;</label>
            <div className="form-buttons">
              <span className="delete-text" onClick={() => setIsDeleteModalOpen(true)}><small>Excluir álbum</small></span>
              <button type="submit" disabled={!canProceed}>Salvar</button>
            </div>
          </form>
          <hr />
          <p>&nbsp;</p>
          <div className="form-buttons ">
            <h4>Figurinhas: {albumTotalCount} </h4>
            <button title="Adicionar figurinha" onClick={() => handleStickerModalOpen()}>Adicionar Figurinha</button>
          </div>
          <input type="search" value={filterText} placeholder="Filtrar" onChange={(event) => setFilterText(event.target.value)} />
          <div className="stickers">
            {filteredStickers.map((sticker, i) => {
              return (
                <div key={i} >
                  <h4>{sticker.number}. {sticker.name}</h4>
                  <div className="edit-buttons">
                    <Button contrasted onClick={() => handleStickerModalOpen(sticker)} ><FaEdit /></Button>
                    <Button contrasted onClick={() => handleRemoveStickerOpen(sticker)} ><FaTrash /></Button>
                  </div>
                </div>
              )
            })}
          </div>
        </article>
      </dialog>

      <StickerModal submit={addStickerToAlbum} sticker={selectedSticker ?? undefined} isOpen={isStickerModalOpen} closeModal={handleStickerModalClose} updateInfo={updateAll} />

      <dialog open={isDeleteModalOpen} >

        <article>
          <h3>Deseja mesmo remover o álbum?</h3>

          <footer>
            <button className="secondary" onClick={() => setIsDeleteModalOpen(false)}>Cancelar</button>
            <button onClick={() => deleteAlbum(albumId)}>Confirmar</button>
          </footer>
        </article>

      </dialog>

      <dialog open={isDeleteStickerModalOpen} >

        <article>
          <h3>Deseja mesmo remover a figurinha?</h3>

          <footer>
            <button className="secondary" onClick={handleRemoveStickerClose}>Cancelar</button>
            <button onClick={() => deleteSticker(selectedSticker?._id)}>Confirmar</button>
          </footer>
        </article>

      </dialog>

    </>
  )
}
