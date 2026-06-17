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
- PostCSS `^8.5.15`
- Autoprefixer `^10.5.0`
- Supabase client `^2.108.2` per upload immagini
- `uuid` per generare nomi file unici

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
      services/
        image-upload.service.ts
```

Script utili:

```bash
cd frontend
npm run start
npm run build
npm run lint
npm run lint:fix
npm run format
npm run format:check
```

Note di stato:

- L'app usa componenti standalone e `bootstrapApplication`.
- Il router e' configurato, ma `routes` e' ancora vuoto.
- `image-upload.service.ts` carica file nel bucket Supabase `mrdtwice-images` e
  restituisce una URL pubblica.
- Le credenziali Supabase nel service devono essere portate in configurazione
  ambiente prima di una consegna pubblica.

### PrimeNG

PrimeNG e' la libreria UI prevista per mantenere coerenza visuale nelle schermate
dell'MVP.

Indicazioni:

- Nei componenti standalone, ogni modulo PrimeNG va importato nel relativo array
  `imports`.
- `p-card` e' adatto per card luogo e griglie di contenuti.
- `p-inputText`, dropdown/select e textarea sono adatti ai form.
- `p-rating` e' adatto per input o visualizzazione delle valutazioni.
- I temi arrivano da `@primeuix/themes`.

### CSS post-processing

La pipeline CSS usa `frontend/.postcssrc.json` con il solo plugin
`autoprefixer`. Angular continua a gestire bundling, minificazione e stili dei
componenti.

## Backend

Tecnologie principali:

- Node.js
- Express `^5.2.1`
- CommonJS
- CORS
- dotenv
- PostgreSQL driver `pg`
- Supabase PostgreSQL come database hosted
- `@supabase/supabase-js` installato, ma non ancora allineato con il resto del backend

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
npm run lint
npm run lint:fix
npm run format
npm run format:check
node server.js
```

Note di stato:

- `server.js` inizializza Express, abilita CORS e JSON body parsing, poi testa la
  connessione al database.
- Le route in `src/routes` sono ancora da montare in `server.js`.
- I file `ItemsDaModificare.*` sono template e vanno sostituiti con risorse reali.
- `ApiService.js` va allineato a `db.js`: oggi usa nomi come `pool`, `res` e
  `getSubTags` non definiti.
- Il backend deve scegliere una strategia dati stabile tra `pg` diretto e
  `@supabase/supabase-js`.

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
- Upload: dal frontend tramite Supabase client.
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
```

## API target

Endpoint da consolidare per l'MVP:

```text
GET    /api/regions
GET    /api/tags
GET    /api/tags?region=:regionId
GET    /api/sub-tags?tag=:tagId
GET    /api/content
GET    /api/content/:id
POST   /api/content
POST   /api/content/:id/reviews
```

Il file [Flusso backend e API](BE-schema-of-complete-flux.md) dettaglia il percorso
tra Angular, Express, service, database e Storage.

## Build e deployment

Frontend:

- `npm run build` genera la build Angular nella cartella `dist/`.
- Prima del deploy, configurare l'URL pubblico del backend e le variabili Supabase.

Backend:

- Server Node/Express avviato da `server.js`.
- Porta locale attuale: `8080`.
- Richiede variabili d'ambiente database prima dell'avvio.

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
  upload immagine, rating o recensione.

## Documenti collegati

- [Setup locale](setup-guide.md)
- [Deployment](deployment-guide.md)
- [Architettura informativa](information-architecture.md)
- [Concept](concept.md)

## Prossima lettura

Continua con la [Guida setup locale](setup-guide.md) per installare dipendenze,
configurare ambiente e avviare le due applicazioni.
