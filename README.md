<p align="center">
  <img alt="MrDTwice" src="docs/logo.svg" width="112" height="114">
</p>

<h1 align="center">MrDTwice</h1>

<p align="center">
  <strong>Scopri, condividi e vota luoghi interessanti da visitare.</strong>
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
  <img alt="Build" src="https://img.shields.io/badge/build-TODO-lightgrey">
  <img alt="Deploy" src="https://img.shields.io/badge/deploy-TODO-lightgrey">
  <img alt="Docs" src="https://img.shields.io/badge/docs-navigabile-blueviolet">
  <img alt="License" src="https://img.shields.io/badge/license-MIT-blue">
</p>

## Indice

- [Indice](#indice)
- [Documentazione](#documentazione)
- [Percorsi rapidi](#percorsi-rapidi)
- [Stack tecnologico](#stack-tecnologico)
- [Funzionalita' MVP](#funzionalita-mvp)
- [Avvio rapido](#avvio-rapido)
- [Struttura](#struttura)
- [Link esterni](#link-esterni)
- [Licenza](#licenza)
- [Contributors](#contributors)

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
- [Roadmap evolutiva](docs/roadmap.md)
- [README frontend](frontend/README.md)

## Percorsi rapidi

Per capire il progetto:

1. Parti dal [Concept](docs/concept.md).
2. Prosegui con [Architettura informativa e flussi](docs/information-architecture.md).
3. Consulta i [mockup](docs/mockups/) quando devi confrontare pagine e UI.
4. Leggi la [Roadmap evolutiva](docs/roadmap.md) per distinguere MVP e sviluppi futuri.

Per lavorare al codice:

1. Leggi lo [Stack tecnico](docs/technical-stack.md).
2. Segui la [Guida setup locale](docs/setup-guide.md).
3. Usa il [Flusso backend e API](docs/BE-schema-of-complete-flux.md) per allineare
   frontend, backend e database.
4. Applica la [Style guide](docs/style-guide.md) prima di consegnare modifiche.
5. Controlla build, variabili ambiente e checklist nella [Guida deployment](docs/deployment-guide.md).

## Stack tecnologico

| Area | Tecnologie |
|---|---|
| Frontend | <img alt="Angular" src="https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white"> <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"> <img alt="PrimeNG" src="https://img.shields.io/badge/PrimeNG-0D6EFD?style=for-the-badge&logo=primeng&logoColor=white"> |
| Backend e dati | <img alt="Node.js" src="https://img.shields.io/badge/Node.js-5FA04E?style=for-the-badge&logo=nodedotjs&logoColor=white"> <img alt="Express" src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white"> <img alt="Supabase" src="https://img.shields.io/badge/Supabase-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white"> <img alt="PostgreSQL" src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white"> |
| Tooling | <img alt="npm" src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white"> <img alt="PostCSS" src="https://img.shields.io/badge/PostCSS-DD3A0A?style=for-the-badge&logo=postcss&logoColor=white"> <img alt="ESLint" src="https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white"> <img alt="Prettier" src="https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=black"> |

I dettagli tecnici e lo stato delle integrazioni sono raccolti nello
[Stack tecnico](docs/technical-stack.md).

## Funzionalita' MVP

- Esplorare luoghi.
- Cercare e filtrare per regione, citta', categoria o tag.
- Aprire la scheda dettaglio di un luogo.
- Aggiungere un nuovo luogo con informazioni base e immagine.
- Caricare immagini su Supabase Storage.
- Esprimere apprezzamento sui luoghi tramite like e dislike.

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
npm start
```

Backend:

```bash
cd backend
npm install
npm start
```

Entrambe le applicazioni richiedono una versione Node.js supportata da Angular 21;
il progetto indica Node 24 in `.nvmrc`. Il backend richiede inoltre un file `.env`
con le variabili database e Supabase Storage descritte nella
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

## Contributors

Le persone che hanno contribuito al progetto:

<p align="center">
  <a href="https://github.com/ricpastori">
    <img alt="Riccardo Pastori" src="https://github.com/ricpastori.png?size=80" width="80" height="80">
  </a>
  <a href="https://github.com/Davide-Donnarumma">
    <img alt="Davide Donnarumma" src="https://github.com/Davide-Donnarumma.png?size=80" width="80" height="80">
  </a>
  <a href="https://github.com/Dade1991">
    <img alt="Dade1991" src="https://github.com/Dade1991.png?size=80" width="80" height="80">
  </a>
  <a href="https://github.com/Marienne-ma">
    <img alt="Marienne-ma" src="https://github.com/Marienne-ma.png?size=80" width="80" height="80">
  </a>
</p>

<p align="center">
  <a href="https://github.com/ricpastori">Riccardo Pastori</a>
  ·
  <a href="https://github.com/Davide-Donnarumma">Davide Donnarumma</a>
  ·
  <a href="https://github.com/Dade1991">Dade1991</a>
  ·
  <a href="https://github.com/Marienne-ma">Marienne-ma</a>
</p>
