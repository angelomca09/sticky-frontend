import { FaArrowLeft } from "react-icons/fa"
import { Link } from "react-router-dom"

export const Albums = () => {
  return (
    <main className="container">
      <div>
        <Link to="/">
          <button className="add outline contained rounded"
            title="Voltar"><FaArrowLeft />
          </button>
        </Link>
      </div>
      <h1>Meus Álbuns</h1>
      <div className="grid">

      </div>
    </main>
  )
}
