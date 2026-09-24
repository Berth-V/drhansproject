# 🩺 Dr Hans Blog — Contexto del Proyecto

## Stack
- React + Vite + Firebase (Firestore, Auth, Storage)
- Hostinger (deploy final)
- i18n (react-i18next) — archivos en `src/locales/en.json` y `es.json`
- Motion (motion/react) para animaciones
- HashRouter (`#/ruta`)
- Colores: `--primary-color: #000`, `--secondary-color: #00c4ff`

## Plan de trabajo — Notion
- Workspace: https://app.notion.com/p/3730f0c363f08188afc5c353eb3c829c
- Base de datos del plan: https://app.notion.com/p/d4d1d52fff7343309cd3bb3320d38e8f
- **REGLA IMPORTANTE:** Respetar el orden del plan semana a semana, día a día. No adelantarse.

---

## Estado actual — Semana 1 (en progreso)

| Día | Tarea | Estado |
|---|---|---|
| Lunes | Crear proyecto Firebase + activar Firestore, Auth, Storage | ✅ Done |
| Martes | Instalar Firebase en React + primera conexión | ✅ Done |
| Miércoles | Estructura de carpetas + rutas del blog | 🔄 In progress (carry-over) |
| Jueves | Página lista de artículos conectada a Firestore | ⏳ Pendiente |
| Viernes | Página detalle de artículo funcionando | ⏳ Pendiente |

---

## ⚠️ Notas críticas — leer ANTES de continuar

1. **Archivos adelantados:** En una sesión anterior Claude se adelantó y creó estos archivos SIN haberlos trabajado ni probado:
   - `src/components/Blog/pages/BlogHome.jsx` + `.css`
   - `src/components/Blog/pages/BlogPost.jsx` + `.css`
   - `src/components/Blog/components/PostCard.jsx` + `.css`
   - `src/components/Blog/Admin/AdminPanel.jsx`
   - `src/firebase/firebase.js` + `testConnection.js`

2. **Nada está commiteado.** Todo el trabajo del blog aparece como `??` (untracked) o `modified` en git. El último commit es `03a6099 Form deleted & Contact section changed`.

3. **Los archivos existen pero el trabajo real no se hizo** — nunca se probaron, nunca se ajustaron, nunca se commitearon. No asumir que funcionan.

4. **Archivos modificados sin commitear** (además del blog):
   - `.env` — variables de Firebase
   - `.gitignore`
   - `package.json` + `pnpm-lock.yaml` — dependencias de Firebase instaladas
   - `src/App.jsx`
   - `src/AppRoutes.jsx` — rutas `/blog`, `/blog/:slug`, `/admin` agregadas
   - `src/components/Header/Header.jsx` — link "Blog" agregado al menú
   - `src/locales/en.json` + `es.json` — clave `header.blog` agregada

---

## Archivos del Blog (creados anticipadamente, pendientes de verificar)

| Archivo | Descripción |
|---|---|
| `src/firebase/firebase.js` | Config Firebase con variables de entorno |
| `src/components/Blog/pages/BlogHome.jsx` + `.css` | Lista posts de Firestore, ordenados por fecha |
| `src/components/Blog/pages/BlogPost.jsx` + `.css` | Detalle de post por slug |
| `src/components/Blog/components/PostCard.jsx` + `.css` | Tarjeta de post con imagen, categoría, título, resumen, fecha |
| `src/components/Blog/Admin/AdminPanel.jsx` | Solo esqueleto por ahora |

## Rutas registradas (AppRoutes.jsx) — pendientes de verificar
- `/blog` → BlogHome
- `/blog/:slug` → BlogPost
- `/admin` → AdminPanel

## Estructura de documento en Firestore (colección `posts`)
```
{
  title: string,
  slug: string,
  summary: string,
  content: string (HTML),
  imageUrl: string,
  category: string,
  published: boolean,
  publishedAt: Timestamp
}
```

## Header
- "Blog" ya está en el menú (en.json y es.json actualizados)
- Clave de traducción: `header.blog`

---

## 📋 Plan del día — lo que toca hacer en la próxima sesión

El usuario tiene este plan de bloques para hoy (Jueves S1):

| Bloque | Hora | Tarea |
|---|---|---|
| **Bloque 1** | 9:15–10:05 | ⬅️ **EMPEZAR AQUÍ** — Terminar Miércoles (carry-over): verificar `App.jsx`, `Header.jsx`, estructura de carpetas y rutas. Limpiar y commitear. |
| Bloque 2 | 10:15–11:05 | Página lista de artículos: conectar a Firestore — revisar `BlogHome.jsx`, correr dev server, confirmar que `/blog` carga |
| Bloque 3 | 11:15–12:05 | Renderizar lista + estilos mínimos — que los artículos aparezcan en pantalla con layout funcional |
| Bloque 4 | 12:15–12:55 | Pruebas + ajustes finales — datos cargan bien en browser, corregir lo que falle |
| Cierre | 12:55–1:00 | Marcar tareas como Done en Notion |

## 🚀 Sugerencia para arrancar la próxima sesión

1. **Revisar** `src/App.jsx` y `src/components/Header/Header.jsx` para ver qué cambios hay sin commitear
2. **Correr** `pnpm run dev` (puerto 5173) y navegar a `/#/blog` para ver si la ruta carga sin errores
3. **Si todo está limpio** → commitear el bloque de Miércoles (estructura + rutas) y marcar ✅ en Notion
4. **Luego** proceder con Bloque 2 (Firestore real)
5. **Siempre pedir autorización** antes de ejecutar o modificar algo

## Notas importantes
- La colección `posts` en Firestore está vacía — el blog mostrará "Próximamente..." hasta que haya artículos
- Para correr el proyecto: `pnpm run dev` → `http://localhost:5173`
- El dev server se configura en `.claude/launch.json` (puerto 5173)
- El usuario prefiere ir **parte por parte**, pidiendo autorización antes de ejecutar cualquier cosa
- **NO asumir que algo funciona** solo porque el archivo existe — siempre verificar en el browser
