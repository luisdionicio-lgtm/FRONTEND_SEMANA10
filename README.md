# Portal 137 · Frontend Semana 10

Explorador de Rick y Morty con búsqueda en tiempo real, fichas completas, animaciones y carruseles. Incluye también la Pokédex del ejercicio 1.

## Ejecutar

Requisitos: Node.js 24 LTS y npm.

```bash
npm ci
npm run dev
```

Abrir la dirección que indique Next.js, normalmente `http://localhost:3000`. Si el puerto está ocupado, Next.js puede usar 3001.

```bash
npm run lint
npm audit
npm run build
npm start
```

Detener el servidor de producción antes de volver a ejecutar el build y reiniciarlo después. Evita que un proceso anterior solicite archivos CSS o JavaScript de otra compilación.

## Rutas y estrategias de renderizado

| Ruta                           | Estrategia                                    | Justificación                                                                                                                                                  |
| ------------------------------ | --------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/`                            | SSR con `connection()`; API con `force-cache` | La portada se renderiza ante cada petición y reutiliza datos de la API para reducir llamadas. Renderizar en servidor no significa consultar siempre el origen. |
| `/personajes`                  | SSG + ISR, 10 días                            | El catálogo inicial puede servirse como HTML generado durante el build. Sus datos cambian poco.                                                                |
| `/personajes/[id]`             | SSG + ISR, 10 días                            | `generateStaticParams` recorre toda la paginación de la API y genera las 826 fichas disponibles. Se usa ID para evitar nombres duplicados.                     |
| `/api/characters`              | Peticiones dinámicas sin caché                | Proxy de búsqueda con validación y host fijo; admite nombre, estado, tipo, género y página.                                                                    |
| Búsqueda y paginación          | CSR con `useState` y `useEffect`              | Actualizan los resultados sin recargar el documento. Incluyen debounce de 350 ms y cancelación de solicitudes anteriores.                                      |
| `/pokemon` y `/pokemon/[name]` | SSG + ISR, 24 horas                           | Conservan el ejercicio 1 y sus 151 páginas de detalle.                                                                                                         |

La consigna solicita SSR y SSG para el listado. Se muestran de forma verificable en dos rutas: la portada usa SSR con datos cacheados y `/personajes` ofrece la variante estática. Un único render de página no se etiqueta simultáneamente como SSR y SSG.

`864000` segundos equivale a 10 días. Cuando el contenido vence, una petición puede activar su regeneración; no es una tarea programada que se ejecute sin visitas. Los personajes nuevos pueden generarse bajo demanda y se incorporan al conjunto prerenderizado en el siguiente build. La prueba valida el manifiesto, no simula el paso de diez días.

## Funcionalidades

- Los cuatro filtros pueden combinarse y la paginación conserva su estado.
- Estados de carga, reintento, resultados vacíos y página 404.
- Ficha con ID, nombre, imagen, estado, especie, tipo, género, origen, ubicación, episodios, URL y fecha de creación.
- Carruseles de personajes destacados y episodios con nombre, código y fecha.
- Navegación al personaje anterior y siguiente.
- Diseño adaptable, lazy loading en tarjetas, navegación por teclado y reducción de movimiento según las preferencias del sistema.
- APIs públicas sin claves. Consulta [SECURITY.md](SECURITY.md) para medidas y límites.

## Verificación funcional

Después del build, iniciar producción en otra terminal y ejecutar:

```bash
npm start -- --port 3001
npm run verify
```

Si se utiliza otro puerto:

```bash
TEST_BASE_URL=http://localhost:3000 npm run verify
```

La verificación comprueba SSR, las 826 rutas prerenderizadas, ISR de 10 días, cabeceras, filtros, paginación, resultados vacíos, validaciones y 404. Las pruebas de red necesitan que las APIs públicas estén disponibles.

## Despliegue en Vercel

1. Importar este repositorio desde Vercel.
2. Seleccionar el framework Next.js y Node.js 24.x.
3. Usar `npm ci` para instalar y `npm run build` para compilar.
4. No se necesitan variables de entorno.
5. Publicar y verificar portada, búsqueda, detalle y Pokédex.

El estado real del despliegue y las evidencias se documentan en [docs/TAREA.md](docs/TAREA.md). Un repositorio publicado no equivale a una aplicación desplegada.

## Evidencias

[Desarrollo y conclusiones](docs/TAREA.md) · [Resultado del build](docs/build.txt) · [Pruebas funcionales](docs/verification.txt)

## Fuentes

- [Documentación oficial de Rick and Morty API](https://rickandmortyapi.com/documentation)
- [Next.js App Router](https://nextjs.org/docs/app)

Proyecto educativo sin afiliación con los titulares de Rick y Morty. Los nombres, imágenes y datos proceden de la API pública.
