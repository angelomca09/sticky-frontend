import { themeButtonSwitch } from '../ts/theme-switcher'

export const Navbar = () => {
  return (
    <section>
      <nav className="container-fluid">
        <ul><li><a href="./" className='contrast' onClick={(e) => e.preventDefault()}><strong>LOGO</strong></a></li></ul>
        <ul>
          <li>
            <details role="list" dir="rtl">
              <summary aria-haspopup="listbox" role="link" className="secondary">Theme</summary>
              <ul role="listbox">
                <li><a href="#" data-theme-switcher="light" onClick={themeButtonSwitch}>Light</a></li>
                <li><a href="#" data-theme-switcher="dark" onClick={themeButtonSwitch}>Dark</a></li>
              </ul>
            </details>
          </li>
        </ul>
      </nav>
    </section>
  )
}
