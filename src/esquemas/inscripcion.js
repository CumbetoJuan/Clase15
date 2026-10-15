import { boolean, number, object, string, ref } from 'yup'
import { INICIALES } from '../datos/iniciales.js'

// ['bulbasaur', 'charmander', 'squirtle']
const NOMBRES_INICIALES = INICIALES.map(
  (inicial) => inicial.nombre
)

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
  email: string()
    .trim()
    .required('El email es obligatorio')
    .email('Ese email no es válido'),
  confirmarEmail: string()
    .required('Repetí tu email')
    .oneOf(
      [ref('email')],  // ref('email') hace referencia al valor del campo "email"
      'Los emails no coinciden'
  ),

  // 🚧 edad:   (pista: number() y typeError)
  edad: number()
    .typeError('Poné tu edad (un número)')
    .integer('Sin decimales')
    .min(10, 'Para la Liga hay que tener 10 años o más')
    .max(99, 'Máximo 99'),

  // 🚧 inicial:   (pista: oneOf con NOMBRES_INICIALES)
inicial: string()
  .oneOf(
    ['', ...NOMBRES_INICIALES],
    'Ese no es un inicial de Kanto'
  )
  .required('Elegí tu Pokémon inicial'),
  // 🚧 reglas:   (pista: boolean() y oneOf([true], …))
   reglas: boolean()
    .oneOf(
      [true],
      'Tenés que aceptar las reglas de la Liga'
    )
})
