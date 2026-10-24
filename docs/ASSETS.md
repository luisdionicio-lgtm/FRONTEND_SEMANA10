# Dirección visual y recursos

La segunda versión utiliza una dirección cinematográfica propia: negro azulado, verde portal, luz cian, tipografía Geist de gran formato, una ilustración de universo a pantalla completa y fichas con profundidad. El catálogo conserva sus filtros, paginación y renderizado original.

## Ilustración original

Archivo utilizado: `public/images/portal-universe.webp` (aproximadamente 228 KB). Se creó con la herramienta integrada ImageGen y se convirtió a WebP con Sharp para optimizar la transferencia. No contiene personajes ni logotipos; es un entorno de ciencia ficción original.

Prompt final utilizado:

> Original science-fiction environment concept art, cinematic web hero background, landscape 3:2. A monumental luminous acid-green interdimensional vortex in deep midnight navy outer space, looking through its swirling plasma surface into an alien world with tiny floating islands, teal crystals and violet mist. The central ring is organic liquid energy, emerald and chartreuse eddies, intricate bright wisps and darker turquoise depths; dark asteroid silhouettes in foreground, a small distant purple planet high at right. Brilliant glow, sophisticated painted cel-shaded animation texture, crisp contours, elegant restrained starfield. Large portal centered in right two thirds of frame, left third dark negative space blending to near-black #080d14. All outer edges very dark to blend seamlessly into a website. Absolutely no people or characters, no text, no lettering, no logos, no watermark, no interface. Create a finished original background illustration asset, not a website mockup.

## Miniaturas del equipo principal

Los cinco archivos de `public/images/crew/` proceden de `https://rickandmortyapi.com/api/character/avatar/{id}.jpeg`, para los ID 1 a 5. Son copias de presentación para evitar errores por límite de peticiones en las miniaturas. Los datos de los personajes siguen obteniéndose desde la API con la estrategia de caché documentada.

## Interacciones

- Selector de Rick, Morty, Summer, Beth y Jerry con botones y estado accesible.
- Botón Sorpréndeme: solicita una página aleatoria del catálogo y abre uno de sus personajes.
- Movimiento ambiental, destellos, barrido de tarjetas y carruseles manuales.
- Botón Pausar/Reanudar para detener animaciones. Se respeta también `prefers-reduced-motion`.
- Diseño comprobado a 1440 y 390 píxeles, sin desbordamiento horizontal.

Los filtros, los 826 detalles y los intervalos de ISR se mantienen. No se añadieron dependencias de animación ni servicios de seguimiento.
