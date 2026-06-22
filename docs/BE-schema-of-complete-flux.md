# 05 - Flusso backend e API

[<- Setup locale](setup-guide.md) | [Indice docs](README.md) | [Prossimo: Style guide ->](style-guide.md)

Questo capitolo descrive il flusso dati implementato tra Angular, Express,
Supabase PostgreSQL e Supabase Storage.

## Flusso lettura di un contenuto

```text
Angular ContentService
  GET http://localhost:8080/api/content/:id
    -> server.js monta ApiRoutes.js
    -> ApiRoutes chiama ApiService.getContentById(id)
    -> ApiService esegue una query parametrizzata tramite pg
    -> Supabase PostgreSQL restituisce la riga di public.content
    -> Express risponde 200 JSON, 404 se assente o 500 in caso di errore
    -> Angular aggiorna la pagina dettaglio
```

Liste e filtri riusano `GET /api/content` con i query parameter `regionId` e
`tagId`. La ricerca testuale, il filtro citta' e il filtro sottotag del listing
sono applicati nel frontend sui contenuti gia' ricevuti.

## Flusso creazione luogo e immagine

La creazione avviene in due richieste consecutive:

```text
1. Angular ImageUploadService
   POST /api/upload con multipart/form-data, campo "image"
     -> Multer mantiene il file in memoria (limite backend: 10 MiB)
     -> ApiService genera un nome UUID
     -> il backend carica il file nel bucket mrdtwice-images
     -> Express restituisce { "publicUrl": "..." }

2. Angular ContentService
   POST /api/content con JSON e publicUrl dentro image_url
     -> ApiService esegue INSERT su public.content tramite pg
     -> Express restituisce il contenuto creato con status 201
     -> il frontend mostra la conferma e apre /content?id=:id
```

Il form frontend accetta file fino a 5 MB; il limite Multer di 10 MiB protegge
anche eventuali chiamate dirette all'API.

## Endpoint disponibili

| Metodo | Endpoint | Funzione |
|---|---|---|
| `GET` | `/api/region` | Elenco regioni. |
| `GET` | `/api/region?regionId=:id` | Regione selezionata. |
| `GET` | `/api/region/contents-count` | Numero di contenuti per regione. |
| `GET` | `/api/tag` | Elenco categorie. |
| `GET` | `/api/sub-tag` | Elenco sottocategorie. |
| `GET` | `/api/content` | Tutti i contenuti. |
| `GET` | `/api/content?regionId=:id` | Contenuti di una regione. |
| `GET` | `/api/content?regionId=:id&tagId=:id` | Contenuti di regione e categoria. |
| `GET` | `/api/content/latest-by-region` | Ultimi dieci contenuti. |
| `GET` | `/api/content/top-liked-by-region` | Dieci contenuti con piu' like. |
| `GET` | `/api/content/:id` | Dettaglio contenuto. |
| `POST` | `/api/content` | Creazione contenuto. |
| `POST` | `/api/content/like?id=:id` | Incremento like. |
| `POST` | `/api/content/dislike?id=:id` | Incremento dislike. |
| `POST` | `/api/upload` | Upload immagine su Supabase Storage. |

## Responsabilita'

- `server.js` configura Express, CORS, parsing JSON e connessione iniziale.
- `ApiRoutes.js` gestisce endpoint, parametri e status HTTP.
- `ApiService.js` contiene query PostgreSQL e upload Supabase Storage.
- I service Angular costruiscono le richieste HTTP e gestiscono gli errori lato UI.

## Prossima lettura

Continua con la [Style guide](style-guide.md) per mantenere coerenti codice,
naming e struttura delle feature.
