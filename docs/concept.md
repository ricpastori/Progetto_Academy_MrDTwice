# 01 - Concept

[<- Indice docs](README.md) | [Prossimo: Architettura informativa ->](information-architecture.md)

Questo capitolo definisce il perimetro prodotto di MrDTwice: cosa deve fare
l'MVP, cosa resta fuori e come capire se la consegna e' riuscita.

## Sintesi

MrDTwice e' una guida community-driven per luoghi da visitare. L'utente deve
poter esplorare il catalogo, aprire una scheda dettaglio, contribuire con un
nuovo luogo e lasciare un segnale di qualita' tramite rating o recensione.

Il progetto nasce come final project academy: la priorita' e' costruire una
versione semplice, funzionante e presentabile, non una piattaforma completa.

## Utenti e bisogni

| Utente | Bisogno | Risposta MVP |
|---|---|---|
| Visitatore curioso | Trovare luoghi interessanti senza registrarsi. | Home, listing, filtri e schede dettaglio pubbliche. |
| Contributore | Segnalare un posto utile alla community. | Form "Aggiungi luogo" con dati base e immagine. |
| Valutatore | Dare un feedback rapido su un luogo. | Rating o recensione collegata alla scheda dettaglio. |

## Funzionalita' core

- Esplorazione dei luoghi.
- Ricerca e filtri per regione, citta', categoria o tag.
- Scheda dettaglio con immagine, descrizione, metadati e valutazione media.
- Inserimento di un nuovo luogo.
- Upload di almeno una immagine.
- Rating da 1 a 5 stelle.
- Recensioni testuali.

## Scope MVP

Dentro la prima versione:

- Catalogo pubblico.
- Navigazione tra home, regioni/listing, dettaglio e pagina informativa.
- Database Supabase PostgreSQL per i dati principali.
- Supabase Storage per immagini pubbliche.
- Backend Express come API tra frontend e database, salvo upload immagini che puo'
  avvenire direttamente dal frontend verso Storage.

Fuori dalla prima versione:

- Login e registrazione.
- Profili utente.
- Preferiti, wishlist e follow.
- Moderazione avanzata.
- Sistema notifiche.
- Algoritmi di raccomandazione.
- Test automatizzati.

## Criteri di successo

L'MVP e' consegnabile quando un utente puo':

1. Aprire l'app e capire subito il tema del progetto.
2. Esplorare una lista di luoghi.
3. Filtrare o cercare nel catalogo.
4. Aprire una scheda dettaglio.
5. Aggiungere un nuovo luogo con dati essenziali.
6. Caricare almeno una immagine.
7. Lasciare un rating o una recensione.

I test automatizzati sono fuori scope per l'MVP. La qualita' minima richiesta per
la consegna si basa su build, lint/format e verifica manuale dei flussi principali.

## Decisioni prodotto

- L'app deve funzionare senza autenticazione.
- Il contributo utente deve restare breve: pochi campi obbligatori e un'immagine.
- La tassonomia principale e' basata su regioni, categorie, tag e sottotag.
- Le pagine devono essere semplici da presentare in demo: flussi brevi, CTA chiare,
  niente dipendenze da account personali.

## Prossima lettura

Continua con [Architettura informativa e flussi](information-architecture.md) per
vedere come questo concept diventa navigazione e schermate.
