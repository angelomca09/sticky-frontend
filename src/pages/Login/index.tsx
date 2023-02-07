import React, { useState } from "react"
import api from "../../api";
import { Navbar } from "../../layout/Navbar"
import './styles.css'

export const Login = () => {

  const [logintype, setLogintype] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");

  function handleLoginTypeClick(value: boolean) {
    setLogintype(value)
  }

  const canLogin = (username && password && (logintype ? (email && telephone) : true));

  function handleLoginClick(event: React.FormEvent) {
    event.preventDefault();

    switch (logintype) {
      case true:
        api.singIn({ username, password, email, telephone })
        break;
      case false:
        api.logIn({ username, password })
        break;
    }
  }

  return (
    <>
      <main className="container">
        <article className="grid">
          <div>
            <div className="form-header">
              <button className={`outline ${!logintype ? "secondary" : ""}`} onClick={() => handleLoginTypeClick(true)} >Cadastrar</button>
              <button className={`outline ${logintype ? "secondary" : ""}`} onClick={() => handleLoginTypeClick(false)} >Entrar</button>
            </div>
            <form>
              <input type="text" name="login" placeholder="Login" aria-label="Login" autoComplete="nickname" required value={username} onChange={(event) => setUsername(event.target.value)} />
              <input type="password" name="password" placeholder="Password" aria-label="Password" autoComplete="current-password" required value={password} onChange={(event) => setPassword(event.target.value)} />
              {logintype ?
                <>
                  <input type="email" name="email" placeholder="Email" aria-label="Email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} />
                  <input type="text" name="telephone" placeholder="Telephone" aria-label="telephone" autoComplete="telephone" required value={telephone} onChange={(event) => setTelephone(event.target.value)} />
                </>
                : <></>}
              <button type="submit" disabled={!canLogin} onClick={handleLoginClick}>Continuar</button>
            </form>
          </div>
          <div className="login-image"></div>
        </article>
      </main>
    </>
  )
}
