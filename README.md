<p align="center">
  <img alt="MrDTwice" src="docs/logo.svg" width="112" height="114">
</p>

<h1 align="center">MrDTwice</h1>

<p align="center">
  <strong>Scopri, condividi, vota e recensisci luoghi interessanti da visitare.</strong>
</p>

<p align="center">
  MVP academy con frontend Angular, backend Express e database Supabase.
</p>

<p align="center">
  <a href="#documentazione">Documentazione</a>
  ·
  <a href="#percorsi-rapidi">Percorsi rapidi</a>
  ·
  <a href="#avvio-rapido">Avvio rapido</a>
  ·
  <a href="#licenza">Licenza</a>
</p>

<p align="center">
  <img alt="Status" src="https://img.shields.io/badge/status-MVP-orange">
  <img alt="Frontend" src="https://img.shields.io/badge/frontend-Angular-red">
  <img alt="Backend" src="https://img.shields.io/badge/backend-Express-black">
  <img alt="Database" src="https://img.shields.io/badge/database-Supabase-3ECF8E">
  <img alt="License" src="https://img.shields.io/badge/license-MIT-blue">
</p>

## Indice

- [Documentazione](#documentazione)
- [Percorsi rapidi](#percorsi-rapidi)
- [Stato del progetto](#stato-del-progetto)
- [Funzionalita' MVP](#funzionalita-mvp)
- [Avvio rapido](#avvio-rapido)
- [Struttura](#struttura)
- [Link esterni](#link-esterni)
- [Licenza](#licenza)

## Documentazione

Questa repository e' organizzata come una piccola documentazione navigabile: il
README e' la porta d'ingresso, mentre i file in `docs/` sono capitoli collegati
tra loro.

- [Indice completo della documentazione](docs/README.md)
- [Concept del prodotto](docs/concept.md)
- [Architettura informativa e flussi](docs/information-architecture.md)
- [Stack tecnico](docs/technical-stack.md)
- [Guida setup locale](docs/setup-guide.md)
- [Flusso backend e API](docs/BE-schema-of-complete-flux.md)
- [Style guide](docs/style-guide.md)
- [Guida deployment](docs/deployment-guide.md)
- [README frontend](frontend/README.md)

## Percorsi rapidi

Per capire il progetto:

1. Parti dal [Concept](docs/concept.md).
2. Prosegui con [Architettura informativa e flussi](docs/information-architecture.md).
3. Consulta i [mockup](docs/mockups/) quando devi confrontare pagine e UI.

Per lavorare al codice:

1. Leggi lo [Stack tecnico](docs/technical-stack.md).
2. Segui la [Guida setup locale](docs/setup-guide.md).
3. Usa il [Flusso backend e API](docs/BE-schema-of-complete-flux.md) per allineare
   frontend, backend e database.
4. Applica la [Style guide](docs/style-guide.md) prima di consegnare modifiche.

Per preparare la consegna:

1. Verifica scope e criteri in [Concept](docs/concept.md).
2. Controlla build, variabili ambiente e checklist nella [Guida deployment](docs/deployment-guide.md).

## Stato del progetto

| Area | Stato attuale |
|---|---|
| Frontend | Angular 21 scaffold, routing configurato ma senza route applicative. |
| Backend | Express 5 con connessione PostgreSQL/Supabase tramite `pg`; route e service sono in bozza. |
| Database | Supabase PostgreSQL previsto come fonte dati, con Storage per immagini. |
| UI | Mockup salvati in `docs/mockups/`. |
| Documentazione | Capitoli collegati da indice, percorsi e link precedente/successivo. |

## Funzionalita' MVP

- Esplorare luoghi.
- Cercare e filtrare per regione, citta', categoria o tag.
- Aprire la scheda dettaglio di un luogo.
- Aggiungere un nuovo luogo con informazioni base e immagine.
- Caricare immagini su Supabase Storage.
- Lasciare valutazioni o recensioni nel flusso MVP previsto.

Fuori scope per la prima versione:

- Autenticazione.
- Profili utente.
- Preferiti e wishlist.
- Funzionalita' social avanzate.
- Moderazione complessa.
- Raccomandazioni automatiche.
- Test automatizzati.

## Avvio rapido

Frontend:

```bash
cd frontend
npm install
npm run start
```

Backend:

```bash
cd backend
npm install
node server.js
```

Il backend richiede un file `.env` con le variabili database descritte nella
[Guida setup locale](docs/setup-guide.md).

## Struttura

```text
.
|-- backend/       # API Express, connessione database e service
|-- docs/          # Documentazione navigabile e mockup
|-- frontend/      # Applicazione Angular
|-- LICENSE
`-- README.md
```

## Link esterni

- [Figma mockup](https://www.figma.com/design/cMAgFuT1NFTkabQaFxcSP8/Wireframe-e-Mockup?node-id=30-54384&t=sUAnXCBUrnGCNY4F-1)

## Licenza

Distribuito con licenza [MIT](LICENSE).
