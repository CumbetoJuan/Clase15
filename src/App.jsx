import { Route, Routes } from 'react-router'
import Layout from './components/Layout.jsx' // 🚧 importado, pero todavía no se usa
import Inicio from './paginas/Inicio.jsx'
import Inscripcion from './paginas/Inscripcion.jsx'
import Bienvenida from './paginas/Bienvenida.jsx'
import NoEncontrada from './paginas/NoEncontrada.jsx' // 🚧 importado, pero todavía no se usa

// 🚧 PASO 1 · Rutas anidadas
//
// Hoy las tres rutas están "sueltas": no comparten la cabecera ni el pie, y si
// entrás a una URL que no existe (probá /pikachu) se ve la pantalla en blanco.
//
// Tu misión:
//   1. Meté las tres rutas ADENTRO de una ruta de layout: <Route element={<Layout />}>…</Route>
//      (la ruta de layout NO lleva path).
//   2. La de "/" pasa a ser la ruta index de ese layout.
//   3. Las hijas van sin la barra inicial: path="inscripcion", path="bienvenida".
//   4. Agregá una última ruta hija con path="*" que muestre <NoEncontrada />.
function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Inicio />} />
        <Route path="inscripcion" element={<Inscripcion />} />
        <Route path="bienvenida" element={<Bienvenida />} />
        <Route path="*" element={<NoEncontrada />} />
      </Route>
    </Routes>
  )
}

export default App
