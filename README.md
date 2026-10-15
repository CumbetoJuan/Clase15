# 🔴 Ejercicio · Liga Pokémon: rutas anidadas + formulario con react-hook-form y yup

⏱ **20 minutos** · 🛠 Proyecto de Vite + React · Node 22.22+

```bash
npm install
npm run dev     # → http://localhost:5173
```

Las librerías ya están en el `package.json`: `react-router`, `react-hook-form`, `yup` y `@hookform/resolvers` (el "puente" entre react-hook-form y yup). No hace falta instalar nada más.

## La situación

La app de inscripción a la Liga Pokémon **anda a medias**:

- Las rutas están sueltas: no hay cabecera ni pie, y una URL que no existe (probá `/pikachu`) muestra la pantalla en blanco.
- Los links del menú son `<a href>` y recargan toda la página.
- El formulario no valida nada: podés inscribirte sin nombre, con 3 años y sin inicial.
- Cuando la inscripción sale bien… no pasa nada en pantalla (solo un `console.log`).

Tu misión: completar el código en **cuatro archivos**. Todo lo demás (páginas, servicio, CSS) ya está hecho.

## Pasos

**1 · Rutas anidadas — `src/App.jsx` (4 min).** Meté las tres rutas adentro de una **ruta de layout** `<Route element={<Layout />}>`. La de `/` pasa a ser la ruta `index`. Las hijas van **sin la barra** (`path="inscripcion"`). Agregá al final una ruta `path="*"` que muestre `<NoEncontrada />`.

**2 · El layout — `src/components/Layout.jsx` (3 min).**
- Cambiá los `<a href>` del menú por `<NavLink to>`. ¿Por qué "Inicio" queda marcado en todas las páginas? Arreglalo con la prop `end`.
- Poné el `<Outlet />` adentro del `<main>`.

**3 · El esquema — `src/esquemas/inscripcion.js` (5 min).** `nombre` ya está hecho como ejemplo. Completá los otros cuatro campos con estas reglas y estos mensajes **exactos**:

| Campo | Reglas | Mensajes |
|---|---|---|
| `email` | texto, sin espacios a los costados, obligatorio, formato de email | `El email es obligatorio` · `Ese email no es válido` |
| `edad` | número entero, entre 10 y 99 | `Poné tu edad (un número)` · `Sin decimales` · `Para la Liga hay que tener 10 años o más` · `Máximo 99` |
| `inicial` | obligatorio, uno de `NOMBRES_INICIALES` | `Elegí tu Pokémon inicial` · `Ese no es un inicial de Kanto` |
| `reglas` | tiene que ser `true` | `Tenés que aceptar las reglas de la Liga` |

**4 · Conectar el formulario — `src/paginas/Inscripcion.jsx` (6 min).**
- a. Pasale a `useForm` el `resolver: yupResolver(esquemaInscripcion)` (se importa de `@hookform/resolvers/yup`).
- b. Sacá `isSubmitting` de `formState`.
- c. Registrá los cuatro campos que faltan con `{...register('…')}` y mostrá su error con `<ErrorCampo mensaje={errors.….message} />`, igual que en `nombre`.
- d. El botón: deshabilitado mientras se envía y con el texto `Inscribiendo…`.

**5 · Navegar a la bienvenida — `src/paginas/Inscripcion.jsx` (2 min).** Cuando el POST sale bien, usá `useNavigate` para ir a `/bienvenida?nombre=…&inicial=…&carnet=…` (el carnet es el `id` que devuelve la API). Pista: `new URLSearchParams({ … })` arma el query string por vos.

## ✅ Listo cuando…

- La cabecera y el pie aparecen en todas las páginas, y `/pikachu` muestra el Snorlax del 404.
- El link de la página actual se ve en blanco, y navegar **no** recarga la página (mirá la pestaña Red: no se vuelve a pedir el HTML).
- Enviar el formulario vacío muestra un mensaje debajo de cada campo.
- Con datos válidos, el botón dice "Inscribiendo…" y después aparece tu carnet en `/bienvenida`.
- Si recargás `/bienvenida?…`, el carnet sigue ahí.

## ➕ Plus (si te sobra tiempo)

1. Agregá un campo **"Repetí el email"** (`confirmarEmail`) que tenga que coincidir con `email`. Pista: `ref('email')` de yup.
2. Hacé que los errores aparezcan **al salir de cada campo** y no recién al enviar. Pista: la opción `mode` de `useForm`.

## 🧠 Para pensar

1. ¿Qué diferencia hay entre una ruta de layout y una ruta index?
2. ¿Por qué el carnet va en el query string y no en un `useState`?
3. Escribí en el formulario con el componente abierto en React DevTools (Profiler o "Highlight updates"): ¿se vuelve a renderizar con cada tecla? ¿Por qué?
4. Si el usuario borra el `disabled` del botón desde DevTools, ¿se puede mandar el formulario con datos inválidos?

1) Tenemos que la ruta layout definte una estructura común de las páginas por ej encabezmao y pie, mientras que index indica que página vamos a mostrar por defecto 
2) Utilizamos query string para conservar los datos del tipo carnet al recargar la página y se comparten mediante la URL "http://localhost:5173/bienvenida?nombre=aaa&inicial=bulbasaur&carnet=11" En cambio con useState, al hacer F5 en la página limpia ese estado y reinica a su valor inicial, lo mismo pasa si se cierra la pestaña
3) React hook form evita renderizaciones innecesarias con cada tecla ya que utiliza campos no controlados, pero puede volver a renderizar cuando cambian los errores o el estado de la inscripcion
4) Al quitar disabled no evitamos la validación de yup, por lo que handlesubmit impide ejecutar onSubmit con datos invalidos, pero en el backend debemos validar esos datos por seguridad.
