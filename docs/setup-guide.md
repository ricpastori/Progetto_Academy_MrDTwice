# 04 - Setup locale

[<- Stack tecnico](technical-stack.md) | [Indice docs](README.md) | [Prossimo: Flusso backend e API ->](BE-schema-of-complete-flux.md)

Questa guida porta il progetto da repository clonata ad ambiente locale avviabile
e spiega il ruolo dei pacchetti principali installati nel frontend, nel backend e
nella parte Supabase.

## Prerequisiti

- Node.js compatibile con Angular 21.
- npm.
- Accesso a un progetto Supabase.
- Credenziali PostgreSQL Supabase per il backend.

Angular CLI globale e' comoda ma non obbligatoria: il progetto include gia'
`@angular/cli` nelle dipendenze di sviluppo del frontend, quindi gli script npm
usano la toolchain locale.

## Installazione rapida

Frontend:

```bash
cd frontend
npm install
npm run start
```

L'app locale viene servita normalmente su `http://localhost:4200/`.

Backend:

```bash
cd backend
npm install
node server.js
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
```

## Pacchetti frontend principali

Nel progetto reale basta `npm install`, perche' le dipendenze sono gia' dichiarate
in `frontend/package.json`. I comandi sotto documentano i pacchetti usati e sono
utili se bisogna ricostruire lo scaffold da zero.

```bash
npm install -g @angular/cli
npm install primeng primeicons @primeuix/themes
npm install @supabase/supabase-js uuid
npm install --save-dev @types/uuid
npm install --save-dev postcss autoprefixer
npm install --save-dev prettier eslint-config-prettier
ng add angular-eslint
```

Ruolo dei pacchetti:

| Pacchetto | Ruolo nel progetto |
|---|---|
| `@angular/cli` | Comandi Angular come `ng serve`, `ng build` e generazione componenti. |
| `@angular/*` | Framework frontend: componenti, template, routing e forms. |
| `primeng` | Libreria UI usata per componenti pronti come card, form, dropdown e rating. |
| `primeicons` | Set di icone pensato per i componenti PrimeNG. |
| `@primeuix/themes` | Temi PrimeNG/PrimeUIX. Nel progetto sostituisce il vecchio approccio `@primeng/themes`. |
| `@supabase/supabase-js` | Client Supabase lato frontend, usato soprattutto per upload immagini su Storage. |
| `uuid` | Genera nomi file unici, utile per evitare collisioni negli upload immagini. |
| `@types/uuid` | Tipi TypeScript per `uuid`, se richiesti dalla versione installata. |
| `postcss` | Motore usato dalla configurazione `frontend/.postcssrc.json` per processare gli stili. |
| `autoprefixer` | Plugin PostCSS che aggiunge i prefissi CSS necessari in base ai browser target. |
| `prettier` | Formattazione automatica del codice. |
| `eslint-config-prettier` | Disattiva regole ESLint che entrano in conflitto con Prettier. |
| `angular-eslint` | Regole ESLint specifiche per Angular e template. |

Nota: il vecchio comando `npm install primeng @primeng/themes primeicons` non e'
quello consigliato per questo progetto; qui viene usato `@primeuix/themes`.

## Pacchetti backend principali

Anche nel backend basta `npm install`, perche' le dipendenze sono gia' in
`backend/package.json`. Questi sono i comandi di riferimento usati per comporre
lo stack:

```bash
npm install express cors dotenv pg @supabase/supabase-js
npm install --save-dev eslint @eslint/js prettier eslint-config-prettier globals
```

Ruolo dei pacchetti:

| Pacchetto | Ruolo nel progetto |
|---|---|
| `express` | Server HTTP e definizione delle API. |
| `cors` | Abilita le chiamate dal frontend Angular verso il backend locale o deployato. |
| `dotenv` | Carica le variabili da `backend/.env`. |
| `pg` | Driver PostgreSQL usato da `db.js` per collegarsi al database Supabase. |
| `@supabase/supabase-js` | Client Supabase disponibile se si sceglie di usare API Supabase invece di `pg` diretto. |
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
- Consenti upload per i formati supportati dall'MVP.

## Comandi utili

Frontend:

```bash
cd frontend
npm run start
npm run build
npm run lint
npm run lint:fix
npm run format
npm run format:check
```

Backend:

```bash
cd backend
node server.js
npm run lint
npm run lint:fix
npm run format
npm run format:check
```

I test automatizzati sono fuori scope per l'MVP, quindi non sono richiesti come
controllo di consegna.

## Controlli rapidi

Frontend:

- `npm run start` avvia il dev server Angular.
- `npm run build` completa senza errori.

Backend:

- `node server.js` stampa la connessione al database.
- Se la connessione fallisce, controlla `.env`, rete e credenziali Supabase.

## Problemi noti

- Le route backend sono ancora da montare in `server.js`.
- Alcuni service sono template o bozze e vanno allineati prima di verificare le API.
- Il service upload immagini contiene credenziali nel codice: spostarle in ambiente
  prima di una distribuzione pubblica.
- Il backend deve scegliere una strategia dati stabile tra `pg` diretto e
  `@supabase/supabase-js`.

## Prossima lettura

Vai al [Flusso backend e API](BE-schema-of-complete-flux.md) per vedere come deve
muoversi una richiesta completa.
