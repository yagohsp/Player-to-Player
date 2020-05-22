const Player = require('../models/PlayerModel');

module.exports = {
    async find(req, res){
        const { jogos } = req.query;
        const { dias } = req.query;

        if(jogos == undefined && dias == undefined){
            const players = await Player.find()
            return res.json(players);
        }
        else
        if((jogos === '') && (dias === '')){
            const players = await Player.find()
            return res.json(players);
        }
        else
        if(jogos === '' || jogos == undefined){
            const players = await Player.find({
                dias: {
                    $in: dias
                }
            })
            return res.json(players);
        }else 
        if(dias === '' || dias == undefined){
            const players = await Player.find({
                jogos: {
                    $in: jogos
                }
            })
            return res.json(players);
        }
        else{
            const players = await Player.find({
                jogos: {
                    $in: jogos
                },
                dias: {
                    $in: dias
                }
            })
            return res.json(players);
        }
    },

    async findOne(req, res){
        const { cpf } = req.headers
        const player = await Player.findOne({
            cpf: cpf
        })

        return res.json(player);
    }
}