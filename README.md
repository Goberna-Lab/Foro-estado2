# Foro de Estado — Licencia Internacional

Landing de Grupo Goberna para el modelo de licenciamiento internacional del Foro de Estado.
React + TypeScript + Vite.

## Resoluciones

La landing se trabaja solo en dos resoluciones:

- **Laptop:** 1366 × 600
- **Desktop:** 1920 × 1080

Todo el layout está maquetado en px del diseño (1920 de ancho) y se escala al ancho real de la
ventana con `zoom` (ver el script en `index.html`). En laptop, los textos chicos se agrandan con
las variables `--fs-*` de `src/index.css` para que sigan siendo legibles.

## Comandos

```bash
npm install
npm run dev        # http://localhost:5173
npm run build
npm run lint
npm test           # tests de Playwright en laptop y desktop
npm run capturas   # capturas de página completa en ./capturas
```

## Configuración

- Número de WhatsApp de los botones de contacto: `src/data/sitio.ts`.

## Pendiente en el diseño

- Número de WhatsApp y código QR del footer.
- Contenido de las fases 02–04 (Metodología) y descripciones de los puntos 02–05 (¿Qué hace
  escalable…?).
