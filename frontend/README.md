# Frontend MrDTwice

[Torna al README principale](../README.md)

Applicazione Angular 21 standalone per esplorare, filtrare e aggiungere luoghi.
Il frontend comunica con l'API Express locale su `http://localhost:8080`.

## Prerequisiti

- Node.js `^20.19.0`, `^22.12.0` oppure `^24.0.0`.
- npm; il progetto e' stato installato con la versione indicata in `package.json`.
- Backend MrDTwice configurato e avviato.

Con nvm, dalla radice del repository puoi selezionare Node 24 con:

```bash
nvm use
```

## Installazione e avvio

```bash
cd frontend
npm install
npm start
```

`npm start` ottimizza le immagini mancanti e avvia il server Angular. L'app e'
disponibile normalmente su `http://localhost:4200/` e si ricarica quando cambia
un file sorgente.

Angular CLI globale non e' richiesta: gli script npm usano la CLI installata nel
progetto.

## Comandi utili

```bash
npm run build
npm run lint
npm run lint:fix
npm run format
npm run format:check
npm run images:optimize
npm run images:optimize:force
```

- `npm run build` crea la build di produzione in `dist/frontend/browser/`.
- `npm run images:optimize` genera solo le varianti WebP mancanti o non aggiornate.
- `npm run images:optimize:force` rigenera tutte le immagini derivate.

Per configurazione del backend e variabili ambiente consulta la
[guida setup](../docs/setup-guide.md).
