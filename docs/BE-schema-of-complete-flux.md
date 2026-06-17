# 05 - Flusso backend e API

[<- Setup locale](setup-guide.md) | [Indice docs](README.md) | [Prossimo: Style guide ->](style-guide.md)

Questo capitolo descrive il flusso dati target tra Angular, Express, Supabase
PostgreSQL e Supabase Storage.

## Flusso lettura dati

Angular (frontend)
│
│ GET http://localhost:8080/api/items/5
▼
server.js
│ app.use('/api/items', itemsRoutes) → smista al router
▼
items.routes.js
│ router.get('/:id') → estrae id = '5', chiama il service
▼
items.service.js
│ getItemById('5') → esegue la query su Supabase
▼
Supabase (database)
│ SELECT \* FROM items WHERE id = 5 LIMIT 1
▼
items.service.js
│ riceve { data, error } → lancia errore o restituisce data
▼
items.routes.js
│ riceve l'item → res.json(item) con status 200
▼
Angular (frontend)
│ riceve il JSON con i dati dell'item


## Prossima lettura

Continua con la [Style guide](style-guide.md) per mantenere coerenti codice,
naming e struttura delle feature.
