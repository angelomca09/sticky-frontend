import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { Navbar } from './layout/Navbar';

function App() {
  const [count, setCount] = useState(0);

  function countClick(e: React.MouseEvent) {
    e.preventDefault();
    setCount((count) => count + 1);
  }

  return (
    <>
      <Navbar></Navbar>
      <div className="container">
        <article className='App'>
          <div>
            <a href="https://vitejs.dev" target="_blank">
              <img src="/vite.svg" className="logo" alt="Vite logo" />
            </a>
            <a href="https://reactjs.org" target="_blank">
              <img src={reactLogo} className="logo react" alt="React logo" />
            </a>
          </div>
          <h1>Vite + React</h1>
          <div className="card">
            <a href='#' role={"button"} onClick={countClick}>
              count is {count}
            </a>
          </div>
          <p className="read-the-docs">
            Click on the Vite and React logos to learn more
          </p>
        </article>
      </div>
    </>
  )
}

export default App
