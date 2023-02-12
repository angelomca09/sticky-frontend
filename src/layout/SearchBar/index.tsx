import React from 'react'
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import "./styles.css"

interface ISearchBarProps {
  to?: string;
  handleSearchChange?: (value: string) => void;
  hasSearch?: boolean;
}

export const SearchBar = ({ to, handleSearchChange, hasSearch = true }: ISearchBarProps) => {
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
        {hasSearch ?

          <input type="search" />
          : ""}
      </div>
    </div>
  )
}