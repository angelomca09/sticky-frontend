import { useState } from 'react';
import ILogin from '../../interfaces/ILogin';
import { getUser, clearStorage } from '../../services/user'
import { SearchBar } from '../SearchBar';
import "./styles.css"

function Logout() {
  clearStorage();
  window.location.reload();
}

export const Navbar = () => {

  const [user, setUser] = useState<ILogin>(getUser()!);


  function handleSearchChange(text: string) {
    //TODO: Fetch users
  }

  return (
    <nav className="container-fluid">
      <ul><li><a href="/" className='contrast' ><strong>Sticky</strong></a></li></ul>
      <ul><SearchBar placeholder='colecionador' handleSearchChange={handleSearchChange} /></ul>
      <ul>

        <li><div>{user.profile?.username}</div></li>
        <li>
          <button className='outline contrast' onClick={Logout}>Logout</button>
        </li>
      </ul>
    </nav>
  )
}
