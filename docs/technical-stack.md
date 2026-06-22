# 03 - Stack tecnico

[<- Architettura informativa](information-architecture.md) | [Indice docs](README.md) | [Prossimo: Setup locale ->](setup-guide.md)

Questo capitolo descrive le tecnologie del progetto e il ruolo di ogni parte
dello stack.

## Vista d'insieme

```text
Angular frontend
  -> REST JSON API Express
  -> PostgreSQL hosted on Supabase

Angular frontend
  -> Express multipart endpoint
  -> Supabase Storage per upload immagini
```

La repository contiene due applicazioni npm separate:

- `frontend/`: applicazione Angular.
- `backend/`: API Express e connessione database.

## Frontend

Tecnologie principali:

- Angular `^21.0.0`
- TypeScript `~5.9.2`
- Angular Router
- RxJS `~7.8.0`
- PrimeNG `^21.1.9`
- PrimeUIX Themes `^2.0.3`
- Phosphor Icons `^2.1.2`
- Quill `^2.0.3` tramite l'editor PrimeNG
- PostCSS `^8.5.15`
- Autoprefixer `^10.5.0`
- `wasm-image-optimization` per generare asset WebP responsive

Struttura corrente:

```text
frontend/
  src/
    main.ts
    styles.css
    app/
      app.ts
      app.html
      app.css
      app.config.ts
      app.routes.ts
      features/
        component/
        page/
      services/
        content-service.ts
        image-upload.service.ts
        region-service.ts
        sub-tag-service.ts
        tag-service.ts
```

Script utili:

```bash
cd frontend
npm start
npm run build
npm run lint
npm run lint:fix
npm run format
npm run format:check
```

Note di stato:

- L'app usa componenti standalone e `bootstrapApplication`.
- Il router espone home, regioni, dettaglio regione, listing filtrato, dettaglio
  luogo, chi siamo e fallback 404.
- `image-upload.service.ts` invia il file al backend tramite `POST /api/upload`.
- Gli URL API sono attualmente configurati nei service come
  `http://localhost:8080`; prima del deploy vanno spostati in configurazione ambiente.

### PrimeNG

PrimeNG e' la libreria UI prevista per mantenere coerenza visuale nelle schermate
dell'MVP.

Indicazioni:

- Nei componenti standalone, ogni modulo PrimeNG va importato nel relativo array
  `imports`.
- `p-card` e' adatto per card luogo e griglie di contenuti.
- `p-inputText`, dropdown/select e textarea sono adatti ai form.
- I temi arrivano da `@primeuix/themes`.

### CSS post-processing

La pipeline CSS usa `frontend/.postcssrc.json` con il solo plugin
`autoprefixer`. Angular continua a gestire bundling, minificazione e stili dei
componenti.

La cache persistente Angular e il prebundling collegato sono disabilitati in
`angular.json`: nel toolchain locale il backend nativo LMDB termina il processo di
build. La disattivazione non modifica gli artefatti prodotti.

## Backend

Tecnologie principali:

- Node.js
- Express `^5.2.1`
- CommonJS
- CORS
- dotenv
- PostgreSQL driver `pg`
- Supabase PostgreSQL come database hosted
- Multer per ricevere upload multipart in memoria
- `@supabase/supabase-js` per caricare immagini su Supabase Storage
- `uuid` per generare nomi file unici nello Storage

Struttura corrente:

```text
backend/
  server.js
  db.js
  src/
    routes/
      ApiRoutes.js
      ItemsDaModificare.routes.js
    services/
      ApiService.js
      ItemsDaModificare.service.js
```

Script utili:

```bash
cd backend
npm start
npm run lint
npm run lint:fix
npm run format
npm run format:check
```

Note di stato:

- `server.js` inizializza Express, abilita CORS e JSON body parsing, poi testa la
  connessione al database e monta `ApiRoutes.js`.
- `ApiService.js` usa un pool `pg` per dati, like e dislike.
- Lo stesso service usa il client Supabase esclusivamente per lo Storage immagini.
- I file `ItemsDaModificare.*` sono template legacy non montati dal server e non
  partecipano al flusso applicativo.

## Database e Storage

Database previsto:

- Supabase PostgreSQL.

Tabelle di dominio previste o gia' citate dal codice:

- `regions`
- `tags`
- `sub_tags`
- `content`

Storage immagini:

- Bucket: `mrdtwice-images`
- Visibilita' prevista: pubblica per leggere le immagini caricate.
- Upload: il frontend invia un multipart al backend, che usa il client Supabase.
- Formati previsti: JPEG, PNG, WEBP.
- Workflow: il frontend carica il file su Storage, riceve la URL pubblica e invia
  quella URL al backend dentro il payload del contenuto.

Variabili backend:

```text
DB_HOST
DB_PORT
DB_USER
DB_PASSWORD
DB_NAME
SUPABASE_URL
SUPABASE_KEY
```

## API implementate

Endpoint esposti da `ApiRoutes.js`:

```text
GET    /api/region
GET    /api/region?regionId=:regionId
GET    /api/region/contents-count
GET    /api/tag
GET    /api/sub-tag
GET    /api/content
GET    /api/content?regionId=:regionId
GET    /api/content?regionId=:regionId&tagId=:tagId
GET    /api/content/latest-by-region
GET    /api/content/top-liked-by-region
GET    /api/content/:id
POST   /api/content
POST   /api/content/like?id=:contentId
POST   /api/content/dislike?id=:contentId
POST   /api/upload
```

Il file [Flusso backend e API](BE-schema-of-complete-flux.md) dettaglia il percorso
tra Angular, Express, service, database e Storage.

## Build e deployment

Frontend:

- `npm run build` genera la build Angular sotto `dist/frontend/browser/`.
- Prima del deploy, configurare nel frontend l'URL pubblico del backend.

Backend:

- Server Node/Express avviato da `server.js`.
- Porta locale attuale: `8080`.
- Richiede variabili d'ambiente per database e Supabase Storage prima dell'avvio.

Approfondimento: [Deployment](deployment-guide.md).

## Qualita' e verifica MVP

Frontend:

- ESLint
- Prettier

Backend:

- ESLint
- Prettier

Per l'MVP i test automatizzati sono fuori scope. La verifica richiesta e':

- Lint e format check nelle cartelle modificate.
- Build frontend senza errori.
- Avvio backend e connessione database.
- Verifica manuale dei flussi principali: lista luoghi, dettaglio, creazione luogo,
  upload immagine, like e dislike.

## Documenti collegati

- [Setup locale](setup-guide.md)
- [Deployment](deployment-guide.md)
- [Architettura informativa](information-architecture.md)
- [Concept](concept.md)

## Prossima lettura

Continua con la [Guida setup locale](setup-guide.md) per installare dipendenze,
configurare ambiente e avviare le due applicazioni.
