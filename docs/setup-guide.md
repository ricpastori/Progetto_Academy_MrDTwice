# 04 - Setup locale

[<- Stack tecnico](technical-stack.md) | [Indice docs](README.md) | [Prossimo: Flusso backend e API ->](BE-schema-of-complete-flux.md)

Questa guida porta il progetto da repository clonata ad ambiente locale avviabile.

## Prerequisiti

- Node.js compatibile con Angular 21.
- npm.
- Accesso a un progetto Supabase.
- Credenziali PostgreSQL Supabase per il backend.

Angular CLI globale e' comoda ma non obbligatoria, perche' gli script npm usano la
toolchain installata nel progetto.

## Installazione frontend

```bash
cd frontend
npm install
```

Avvio sviluppo:

```bash
npm run start
```

Comandi utili:

```bash
npm run build
npm run lint
npm run lint:fix
npm run format
npm run format:check
```

L'app locale viene servita normalmente su `http://localhost:4200/`.

## Installazione backend

```bash
cd backend
npm install
```

Crea `backend/.env`:

```text
DB_HOST=...
DB_PORT=5432
DB_USER=...
DB_PASSWORD=...
DB_NAME=...
```

Avvio sviluppo:

```bash
node server.js
```

Il server usa la porta `8080`.

Comandi utili:

```bash
npm run lint
npm run lint:fix
npm run format
npm run format:check
```

## Setup Supabase

Database:

- Crea o verifica le tabelle `regions`, `tags`, `sub_tags` e `content`.
- Usa `snake_case` per colonne e chiavi esterne.
- Mantieni ID e relazioni coerenti con le API backend.

Storage:

- Crea il bucket `mrdtwice-images`.
- Rendi pubblica la lettura delle immagini, se il design prevede URL pubbliche.
- Consenti upload per i formati supportati dall'MVP.

## Controlli rapidi

Frontend:

- `npm run start` apre lo scaffold Angular.
- `npm run build` completa senza errori.
- I test automatizzati sono fuori scope per l'MVP, quindi non sono richiesti come
  controllo di consegna.

Backend:

- `node server.js` stampa la connessione al database.
- Se la connessione fallisce, controlla `.env`, rete e credenziali Supabase.

## Problemi noti

- Le route backend sono ancora da montare in `server.js`.
- Alcuni service sono template o bozze e vanno allineati prima di verificare le API.
- Il service upload immagini contiene credenziali nel codice: spostarle in ambiente
  prima di una distribuzione pubblica.

## Prossima lettura

Vai al [Flusso backend e API](BE-schema-of-complete-flux.md) per vedere come deve
muoversi una richiesta completa.
