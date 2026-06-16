# Style Guide

Questa guida definisce le convenzioni di codice del progetto MrDTwice: formattazione,
naming, struttura dei file, classi CSS e stile delle API. Non e' una guida visuale.

## Principi generali

- Usare nomi espliciti e legati al dominio dell'app: `place`, `review`, `rating`,
  `category`, `country`, `city`.
- Preferire identificatori in inglese per codice, file, API e classi CSS.
- Usare commenti brevi in italiano solo quando spiegano il motivo di una scelta o un
  passaggio non immediato.
- Evitare nomi temporanei come `itemsDaModificare`, `NewVariable`, `data1`, `temp`.
- Tenere separata la responsabilita' dei file: route per HTTP, service per logica/dati,
  componenti Angular per UI e interazione.

## Formattazione

Il progetto usa Prettier sia nel frontend sia nel backend.

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

Eseguire i comandi nella cartella corretta (`frontend` o `backend`).

## Naming JavaScript e TypeScript

- Variabili, funzioni e proprieta': `camelCase`.
  - Esempi: `placeId`, `averageRating`, `selectedCategory`, `loadPlaces()`.
- Classi, componenti, tipi e interfacce: `PascalCase`.
  - Esempi: `PlaceCardComponent`, `PlaceDetail`, `ReviewFormData`.
- Costanti globali o valori di configurazione stabili: `UPPER_SNAKE_CASE`.
  - Esempi: `API_BASE_URL`, `DEFAULT_PAGE_SIZE`.
- Booleani con prefisso leggibile:
  - `isLoading`, `hasReviews`, `canSubmit`, `shouldShowFilters`.
- Array con nomi plurali:
  - `places`, `reviews`, `categories`.
- Funzioni con verbo iniziale:
  - `getPlaceById()`, `createReview()`, `updatePlace()`, `deletePlaceById()`.

## Naming dei file

Usare nomi in minuscolo e `kebab-case`.

Frontend Angular:

- Componenti: `place-card.component.ts`, `place-card.component.html`,
  `place-card.component.css`.
- Service: `places.service.ts`.
- Model o tipi: `place.model.ts`, `review.model.ts`.
- Route/config: mantenere i nomi Angular gia' presenti, ad esempio `app.routes.ts`
  e `app.config.ts`.

Backend Express:

- Route: `places.routes.js`, `reviews.routes.js`.
- Service: `places.service.js`, `reviews.service.js`.
- File di configurazione condivisa: `db.js`, `server.js`.

I file template con nomi provvisori devono essere rinominati quando diventano risorse reali.

## Angular

- Usare componenti standalone, come nello scaffold attuale.
- I selector dei componenti devono essere `kebab-case` con prefisso `app`.
  - Esempio: `app-place-card`.
- I selector delle directive devono essere `camelCase` con prefisso `app`.
  - Esempio: `appAutofocus`.
- Tenere la logica di chiamata API nei service, non nei template o nei componenti di pagina.
- Nei componenti, usare nomi di stato leggibili:
  - `places`, `selectedPlace`, `isLoading`, `errorMessage`.
- Nei template usare HTML semantico e attributi accessibili quando servono:
  - `button` per azioni, `a` per navigazione, `aria-label` per controlli iconici.
- Usare le nuove primitive Angular gia' disponibili nel progetto quando aiutano la
  leggibilita', ad esempio `signal` per stato locale semplice.

## Backend Express

- Mantenere CommonJS finche' il backend resta configurato con `"type": "commonjs"`.
- Le route devono gestire HTTP, status code e validazione minima della request.
- I service devono contenere la logica di accesso ai dati e restituire oggetti pronti
  per la risposta.
- Ogni handler asincrono deve usare `async/await` e `try/catch`.
- Usare status code coerenti:
  - `200` per lettura/aggiornamento riusciti.
  - `201` per creazione.
  - `204` per cancellazione senza body.
  - `400` per input non valido.
  - `404` per risorsa non trovata.
  - `500` per errori inattesi.
- Esempio di naming per una risorsa reale:

```js
async function getAllPlaces() {}
async function getPlaceById(placeId) {}
async function createPlace(payload) {}
async function updatePlaceById(placeId, payload) {}
async function deletePlaceById(placeId) {}
```

## API e dati

- Usare route REST con sostantivi plurali:
  - `GET /api/places`
  - `GET /api/places/:id`
  - `POST /api/places`
  - `PUT /api/places/:id`
  - `DELETE /api/places/:id`
  - `POST /api/places/:id/reviews`
- Nei payload JSON usare `camelCase`.
  - Esempio: `averageRating`, `imageUrl`, `createdAt`.
- Nel database PostgreSQL/Supabase usare `snake_case`.
  - Esempio: `average_rating`, `image_url`, `created_at`.
- Se il backend restituisce righe raw dal database, documentare e mantenere coerente
  la scelta tra `snake_case` e `camelCase`.

## CSS

- Usare classi CSS in `kebab-case`, sempre semantiche.
  - Buono: `.place-card`, `.review-list`, `.filter-panel`.
  - Evitare: `.blue-box`, `.big-text`, `.left-side-custom`.
- Per componenti complessi usare una convenzione tipo BEM leggera:
  - `.place-card`
  - `.place-card__image`
  - `.place-card__title`
  - `.place-card--featured`
- Le custom properties devono essere in `kebab-case` e raggruppate per ruolo:
  - `--color-primary`
  - `--color-surface`
  - `--spacing-sm`
  - `--radius-card`
- Mettere token globali, reset leggeri e import Tailwind in `frontend/src/styles.css`.
- Mettere stili specifici del componente nel relativo file `.css`.
- Evitare override globali di componenti PrimeNG se non necessari; preferire classi locali
  o configurazione del tema.

## HTML e template

- Usare nomi chiari per variabili di iterazione:
  - `place of places`
  - `review of reviews`
- Evitare logica complessa nel template: spostarla in metodi leggibili, computed value
  o service.
- Testi visibili e label devono essere coerenti con il dominio dell'app.
- Gli attributi `id` devono essere unici e in `kebab-case`.

## Git e qualita'

- Prima di consegnare una modifica, eseguire almeno lint e format check nella parte toccata.
- Le modifiche devono essere piccole e riferite a una singola responsabilita'.
- Quando si aggiunge una feature, aggiornare anche documentazione o tipi condivisi se
  il contratto cambia.
