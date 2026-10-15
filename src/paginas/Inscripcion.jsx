
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate } from 'react-router'

import ErrorCampo from '../components/ErrorCampo.jsx'
import { INICIALES, imagenPokemon } from '../datos/iniciales.js'
import { esquemaInscripcion } from '../esquemas/inscripcion.js'
import { inscribirEntrenador } from '../servicios/inscripciones.js'

function Inscripcion() {
  const navigate = useNavigate()

  // Configuración del formulario y validación con Yup
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(esquemaInscripcion),
    mode: 'onBlur', // Validación al salir del campo
    defaultValues: {
      nombre: '',
      email: '',
      confirmarEmail: '',
      edad: '',
      inicial: '',
      reglas: false,
    },
  })

  // Se ejecuta únicamente si el formulario es válido
  async function onSubmit(datos) {
    try {
      const entrenador = await inscribirEntrenador(datos)

      console.log('Inscripto:', entrenador)

      // Construimos los parámetros de la URL
      const parametros = new URLSearchParams({
        nombre: datos.nombre,
        inicial: datos.inicial,
        carnet: String(entrenador.id),
      })

      // Navegamos a la página de bienvenida
      navigate(`/bienvenida?${parametros.toString()}`)

    } catch (err) {
      setError('root', {
        message: err.message,
      })
    }
  }

  return (
    <>
      <h1 className="titulo">Inscripción a la Liga</h1>

      <form
        className="formulario"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >

        {/* NOMBRE */}
        <div className="campo">
          <label htmlFor="nombre">
            Nombre de entrenador
          </label>

          <input
            id="nombre"
            type="text"
            {...register('nombre')}
          />

          <ErrorCampo mensaje={errors.nombre?.message} />
        </div>

        {/* EMAIL */}
        <div className="campo">
          <label htmlFor="email">Email</label>

          <input
            id="email"
            type="email"
            {...register('email')}
          />

          <ErrorCampo mensaje={errors.email?.message} />
        </div>

        {/* CONFIRMAR EMAIL */}
        <div className="campo">
          <label htmlFor="confirmarEmail">
            Repetí tu email
          </label>

          <input
             id="confirmarEmail"
             type="email"
            {...register('confirmarEmail')}
          />

          <ErrorCampo
              mensaje={errors.confirmarEmail?.message}
          />
        </div>
        {/* EDAD */}
        <div className="campo">
          <label htmlFor="edad">Edad</label>

          <input
            id="edad"
            type="number"
            {...register('edad')}
          />

          <ErrorCampo mensaje={errors.edad?.message} />
        </div>

        {/* POKÉMON INICIAL */}
        <fieldset className="campo">
          <legend>Elegí tu inicial</legend>

          <div className="opciones">
            {INICIALES.map((inicial) => (
              <label
                key={inicial.id}
                className="opcion"
              >
                <img
                  src={imagenPokemon(inicial.id)}
                  alt=""
                  width="72"
                  height="72"
                />

                <input
                  type="radio"
                  value={inicial.nombre}
                  {...register('inicial')}
                />

                {inicial.nombre}
              </label>
            ))}
          </div>

          <ErrorCampo mensaje={errors.inicial?.message} />
        </fieldset>

        {/* ACEPTACIÓN DE REGLAS */}
        <div className="campo">
          <label className="check">
            <input
              type="checkbox"
              {...register('reglas')}
            />

            Acepto las reglas de la Liga
            (nada de Rare Candies)
          </label>

          <ErrorCampo mensaje={errors.reglas?.message} />
        </div>

        {/* ERROR GENERAL DE LA API */}
        {errors.root && (
          <p className="error-envio">
            😵 {errors.root.message}
          </p>
        )}

        {/* BOTÓN DE ENVÍO */}
        <button
          type="submit"
          className="boton"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? 'Inscribiendo…'
            : 'Inscribirme'}
        </button>

      </form>
    </>
  )
}

export default Inscripcion
