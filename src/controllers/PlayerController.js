const Player = require('../models/PlayerModel');

module.exports = {
    async index(req, res){
        const players = await Player.find();
        
        return res.json(players);
    },

    async save(req, res){
        const { nome, nickname, descricao, jogos, dias, steam } = req.body;
        const { cpf } = req.headers;

        const player = await Player.updateOne(
        {cpf:cpf},    
        {
            nickname,
            nome,
            cpf,
            jogos,
            dias,
            steam,
            descricao
        }, 
        { upsert : true })
        return res.json(player);
    },

    async delete(req, res){
        const { cpf } = req.headers;

        const player = await Player.remove({
            cpf: cpf
        });
        return res.json(player);
    }
}