const mongoose = require('mongoose');

const editeurSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true
    },
    adresse: {
        type: String
    },
    date_creation: {
        type: Date
    }
});

module.exports = mongoose.model('Editeur', editeurSchema);
