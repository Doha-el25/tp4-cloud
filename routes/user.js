const express = require('express');
const router = express.Router();
const User = require('../models/UserModel'); 
router.get('/all', async (req, res) => {
    try {
        const users = await User.find(); 
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.get('/names', async (req, res) => {
    try {
        const users = await User.find({}, 'nom_complet');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.post('/add', async (req, res) => {
    const user = new User({
        email: req.body.email,
        nom_complet: req.body.nom_complet,
        username: req.body.username,
        mot_de_passe: req.body.mot_de_passe
    });

    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
router.put('/update/:name', async (req, res) => {
    try {
        const user = await User.findOneAndUpdate(
            { username: req.params.name },
            { $set: req.body },
            { new: true }
        );
        res.json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
router.delete('/delete/:name', async (req, res) => {
    try {
        await User.deleteOne({ username: req.params.name });
        res.json({ message: 'Utilisateur supprimé' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
module.exports = router;