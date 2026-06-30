# Chat-with-furi — Development Log

## Goal
- Transform the chat app into a complete PWA with selection mode, persistent reactions, profile customization, and automatic updates.

## Constraints & Preferences
- Romantic pink/rose palette; each wallpaper has its own accent
- Premium glassmorphism UI, smooth animations, vanilla JS
- Audio recording: hold-to-send, tap-to-lock with icon changing to heart (send button)
- Offline message queuing + delivery on reconnect
- Polls with real-time voting, document upload, location sharing with Google Maps link
- 5 wallpapers × 2 themes each (light/dark) with full coordinated color palettes
- Reactions must persist forever, support toggle, and show most-used emojis (max 5)
- Selection mode must transform the header itself (not a separate bar)
- Quiet replies are hidden until the parent message is tapped

## Progress
### Done
- **System messages removed** — "se conectó" / "se desconectó" no longer appear in chat
- **"ausente" → "últ. vez …"** — `ausente` event now sends `Date.now()` so the other user sees the real last-seen timestamp
- **Wallpaper persistence** — uses `classList.add` instead of `className` so the `dark` class is not wiped on reload
- **Persistent reactions** — reactions are stored in each message object inside `localStorage`, never auto-remove; toggle on/off by clicking the same emoji
- **Most-used emojis** — up to 5 tracked by frequency in `localStorage` (`chat-reacciones-frecuentes-{sala}` + `chat-reacciones-conteo-{sala}`)
- **Dynamic reaction bar** — long-press shows the most-used emojis + a "+" button that opens the emoji picker for any emoji
- **Emoji picker reaction mode** — clicking an emoji from the picker while `_modoReaccion` is set sends it as a reaction
- **Double-tap** — reacts with the first most-used emoji (or ❤️ if none) and persists
- **Reactions received from the other user** — socket `reaccion` handler saves to localStorage
- **Reactions restored on page load** — `cargarMsgsLocal` renders `.reaccion` for messages that have one, skipping animation via `dataset.reaccionCargado`
- **Selection mode redesign** — long-press now calls `entrSelectMode(msgId)` which hides the normal header and shows a selection bar with: close button, count, ⭐ favorite, 🗑️ delete (sheet with "para mí" / "para todos"), 💬 quiet reply
- **Favorite** — toggles `m.favorito` in localStorage and shows/hides a ⭐ indicator on the message bubble
- **Delete options sheet** — polished bottom sheet with icons, hover/active states, danger color for "eliminar para todos"
- **Quiet reply** — messages sent with `silencio: true` / `silencioDe: [msgIds]` are hidden from the normal chat; parent messages get a toggle that reveals the reply below when tapped; works both ways (propio/otro), persisted in localStorage, passed through the server
- **Header transform animation** — `headerSelectIn` keyframe fades and slides down the selection bar when entering select mode
- **Reaction bar centered** — uses JS `(window.innerWidth - qw) / 2` to avoid CSS `transform` conflicting with the `reaccionAparicion` animation; no more left-to-center jump
- **Message spacing** — `margin-bottom: 18px` on `.mensaje` so reactions don't overlap adjacent bubbles
- **Context menu** — `contextmenu` event on messages opens `abrirMenuMensaje`; "Seleccionar" option in the msgMenu that calls `entrSelectMode(msgMenuMsgId)`
- **Select button in more menu** — "Seleccionar mensajes" button in the `⋮` dropdown calls `entrSelectMode()` (no pre-selected message)
- **Missing icons added** — `star`, `message-circle`, `check-circle` added to the ICONS object (were missing, buttons appeared empty)
- **Install banner** — PWA install prompt with lightweight pitch, triggered by `beforeinstallprompt`
- **Auto-refresh on enter** — service worker `updatefound` event checks for updates; if a new SW is waiting, shows a toast and reloads
- **Profile photo** — settings option to upload a photo (stored in localStorage as `chat-foto-{sala}`), sent to the other user via `foto-perfil` socket event, displayed in the header avatar ring
- **Partner name** — settings input to change the header title ("Mi amor" by default), stored in `localStorage` as `chat-pareja-nombre`
- **Custom chat background** — "Subir fondo propio" button in the wallpaper picker; stores the image data URL in `localStorage` as `chat-fondo-personalizado`
- All changes pushed to GitHub

