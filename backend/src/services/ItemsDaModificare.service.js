// Importiamo il client Supabase.
// SupabaseService non deve preoccuparsi della connessione > gestita da server.js

// NOTA BENE: per ora la tabella fittizia è chiamata:
// >>>>> itemsDaModificare <<<<<

const { supabase } = require("../../db")

// ========== GET (ALL) ==========

// Imposto un fuzione GET per ricevere tutti i dati da una tabella

// .select('*') seleziona tutte le colonne
// NB: cambiare .select('id, nome, prezzo') per evitare di trasferire dati inutili

async function getAllItems() {
    const { data, error } = await supabase.from(`itemsDaModificare`).select(`*`)

    if (error) throw error

    return data
}

// ========== GET (ONE ELEMENT BY ID) ==========

// Imposto un fuzione GET per ricevere un ID specifico

// .eq('id', id) è l'equivalente SQL di WHERE id = id
// .single() trasforma il risultato da array a oggetto singolo

async function getItemById(id) {
    const { data, error } = await supabase
        .from(`itemsDaModificare`)
        .select(`*`)
        .eq(`id`, id)
        .single()

    if (error) throw error

    return data
}

// ========== POST ==========

// Inserisce un nuovo elemento e restituisce una risposta con l'elemento appena creato

// .insert(payload) accetta un oggetto o un array di oggetti
// .select().single() è necessario per ottenere il record inserito in risposta
// Senza .select(), Supabase non restituisce i dati dell'inserimento

async function createItem(payload) {
    const { data, error } = await supabase
        .from(`itemsDaModificare`)
        .insert(payload)
        .select()
        .single()

    if (error) throw error

    return data
}

// ========== PUT ==========

// Aggiorna un elemento esistente identificato prima dal suo ID e restituisce una risposta con l'elemento appena aggiornato

// .update(payload) accetta un oggetto con i campi da aggiornare (anche parziale)

async function updateItemById(id, payload) {
    const { data, error } = await supabase
        .from(`itemsDaModificare`)
        .update(payload)
        .eq(`id`, id)
        .select()
        .single()

    if (error) throw error

    return data
}

// ========== DELETE ==========

// Elimina un elemento esistente identificato tramite il suo ID e restituisce una risposta con l'elemento appena eliminato

// Non usiamo .select() perché dopo la cancellazione non c'è nulla da restituire
// Restituiamo un oggetto { success: true } per confermare l'operazione al router

async function deleteItemById(id) {
    const { error } = await supabase
        .from(`itemsDaModificare`)
        .delete()
        .eq(`id`, id)

    if (error) throw error

    return { success: true }
}

// Infine, esportiamo tutte le funzioni sopra definite

module.exports = {
    getAllItems,
    getItemById,
    createItem,
    updateItemById,
    deleteItemById,
}
