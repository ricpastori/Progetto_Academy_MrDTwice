# 07 - Deployment

[<- Style guide](style-guide.md) | [Indice docs](README.md) | [Torna al README principale ->](../README.md)

Questa guida raccoglie le decisioni e la checklist per pubblicare l'MVP. I provider
definitivi possono cambiare, ma i controlli restano gli stessi.

## Componenti da pubblicare

| Componente | Output | Note |
|---|---|---|
| Frontend Angular | Build statica in `frontend/dist/` | Pubblicabile su hosting statico. |
| Backend Express | Processo Node con `server.js` | Richiede variabili ambiente database. |
| Supabase PostgreSQL | Database managed | Fonte dati principale. |
| Supabase Storage | Bucket `mrdtwice-images` | Immagini pubbliche dei luoghi. |

## Build frontend

```bash
cd frontend
npm install
npm run build
```

Prima della pubblicazione:

- Verificare che l'URL API punti al backend pubblico.
- Spostare credenziali e URL Supabase in configurazione ambiente.
- Controllare che asset e mockup non vengano referenziati con path locali sbagliati.

## Deploy backend

Comando di avvio target:

```bash
node server.js
```

Variabili richieste:

```text
DB_HOST
DB_PORT
DB_USER
DB_PASSWORD
DB_NAME
```

Prima della pubblicazione:

- Montare le route reali in `server.js`.
- Verificare CORS rispetto al dominio frontend.
- Non esporre segreti nel repository.
- Controllare che il provider permetta connessioni SSL a Supabase PostgreSQL.

## Supabase

Database:

- Applicare schema e seed necessari alla demo.
- Verificare permessi e indici minimi.
- Verificare manualmente le query usate dagli endpoint principali.

Storage:

- Creare bucket `mrdtwice-images`.
- Verificare policy di upload e lettura pubblica.
- Provare upload da frontend e apertura della URL pubblica.

## Checklist pre-demo

1. Frontend build senza errori.
2. Backend avviato e raggiungibile.
3. Connessione database riuscita.
4. Home caricata correttamente.
5. Listing luoghi funzionante.
6. Dettaglio luogo apribile.
7. Inserimento luogo verificato manualmente.
8. Upload immagine verificato manualmente.
9. Rating o recensione verificati manualmente.
10. Link principali e pagina 404 verificati.

I test automatizzati sono fuori scope per l'MVP: la demo richiede verifica manuale
dei flussi e controlli tecnici essenziali.

## URL di consegna

Compilare quando disponibili:

```text
Frontend:
Backend:
Supabase project:
Demo/Figma:
```

## Lettura collegata

- [Setup locale](setup-guide.md)
- [Stack tecnico](technical-stack.md)
- [Flusso backend e API](BE-schema-of-complete-flux.md)
