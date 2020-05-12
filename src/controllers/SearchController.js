const Player = require('../models/PlayerModel');

module.exports = {
    async index(req, res){
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

    }
}