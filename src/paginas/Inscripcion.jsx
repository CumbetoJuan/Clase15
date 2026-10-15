import { useForm } from 'react-hook-form'
import ErrorCampo from '../components/ErrorCampo.jsx'
import { INICIALES, imagenPokemon } from '../datos/iniciales.js'
import { esquemaInscripcion } from '../esquemas/inscripcion.js'
import { inscribirEntrenador } from '../servicios/inscripciones.js'

function Inscripcion() {
  // 🚧 PASO 4 · Conectar el formulario
  //   a. Pasale a useForm el resolver de yup con esquemaInscripcion.
  //      (import { yupResolver } from '@hookform/resolvers/yup')
  //   b. Sacá también isSubmitting de formState.
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: { nombre: '', email: '', edad: '', inicial: '', reglas: false },
  })

  // onSubmit solo se ejecuta si el esquema dio todo OK.
  async function onSubmit(datos) {
    try {
      const entrenador = await inscribirEntrenador(datos)
      console.log('Inscripto:', entrenador)

      // 🚧 PASO 5 · Navegar a la bienvenida
      //   Con useNavigate, mandá al usuario a:
      //   /bienvenida?nombre=…&inicial=…&carnet=…   (carnet = entrenador.id)
      //   Pista: new URLSearchParams({ … }) arma el query string por vos.
    } catch (err) {
      // Error de la API (no de un campo): ya está resuelto.
      setError('root', { message: err.message })
    }
  }

  return (
    <>
      <h1 className="titulo">Inscripción a la Liga</h1>

      <form className="formulario" onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* ✅ Ejemplo hecho: label + input con register + error. Copiá este patrón. */}
        <div className="campo">
          <label htmlFor="nombre">Nombre de entrenador</label>
          <input id="nombre" type="text" {...register('nombre')} />
          <ErrorCampo mensaje={errors.nombre?.message} />
        </div>

        {/* 🚧 PASO 4 · c. Conectá los cuatro campos que siguen y mostrá su error. */}
        <div className="campo">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" />
        </div>

        <div className="campo">
          <label htmlFor="edad">Edad</label>
          <input id="edad" type="number" />
        </div>

        {/* Pista: los tres radios llevan el MISMO register('inicial'). */}
        <fieldset className="campo">
          <legend>Elegí tu inicial</legend>
          <div className="opciones">
            {INICIALES.map((inicial) => (
              <label key={inicial.id} className="opcion">
                <img src={imagenPokemon(inicial.id)} alt="" width="72" height="72" />
                <input type="radio" value={inicial.nombre} />
                {inicial.nombre}
              </label>
            ))}
          </div>
        </fieldset>

        <div className="campo">
          <label className="check">
            <input type="checkbox" />
            Acepto las reglas de la Liga (nada de Rare Candies)
          </label>
        </div>

        {errors.root && <p className="error-envio">😵 {errors.root.message}</p>}

        {/* 🚧 PASO 4 · d. Deshabilitá el botón mientras se envía y cambiá el texto a "Inscribiendo…" */}
        <button type="submit" className="boton">
          Inscribirme
        </button>
      </form>
    </>
  )
}

export default Inscripcion
