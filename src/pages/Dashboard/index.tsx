import { Navbar } from "../../layout/Navbar"

export const Dashboard = () => {
  return (
    <>
      <Navbar />
      <main className="container">
        <div className="grid">
          <article><h1>Álbuns</h1></article>
          <article><h1>Figurinhas</h1></article>
        </div>
      </main>
    </>
  )
}
