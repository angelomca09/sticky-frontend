import React from 'react'
import { FaStickyNote } from 'react-icons/fa';
import "./styles.css"

interface IButtonProps {
  onClick?: () => void;
  contrasted?: boolean;
  loading?: boolean;
  outlined?: boolean;
}

export const Button: React.FC<React.PropsWithChildren & IButtonProps> = ({ children, onClick, contrasted = false, loading = false, outlined = false }) => {
  return (
    <div className='custom-button'>
      <button className={`add contained rounded ${contrasted ? "contrast" : ""} ${outlined ? "outlined" : ""}`} aria-busy={loading}
        title="Voltar" onClick={onClick}>
        {loading ? "" : (children ?? <FaStickyNote />)}
      </button>
    </div>
  )
}
