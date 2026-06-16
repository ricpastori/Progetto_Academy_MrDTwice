// Router è come una mini-app Express — gestisce le sue routes in isolamento

// NOTA BENE: per ora la tabella fittizia è chiamata:
// >>>>> itemsDaModificare <<<<<
// >>>>> itemsDaModificareService <<<<<
// >>>>> itemsDaModificareNewVariable <<<<<
// >>>>> singleItemDaModificareNewVariable <<<<<

const express = require(`express`)

const router = express.Router()

// NOTA BENE: Modificare il nome della variabile in accordo all nome del service richiamato

const itemsDaModificareService = require(
    `../services/ItemsDaModificare.service`,
)

// ========== GET (ALL) ==========
// PATH: api/itemsDaModificare

router.get(`/`, async (req, res) => {
    try {
        const itemsDaModificareNewVariable =
            itemsDaModificareService.getAllItems()

        res.status(200).json(itemsDaModificareNewVariable)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

// ========== GET (ONE ELEMENT BY ID) ==========
// PATH: api/itemsDaModificare/:id

router.get(`/:id`, async (req, res) => {
    try {
        const singleItemDaModificareNewVariable =
            await itemsDaModificareService.getItemById(req.params.id)

        if (!singleItemDaModificareNewVariable) {
            return res.status(404).json({ error: `Error 404 - Not found` })
        } else {
            return res.status(200).json(singleItemDaModificareNewVariable)
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

// ========== POST ==========
// PATH: api/itemsDaModificare

router.post(`/`, async (req, res) => {
    try {
        const singleItemDaModificareNewVariable =
            await itemsDaModificareService.createItem(req.body)

        res.status(201).json(singleItemDaModificareNewVariable)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

// ========== PUT ==========
// PATH: api/itemsDaModificare/:id

router.put(`:/id`, async (req, res) => {
    try {
        const singleItemDaModificareNewVariable =
            await itemsDaModificareService.updateItemById(
                req.params.id,
                req.body,
            )

        res.status(200).json(singleItemDaModificareNewVariable)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

// ========== DELETE ==========
// PATH: api/itemsDaModificare/:id

router.delete(`/:id`, async (req, res) => {
    try {
        await itemsDaModificareService.deleteItemById(req.paramas.id)

        res.status(204).send()
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

// Infine, esportiamo le routes

module.exports = router
