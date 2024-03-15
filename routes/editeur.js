const express = require('express');
const router = express.Router();
const Editeur = require('../models/EditeurModel');
router.get('/all', async (req, res) => {
    try {
        const editeurs = await Editeur.find();
        res.json(editeurs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.get('/names', async (req, res) => {
    try {
        const editeurs = await Editeur.find({}, 'nom');
        res.json(editeurs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.post('/add', async (req, res) => {
    const editeur = new Editeur({
        nom: req.body.nom,
        adresse: req.body.adresse,
        date_creation: req.body.date_creation
    });

    try {
        const newEditeur = await editeur.save();
        res.status(201).json(newEditeur);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
router.put('/update/:name', async (req, res) => {
    try {
        const editeur = await Editeur.findOneAndUpdate(
            { nom: req.params.name },
            { $set: req.body },
            { new: true }
        );
        res.json(editeur);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
router.delete('/delete/:name', async (req, res) => {
    try {
        await Editeur.deleteOne({ nom: req.params.name });
        res.json({ message: 'Éditeur supprimé' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
module.exports = router;