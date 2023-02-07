import { useState } from 'react';
import ILogin from '../interfaces/ILogin';
import { getUser, clearStorage } from '../services/user'
import { themeButtonSwitch } from '../ts/theme-switcher'

function Logout() {
  clearStorage();
  window.location.reload();
}

export const Navbar = () => {

  const [user, setUser] = useState<ILogin>(getUser()!);

  return (
    <nav className="container-fluid">
      <ul><li><a href="/" className='contrast' ><strong>Sticky</strong></a></li></ul>
      <ul>
        <li>
          <details role="list" dir="rtl">
            <summary aria-haspopup="listbox" role="link" className="secondary">Theme</summary>
            <ul role="listbox">
              <li><a href="#" data-theme-switcher="dark" onClick={themeButtonSwitch}>Dark</a></li>
              <li><a href="#" data-theme-switcher="light" onClick={themeButtonSwitch}>Light</a></li>
            </ul>
          </details>
        </li>
        <li><div>{user.profile?.username}</div></li>
        <li>
          <button className='outline contrast' onClick={Logout}>Logout</button>
        </li>
      </ul>
    </nav>
  )
}
