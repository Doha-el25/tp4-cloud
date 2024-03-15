const express = require('express');
const router = express.Router();
const Auteur = require('../models/AuteurModel');
router.get('/all', async (req, res) => {
    try {
        const auteurs = await Auteur.find();
        res.json(auteurs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.get('/names', async (req, res) => {
    try {
        const auteurs = await Auteur.find({}, 'nom');
        res.json(auteurs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.post('/add', async (req, res) => {
    const auteur = new Auteur({
        nom: req.body.nom,
        nationalite: req.body.nationalite,
        date_naissance: req.body.date_naissance
    });

    try {
        const newAuteur = await auteur.save();
        res.status(201).json(newAuteur);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
router.put('/update/:name', async (req, res) => {
    try {
        const auteur = await Auteur.findOneAndUpdate(
            { nom: req.params.name },
            { $set: req.body },
            { new: true }
        );
        res.json(auteur);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
router.delete('/delete/:name', async (req, res) => {
    try {
        await Auteur.deleteOne({ nom: req.params.name });
        res.json({ message: 'Auteur supprimé' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
module.exports = router;