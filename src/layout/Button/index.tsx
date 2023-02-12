import React from 'react'
import { FaStickyNote } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import "./styles.css"

export const Buttton: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className='custom-button'>
      <Link to={"/"}>
        <button className="add outline contained rounded"
          title="Voltar">
          {children ?? <FaStickyNote />}
        </button>
      </Link>
    </div>
  )
}
