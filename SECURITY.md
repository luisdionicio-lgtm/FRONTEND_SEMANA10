# Seguridad

Esta aplicación educativa consulta únicamente APIs públicas y no necesita claves ni contraseñas.

- Las entradas de búsqueda se validan y limitan a 100 caracteres. Los números de página y los filtros enumerados se validan en el servidor.
- El proxy solo consulta un host y una ruta fijos. Los usuarios no pueden proporcionar una URL de destino.
- Las búsquedas tienen un tiempo máximo de espera y cancelan solicitudes anteriores en el navegador.
- React escapa el contenido de texto. No se utiliza `dangerouslySetInnerHTML`.
- Las imágenes remotas se limitan a los hosts y rutas declarados en Next.js.
- Se incluyen cabeceras contra carga en marcos, detección de tipos MIME y uso de cámara, micrófono y geolocalización.
- La política CSP limita marcos, objetos y cambios de URL base. Es una política parcial, no una protección completa contra XSS.
- `.env*`, `.vercel`, dependencias y resultados de compilación se excluyen de Git.
- CI ejecuta lint, auditoría de producción y build con permisos de lectura sobre el repositorio.

Antes de publicar cambios: ejecutar `npm ci`, `npm run lint`, `npm audit`, `npm run build` y revisar los archivos preparados con `git diff --cached`.

No se afirma seguridad absoluta. Si se añade autenticación, datos privados o funciones de escritura, se necesitan controles adicionales. El proxy público no tiene limitación de solicitudes propia; para tráfico elevado debe añadirse protección en el proveedor de hosting.

Para comunicar una vulnerabilidad, utilizar el reporte privado de GitHub si el propietario lo habilita. No publicar credenciales o datos sensibles en issues.
