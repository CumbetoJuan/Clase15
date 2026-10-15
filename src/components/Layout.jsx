import { Link } from 'react-router'

// 🚧 PASO 2 · El layout: lo que se repite en todas las páginas
//
//   1. Los links del <nav> son <a href>: cada click RECARGA toda la página
//      (miralo en la pestaña Red). Cambialos por <NavLink to="…">.
//      El CSS ya pinta de blanco al link que tiene la clase "active".
//      Pista: ¿por qué "Inicio" queda activo en todas las páginas? Buscá la prop "end".
//   2. Reemplazá el comentario del <main> por el componente que dibuja la ruta hija.
//   (No te olvides de importar lo que uses desde 'react-router'.)
function Layout() {
  return (
    <>
      <header className="cabecera">
        <div className="cabecera-interior">
          <Link to="/" className="logo">
            <img src="/pokeball.svg" alt="" width="28" height="28" />
            Liga Pokémon
          </Link>

          <nav className="nav">
            <a href="/">Inicio</a>
            <a href="/inscripcion">Inscripción</a>
          </nav>
        </div>
      </header>

      <main className="contenido">
        {/* 🚧 Acá tiene que aparecer la página de la ruta hija */}
      </main>

      <footer className="pie">Ejercicio Sprint 5 · React Router + react-hook-form + yup</footer>
    </>
  )
}

export default Layout
