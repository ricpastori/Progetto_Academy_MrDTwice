# 06 - Style guide

[<- Flusso backend e API](BE-schema-of-complete-flux.md) | [Indice docs](README.md) | [Prossimo: Deployment ->](deployment-guide.md)

Questa guida raccoglie le convenzioni di codice del progetto. Non e' una guida
visuale: serve a mantenere coerenti naming, file, API, CSS e qualita'.

## Principi generali

- Usare nomi espliciti e legati al dominio: `place`, `review`, `rating`, `region`,
  `tag`, `city`, `content`.
- Preferire identificatori in inglese per codice, file, API e classi CSS.
- Usare commenti brevi solo quando spiegano il motivo di una scelta non immediata.
- Evitare nomi temporanei come `itemsDaModificare`, `NewVariable`, `data1`, `temp`.
- Separare responsabilita': route per HTTP, service per dati/logica, componenti
  Angular per UI e interazione.

## Formattazione

Il progetto usa Prettier ed ESLint sia nel frontend sia nel backend.

Regole comuni:

- `printWidth`: 100
- stringhe con apice singolo
- punto e virgola obbligatorio
- trailing comma dove supportato
- fine riga `lf`

Comandi:

```bash
npm run format
npm run format:check
npm run lint
npm run lint:fix
```

Eseguire i comandi nella cartella interessata: `frontend/` o `backend/`.

## Naming TypeScript e JavaScript

| Elemento | Convenzione | Esempi |
|---|---|---|
| Variabili, funzioni, proprieta' | `camelCase` | `placeId`, `averageRating`, `loadPlaces()` |
| Classi, componenti, tipi | `PascalCase` | `PlaceCardComponent`, `ReviewFormData` |
| Costanti globali | `UPPER_SNAKE_CASE` | `API_BASE_URL`, `DEFAULT_PAGE_SIZE` |
| Booleani | prefisso leggibile | `isLoading`, `hasReviews`, `canSubmit` |
| Array | plurale | `places`, `reviews`, `regions` |
| Funzioni | verbo iniziale | `getPlaceById()`, `createReview()` |

## Naming file

Usare nomi in minuscolo e `kebab-case`.

Frontend Angular:

- Componenti: `place-card.component.ts`, `place-card.component.html`,
  `place-card.component.css`.
- Service: `places.service.ts`.
- Model o tipi: `place.model.ts`, `review.model.ts`.
- Route/config: mantenere i nomi Angular gia' presenti, come `app.routes.ts` e
  `app.config.ts`.

Backend Express:

- Route: `places.routes.js`, `reviews.routes.js`.
- Service: `places.service.js`, `reviews.service.js`.
- Configurazione condivisa: `db.js`, `server.js`.

## Angular

- Usare componenti standalone.
- Selector componenti: prefisso `app`, stile `kebab-case`, per esempio
  `app-place-card`.
- Selector directive: prefisso `app`, stile `camelCase`, per esempio `appAutofocus`.
- Tenere chiamate API nei service.
- Nei componenti usare stati leggibili: `places`, `selectedPlace`, `isLoading`,
  `errorMessage`.
- Nei template usare HTML semantico: `button` per azioni, `a` per navigazione,
  `aria-label` per controlli iconici.
- Usare `signal` o primitive Angular moderne quando semplificano stato locale.

## Backend Express

- Mantenere CommonJS finche' `backend/package.json` usa `"type": "commonjs"`.
- Le route gestiscono HTTP, status code e validazione minima.
- I service gestiscono query e mapping dati, senza usare direttamente `req` o `res`.
- Ogni handler asincrono usa `async/await` e `try/catch`.
- Status code coerenti:
  - `200` per lettura o aggiornamento riusciti.
  - `201` per creazione.
  - `204` per cancellazione senza body.
  - `400` per input non valido.
  - `404` per risorsa non trovata.
  - `500` per errori inattesi.

Esempio naming:

```js
async function getAllPlaces() {}
async function getPlaceById(placeId) {}
async function createPlace(payload) {}
async function updatePlaceById(placeId, payload) {}
async function deletePlaceById(placeId) {}
```

## API e database

- Route REST con sostantivi plurali: `/api/regions`, `/api/tags`, `/api/content`.
- Payload JSON coerenti; se il backend espone `snake_case`, mantenerlo documentato.
- Database PostgreSQL in `snake_case`: `image_url`, `created_at`, `region_id`.
- Evitare risposte raw incoerenti tra endpoint diversi.
- Documentare ogni cambio di contratto API nel [Flusso backend e API](BE-schema-of-complete-flux.md).

## CSS e UI

- Classi CSS in `kebab-case` e semantiche: `.place-card`, `.review-list`,
  `.filter-panel`.
- Per componenti complessi usare BEM leggero:
  - `.place-card`
  - `.place-card__image`
  - `.place-card__title`
  - `.place-card--featured`
- Custom properties in `kebab-case`: `--color-primary`, `--spacing-sm`,
  `--radius-card`.
- Token globali, reset e import Tailwind vivono in `frontend/src/styles.css`.
- Stili specifici restano nel file `.css` del componente.
- PrimeNG va importato nei componenti standalone che lo usano.

## Qualita' prima della consegna

Prima di consegnare:

1. Eseguire lint nella cartella modificata.
2. Eseguire format check o format.
3. Verificare manualmente il flusso toccato dalla modifica.
4. Aggiornare la documentazione se cambia un contratto, una route o un flusso.
5. Evitare refactor non necessari nello stesso commit della feature.

I test automatizzati sono fuori scope per l'MVP e non sono richiesti nella checklist
di consegna.

## Prossima lettura

Chiudi il percorso con la [Guida deployment](deployment-guide.md).
