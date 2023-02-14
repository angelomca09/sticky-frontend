import { useState } from 'react';
import { getUser, clearStorage } from '../../services/user'
import { SearchBar } from '../SearchBar';
import "./styles.css"

function Logout() {
  clearStorage();
  window.location.reload();
}

export const Navbar = () => {

  const user = getUser()!;

  const [username, setUsername] = useState("")

  function handleSearchChange(text: string) {
    setUsername(text)
  }

  function handleSearchBarSubmit(event: React.FormEvent) {
    event.preventDefault();
    window.location.replace(`/perfil/${username}`)
  }

  return (
    <nav className="container-fluid">
      <ul><li><a href="/" className='contrast' ><strong>Sticky</strong></a></li></ul>
      <ul>
        <form className='no-margin' onSubmit={handleSearchBarSubmit}>
          <SearchBar placeholder='colecionador' handleSearchChange={handleSearchChange} />
        </form>
      </ul>
      <ul>

        <li><div>{user.profile?.username}</div></li>
        <li>
          <button className='outline contrast' onClick={Logout}>Logout</button>
        </li>
      </ul>
    </nav>
  )
}
