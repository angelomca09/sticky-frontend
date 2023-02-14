import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import api from '../../api';
import { ISticker } from '../../interfaces/ISticker';

interface IStickerModalProps {
  isOpen: boolean;
  closeModal: () => void;
  updateInfo: () => Promise<void>;
  submit: (stickerId: string) => Promise<void>;
  sticker?: ISticker;
}

export const StickerModal = ({ isOpen, closeModal, updateInfo, sticker, submit }: IStickerModalProps) => {

  const [name, setName] = useState("");
  const [number, setNumber] = useState(1);

  const canProceed = name && number;

  function clearForm() {
    setName("");
    setNumber(1);
  }

  function handleNumberChange(value: string) {
    if (+value <= 0) { setNumber(1); return; }
    setNumber(+value);
  }

  function handleClose() {
    closeModal();
    clearForm();
  }

  useEffect(() => {
    if (!sticker) { clearForm(); return }
    setName(sticker.name);
    setNumber(sticker.number);
  }, [sticker])


  async function saveSticker(event: React.FormEvent) {
    event.preventDefault();
    if (sticker) { //EDIT
      const { _id: id } = sticker;
      await api.editSticker({ id, name, number })
        .then(() => {
          toast.success("Figurinha alterada com sucesso!");
        })
    }
    else {//ADD
      await api.addSticker({ name, number })
        .then(async (res) => {
          toast.success("Figurinha criada com sucesso!");
          await submit(res._id);
        })
    }
    updateInfo();
    handleClose();
  }

  return (
    <dialog open={isOpen} >
      <article>
        <div aria-label="Close" className="close" data-target="modal-example" onClick={handleClose}></div>
        <h3>{sticker ? "Altere a" : "Adicione uma"} figurinha</h3>
        <form onSubmit={saveSticker}>
          <input type="text" placeholder="Nome" value={name} onChange={(event) => setName(event.target.value)} />
          <input type="number" placeholder="Número" value={number} min={1} onChange={(event) => handleNumberChange(event.target.value)} />
          <button type="submit" disabled={!canProceed}>Confirmar</button>
        </form>
      </article>
    </dialog>
  )
}
