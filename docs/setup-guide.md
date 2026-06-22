# 04 - Setup locale

[<- Stack tecnico](technical-stack.md) | [Indice docs](README.md) | [Prossimo: Flusso backend e API ->](BE-schema-of-complete-flux.md)

Questa guida porta il progetto da repository clonata ad ambiente locale avviabile
e spiega il ruolo dei pacchetti principali installati nel frontend, nel backend e
nella parte Supabase.

## Prerequisiti

- Node.js `^20.19.0`, `^22.12.0` oppure `^24.0.0` (Node 24 consigliato).
- npm 11; il repository dichiara la versione usata nel campo `packageManager`.
- Accesso a un progetto Supabase.
- Credenziali PostgreSQL Supabase per il backend.

La radice contiene `.nvmrc`, quindi con nvm basta eseguire `nvm use`. Angular CLI
globale non e' necessaria: gli script npm usano la toolchain locale.

## Installazione rapida

Frontend:

```bash
cd frontend
npm install
npm start
```

L'app locale viene servita normalmente su `http://localhost:4200/`.

Backend:

```bash
cd backend
npm install
npm start
```

Il server usa la porta `8080` e richiede il file `backend/.env`.

## Variabili ambiente backend

Crea `backend/.env` con le credenziali PostgreSQL fornite da Supabase:

```text
DB_HOST=...
DB_PORT=5432
DB_USER=...
DB_PASSWORD=...
DB_NAME=...
SUPABASE_URL=...
SUPABASE_KEY=...
```

## Pacchetti frontend principali

Nel progetto basta `npm install`, perche' le dipendenze sono gia' dichiarate in
`frontend/package.json` e bloccate da `frontend/package-lock.json`.

Ruolo dei pacchetti:

| Pacchetto | Ruolo nel progetto |
|---|---|
| `@angular/cli` | Comandi Angular come `ng serve`, `ng build` e generazione componenti. |
| `@angular/*` | Framework frontend: componenti, template, routing e forms. |
| `primeng` | Libreria UI usata per card, form, select, editor, dialog e messaggi. |
| `primeicons` | Set di icone pensato per i componenti PrimeNG. |
| `@primeuix/themes` | Temi PrimeNG/PrimeUIX. Nel progetto sostituisce il vecchio approccio `@primeng/themes`. |
| `@phosphor-icons/web` | Set di icone usato dagli stili globali. |
| `quill` | Editor rich text usato dal form di inserimento tramite PrimeNG Editor. |
| `postcss` | Motore usato dalla configurazione `frontend/.postcssrc.json` per processare gli stili. |
| `autoprefixer` | Plugin PostCSS che aggiunge i prefissi CSS necessari in base ai browser target. |
| `wasm-image-optimization` | Genera le varianti WebP responsive prima dell'avvio locale. |
| `prettier` | Formattazione automatica del codice. |
| `eslint-config-prettier` | Disattiva regole ESLint che entrano in conflitto con Prettier. |
| `angular-eslint` | Regole ESLint specifiche per Angular e template. |

`@supabase/supabase-js` e `uuid` sono ancora dichiarati nel package frontend per
compatibilita' con lo scaffold precedente, ma il flusso corrente non li importa:
l'upload e la generazione del nome file avvengono nel backend.

## Pacchetti backend principali

Anche nel backend basta `npm install`, perche' le dipendenze sono gia' in
`backend/package.json` e `backend/package-lock.json`.

Ruolo dei pacchetti:

| Pacchetto | Ruolo nel progetto |
|---|---|
| `express` | Server HTTP e definizione delle API. |
| `cors` | Abilita le chiamate dal frontend Angular verso il backend locale o deployato. |
| `dotenv` | Carica le variabili da `backend/.env`. |
| `pg` | Driver PostgreSQL usato da `db.js` per collegarsi al database Supabase. |
| `@supabase/supabase-js` | Client usato dal backend per Supabase Storage. |
| `multer` | Riceve in memoria il file multipart inviato a `/api/upload`. |
| `uuid` | Genera nomi unici per le immagini caricate nello Storage. |
| `eslint` e `@eslint/js` | Lint JavaScript del backend. |
| `globals` | Definisce globali Node per la configurazione ESLint. |
| `prettier` | Formattazione automatica. |
| `eslint-config-prettier` | Evita conflitti tra regole ESLint e formattazione Prettier. |

## Setup Supabase

Database:

- Crea o verifica le tabelle `regions`, `tags`, `sub_tags` e `content`.
- Usa `snake_case` per colonne e chiavi esterne.
- Mantieni ID e relazioni coerenti con le API backend.

Storage:

- Crea il bucket `mrdtwice-images`.
- Rendi pubblica la lettura delle immagini, se il design prevede URL pubbliche.
- Configura `SUPABASE_URL` e `SUPABASE_KEY` nel backend.
- Consenti upload per i formati supportati dall'MVP tramite il backend.

## Comandi utili

Frontend:

```bash
cd frontend
npm start
npm run build
npm run lint
npm run lint:fix
npm run format
npm run format:check
```

Backend:

```bash
cd backend
npm start
npm run lint
npm run lint:fix
npm run format
npm run format:check
```

I test automatizzati sono fuori scope per l'MVP, quindi non sono richiesti come
controllo di consegna.

## Controlli rapidi

Frontend:

- `npm start` avvia il dev server Angular.
- `npm run build` completa senza errori.

Backend:

- `npm start` stampa la connessione al database e avvia Express su `8080`.
- Se la connessione fallisce, controlla `.env`, rete e credenziali Supabase.

## Problemi noti

- Gli URL API del frontend puntano direttamente a `http://localhost:8080` e vanno
  portati in configurazione ambiente prima del deploy.
- La porta backend e' fissata a `8080` e CORS accetta tutte le origini; per il
  deploy vanno adattati al provider e al dominio frontend.
- I file `ItemsDaModificare.*` sono template legacy non montati e possono essere
  rimossi quando non servono piu' come riferimento.

## Prossima lettura

Vai al [Flusso backend e API](BE-schema-of-complete-flux.md) per vedere come deve
muoversi una richiesta completa.