### In Progress
- (none)

### Blocked
- (none)

## Key Decisions
- Reaction bar no longer uses `transform: translateX(-50%)` because the CSS animation `reaccionAparicion` overrides it; centering is done in JS with `offsetWidth`
- `entrSelectMode` is called from long-press so both the reaction bar AND the selection header appear simultaneously
- Quiet replies are stored as normal messages with `silencio: true` / `silencioDe` and are skipped during normal rendering; they are attached to the parent via `agregarQuietToggle`
- Favorites are local-only (no socket event); profile photos are sent via socket so both users see each other's photo
- Service worker checks for updates on each page load and offers a "Nueva versión" toast with a reload button
- Profile photo restore happens inside `iniciarSesion()` (after `sala` is available), called via `restaurarPerfil()`
- Custom background doesn't depend on `sala`, restored immediately on page load

## Next Steps
1. Test all features end-to-end (reactions, selection, quiet reply, profile photo, custom background)
2. Polish the install banner dismiss logic (persist dismissal in localStorage)
3. Add a "clear custom background" option in wallpaper picker
4. Add floating music player integration
5. Add passcode / PIN lock to enter the app

## Critical Context
- `entrSelectMode` is called from the long-press handler (`pointerdown` timeout at 600ms), which previously only showed the reaction bar
- `abrirMenuMensaje` was never called before; now wired to `contextmenu` event on each message div
- Profile photo upload uses a hidden `<input type="file">` (same pattern as `abrirCamara` / `abrirGaleria`)
- Custom wallpaper is stored as a full data-URL in `localStorage` key `chat-fondo-personalizado` and applied via `body.style.background = 'url(...) center/cover'`
- Service worker update detection: `navigator.serviceWorker.register('/sw.js')` returns a registration; on `updatefound`, if the installing SW's `state` becomes `'installed'` and there's already an active SW, a toast with "Nueva versión disponible — Actualizar" is shown; clicking reloads the page
- **Video call flow (simple)**:
  - Caller: `iniciarLlamada()` → start camera → create PC → create offer → send `call-offer` → show "Llamando..." modal (no accept button)
  - Callee: receive `call-offer` → vibrate + push notification (if hidden) → show incoming modal with Accept/Reject
  - Callee taps Accept → `aceptarLlamada()` → start camera → create PC → set remote desc (from `_pendingOffer`) → create answer → send `call-answer` → `abrirPantallaLlamada()`
  - Caller: receive `call-answer` → set remote desc → `abrirPantallaLlamada()`
  - ICE candidates flow via `onicecandidate` callback
  - `terminarLlamada()` guarded by `callActive` flag to prevent `call-end` broadcast loop
  - `call-reject` handled via `_pendingOffer` null check

## Relevant Files
- `public/script.js`: all new features — reaction system (helpers, toggle, dynamic bar), selection mode (enter/salir, fav, delete, quiet), install banner, SW update, profile photo, partner name, custom bg
- `public/index.html`: quickReactions (now empty), header with normal + select mode, delete options sheet, quiet bar, install banner, settings fields for photo/name, custom bg button
- `public/style.css`: updated styles for quickReactions (centered, overflow), header select mode, delete options sheet, quiet reply container/toggle, favorito indicator, install banner, settings foto preview, message spacing
- `server.js`: `silencio` + `silencioDe` fields added to `mensaje` handler, `foto-perfil` socket event for profile photo broadcast
- `public/sw.js`: service worker with cache-first strategy, notification support
