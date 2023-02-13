import React from 'react'
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import "./styles.css"

interface ISearchBarProps {
  to?: string;
  handleSearchChange: (value: string) => void;
  placeholder?: string;
}

export const SearchBar = ({ to, handleSearchChange, placeholder = "" }: ISearchBarProps) => {
  return (
    <div className="container">
      <div className="search-bar">
        {to ?
          <div className="back-button">
            <Link to={to}>
              <button className="add outline contained rounded"
                title="Voltar"><FaArrowLeft />
              </button>
            </Link>
          </div>
          : ""}
        <input type="search" placeholder={`Pesquisar ${placeholder}`} onChange={(event) => handleSearchChange(event.target.value)} />

      </div>
    </div>
  )
}
