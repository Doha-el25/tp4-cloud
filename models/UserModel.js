const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    nom_complet: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        minlength: 5
    },
    mot_de_passe: {
        type: String,
        required: true,
        minlength: 5
    }
});
module.exports = mongoose.model('User', userSchema);