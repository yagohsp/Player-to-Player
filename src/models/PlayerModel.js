const mongoose = require('mongoose');

const PlayerSchema = new mongoose.Schema({
    nome: String,
    cpf: String,
    nickname: String,
    jogos: [String],
    descricao: String,
    dias: [String],
    steam: String
}, {
    timestamps: true
})

module.exports = mongoose.model('Player', PlayerSchema);