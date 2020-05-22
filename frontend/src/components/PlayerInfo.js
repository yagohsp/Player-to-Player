import React from 'react'

export default function PlayerInfo({ player }) {
    return (
        <li className="playerInfo">
            <strong>{player.nickname}</strong>
            <span>{player.nome}</span>
            <p><strong>Joga</strong>{player.jogos.join(', ')}</p>
            <p><strong>Nos dias</strong>{player.dias.join(', ')}</p>
            <p style={{ marginBottom: 35 }}>{player.descricao}</p>
            <a href={player.steam}>Acessar perfil Steam</a>
        </li>
    )
}
