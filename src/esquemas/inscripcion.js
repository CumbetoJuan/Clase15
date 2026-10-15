import { boolean, number, object, string } from 'yup'
import { INICIALES } from '../datos/iniciales.js'

// ['bulbasaur', 'charmander', 'squirtle']
const NOMBRES_INICIALES = INICIALES.map((inicial) => inicial.nombre)

// 🚧 PASO 3 · El esquema: todas las reglas del formulario, en un solo lugar.
// El campo "nombre" ya está hecho como ejemplo. Completá los otros cuatro con
// las reglas y los mensajes EXACTOS de la tabla del README.
export const esquemaInscripcion = object({
  nombre: string()
    .trim()
    .required('Poné tu nombre de entrenador')
    .min(3, 'Mínimo 3 letras')
    .max(20, 'Máximo 20 letras'),

  // 🚧 email:

  // 🚧 edad:   (pista: number() y typeError)

  // 🚧 inicial:   (pista: oneOf con NOMBRES_INICIALES)

  // 🚧 reglas:   (pista: boolean() y oneOf([true], …))
})
