const express = require('express');
const router = express.Router();
const Livre = require('../models/LivreModel');
router.get('/all', async (req, res) => {
    try {
        const livres = await Livre.find();
        res.json(livres);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.get('/auteurs/:livrename', async (req, res) => {
    try {
        const livre = await Livre.findOne({ titre: req.params.livrename });
        if (!livre) {
            return res.status(404).json({ message: "Livre non trouvé" });
        }
        const auteurs = await Auteur.find({ _id: livre.auteur });
        res.json(auteurs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.get('/editeurs/:livrename', async (req, res) => {
    try {
        const livre = await Livre.findOne({ titre: req.params.livrename });
        if (!livre) {
            return res.status(404).json({ message: "Livre non trouvé" });
        }
        const editeur = await Editeur.findById(livre.editeur);
        res.json(editeur);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.get('/listCategorie/:category', async (req, res) => {
    try {
        const livres = await Livre.find({ categorie: req.params.category });
        res.json(livres);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.get('/list/:annee1/:annee2', async (req, res) => {
    try {
        const livres = await Livre.find({
            annee_publication: { $gte: req.params.annee1, $lte: req.params.annee2 }
        });
        res.json(livres);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.post('/add', async (req, res) => {
    const livre = new Livre({
        titre: req.body.titre,
        auteur: req.body.auteur,
        editeur: req.body.editeur,
        categorie: req.body.categorie,
        annee_publication: req.body.annee_publication
    });

    try {
        const newLivre = await livre.save();
        res.status(201).json(newLivre);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
router.put('/update/:name', async (req, res) => {
    try {
        const livre = await Livre.findOneAndUpdate(
            { titre: req.params.name },
            { $set: req.body },
            { new: true }
        );
        res.json(livre);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
router.delete('/delete/:name', async (req, res) => {
    try {
        await Livre.deleteOne({ titre: req.params.name });
        res.json({ message: 'Livre supprimé' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
module.exports = router;