const Player = require('../models/PlayerModel');

module.exports = {
    async index(req, res){
        //const { name, nickname, games, playDays } = await Player.find();

        const players = await Player.find();
        
        return res.json(players);
    },

    async store(req, res){
        //const steamApi = await axios.get()

        const { nome, nickname, descricao, jogos, dias, steam } = req.body;
        const { cpf } = req.headers;
        const player = await Player.create({
            nickname,
            nome,
            cpf,
            jogos,
            dias,
            steam,
            descricao
        })
        return res.json(player);
    },

    async delete(req, res){
        const { cpf } = req.headers;

        const player = await Player.findOneAndRemove({
            cpf: cpf
        });

        return res.json(player);
    }
}