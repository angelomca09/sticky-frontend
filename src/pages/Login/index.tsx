import React, { useState } from "react"
import { toast } from "react-toastify";
import api from "../../api";
import { setToken, setUser } from "../../services/user";
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
          .then(res => {
            if (!res.success) { toast.error(res.message); return }
            setUser(res);
            const token = btoa(`${username}:${password}`);
            setToken(token);
            window.location.reload()
          })
        break;
      case false:
        api.logIn({ username, password })
          .then(res => {
            if (!res.success) { toast.error(res.message); return }
            setUser(res);
            const token = btoa(`${username}:${password}`);
            setToken(token);
            window.location.reload()
          })
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
            <form autoComplete="off">
              <input type="text" name="login" placeholder="Login" aria-label="Login" required value={username} onChange={(event) => setUsername(event.target.value)} />
              <input type="password" name="password" placeholder="Password" aria-label="Password" required value={password} onChange={(event) => setPassword(event.target.value)} />
              {logintype ?
                <>
                  <input type="email" name="email" placeholder="Email" aria-label="Email" required value={email} onChange={(event) => setEmail(event.target.value)} />
                  <input type="text" name="telephone" placeholder="Telephone" aria-label="telephone" required value={telephone} onChange={(event) => setTelephone(event.target.value)} />
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
