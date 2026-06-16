# Technical Stack

Questo documento descrive lo stack tecnico del progetto MrDTwice e il ruolo dei
principali strumenti usati in frontend, backend, database e qualita' del codice.

## Panoramica

MrDTwice e' una web app MVP per scoprire, condividere, votare e recensire luoghi
interessanti da visitare.

Architettura prevista:

```text
Angular frontend
  -> HTTP JSON REST API
Express backend
  -> PostgreSQL hosted on Supabase
```

Il progetto e' diviso in due applicazioni npm separate:

- `frontend`: applicazione Angular.
- `backend`: API Node.js/Express e connessione al database.

## Frontend

Tecnologie principali:

- Angular `^21.0.0`
- TypeScript `~5.9.2`
- Angular Router
- RxJS `~7.8.0`
- PrimeNG `^21.1.9`
- PrimeUIX Themes `^2.0.3`
- Tailwind CSS `^4.1.12`

Struttura principale:

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
```

Caratteristiche configurate:

- Applicazione Angular standalone avviata con `bootstrapApplication`.
- Routing centralizzato in `app.routes.ts`.
- Configurazione applicativa in `app.config.ts`.
- Strict mode TypeScript abilitata.
- Strict templates Angular abilitati.
- Tailwind importato in `src/styles.css`.
- PrimeNG disponibile come libreria UI, anche se i componenti non sono ancora integrati
  nello scaffold corrente.

Comandi principali:

```bash
cd frontend
npm run start
npm run build
npm run test
npm run lint
npm run format
```

## Backend

Tecnologie principali:

- Node.js
- Express `^5.2.1`
- CommonJS
- CORS
- dotenv
- PostgreSQL driver `pg`
- Supabase come database PostgreSQL hosted
- `@supabase/supabase-js` installato come dipendenza disponibile

Struttura principale:

```text
backend/
  server.js
  db.js
  src/
    routes/
    services/
```

Responsabilita':

- `server.js`: inizializza Express, abilita CORS e JSON body parsing, avvia il server
  sulla porta `8080`.
- `db.js`: legge le variabili d'ambiente, crea il client PostgreSQL e testa la
  connessione al database.
- `src/routes`: contiene i router Express per le risorse HTTP.
- `src/services`: contiene la logica di accesso ai dati.

Comandi principali:

```bash
cd backend
npm run lint
npm run format
```

Nota sullo stato attuale:

- Il backend contiene un template di route/service chiamato `ItemsDaModificare`.
- `db.js` usa il driver `pg` per collegarsi a PostgreSQL.
- Il service template fa ancora riferimento a un client `supabase`; prima di usare
  quelle funzioni in produzione bisogna allineare la strategia dati scegliendo tra
  `pg` diretto o `@supabase/supabase-js`.

## Database

Database previsto:

- PostgreSQL hosted on Supabase.

Configurazione letta da variabili d'ambiente:

```text
DB_HOST
DB_PORT
DB_USER
DB_PASSWORD
DB_NAME
```

La connessione corrente usa SSL con `rejectUnauthorized: false`, impostazione comune
per collegarsi a database hosted durante lo sviluppo.

Convenzioni consigliate:

- Tabelle in `snake_case` e plurale: `places`, `reviews`, `place_images`.
- Chiavi primarie `id`.
- Timestamp standard: `created_at`, `updated_at`.
- Relazioni esplicite:
  - `reviews.place_id`
  - `place_images.place_id`

## API

Formato:

- REST API.
- Request e response in JSON.
- Base URL locale backend: `http://localhost:8080`.

Endpoint previsti per il dominio MVP:

```text
GET    /api/places
GET    /api/places/:id
POST   /api/places
PUT    /api/places/:id
DELETE /api/places/:id
POST   /api/places/:id/reviews
```

Il documento `docs/BE-schema-of-complete-flux.md` descrive il flusso atteso tra
Angular, Express, service e database.

## Tooling e qualita'

Frontend:

- ESLint `^10.3.0`
- angular-eslint `21.4.0`
- typescript-eslint `8.59.2`
- Prettier `^3.8.4`
- Vitest `^4.0.8`
- jsdom `^27.1.0`

Backend:

- ESLint `^10.5.0`
- `@eslint/js`
- `eslint-config-prettier`
- Prettier `^3.8.4`

Regole importanti:

- Prettier gestisce formattazione e stile meccanico.
- ESLint gestisce errori e convenzioni di codice.
- Il frontend applica regole Angular per selector:
  - componenti: prefisso `app`, stile `kebab-case`.
  - directive: prefisso `app`, stile `camelCase`.
- Il backend usa ESLint su `src/**/*.js`, ambiente Node e CommonJS.

## Testing

Frontend:

- Test unitari configurati tramite Angular build unit-test.
- File spec presenti in `src/**/*.spec.ts`.
- Ambiente test basato su Vitest globals.

Backend:

- Non sono ancora presenti test automatizzati.
- Lo script `test` e' ancora il placeholder generato da npm.

Per l'MVP, la priorita' minima consigliata e':

- testare componenti o service Angular che contengono logica di filtro/ricerca;
- testare i service backend che accedono a places e reviews;
- verificare manualmente il flusso completo: lista luoghi, dettaglio, creazione luogo,
  creazione recensione.

## Build e deployment

Frontend:

- `npm run build` genera la build Angular nella cartella `dist/`.
- La configurazione production usa output hashing e budget di bundle.

Backend:

- Server Node/Express avviato da `server.js`.
- Porta locale attuale: `8080`.
- Richiede variabili d'ambiente database prima dell'avvio.

Documenti collegati:

- `docs/setup-guide.md`
- `docs/deployment-guide.md`
- `docs/information-architecture.md`
- `docs/concept.md`
