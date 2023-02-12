import React from 'react'
import { FaStickyNote } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import "./styles.css"

interface ILinkButton {
  to?: string;
  contrasted?: boolean;
}

export const LinkButtton: React.FC<React.PropsWithChildren & ILinkButton> = ({ children, to = "/", contrasted }) => {
  return (
    <div className='custom-button'>
      <Link to={to}>
        <button className={`add outline contained rounded ${contrasted ? "contrast" : ""}`}
          title="Voltar">
          {children ?? <FaStickyNote />}
        </button>
      </Link>
    </div>
  )
}