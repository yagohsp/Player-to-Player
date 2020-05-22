import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Multiselect } from 'multiselect-react-dropdown';
import api from '../services/api';

import PlayerInfo from '../components/PlayerInfo';

function Players() {
  const [players, setPlayers] = useState([]);
  const [dias, setdias] = useState([]);
  const [jogos, setjogos] = useState([]);
  const [listaJogos, setListaJogos] = useState([]);
  const [listaDias, setListaDias] = useState([]);

  async function carregarJogadores() {
    const players = await api.get("/players");
    setPlayers(players.data);
  }

  async function filtrarPorDias(selectedList) {
    setdias(selectedList);
    const response = await api.get('/search',
      {
        params: {
          dias: selectedList,
          jogos
        }
      })
    setPlayers(response.data);
  }

  async function filtrarPorJogos(selectedList) {
    setjogos(selectedList);
    const response = await api.get('/search',
      {
        params: {
          dias,
          jogos: selectedList
        }
      })
    setPlayers(response.data);
  }

  useEffect(() => {
    setListaDias(["segunda", "terça", "quarta", "quinta", "sexta", "sábado", "domingo"]);
    setListaJogos(["Counter Strike", "Dota", "Overwatch", "League of Legends", "Monster Hunter",
      "Valorant", "Call of Duty", "Mordhau", "Minecraft", "World of Warcraft", "PUBG"]);
    carregarJogadores();
  }, [])

  useEffect(() => {
  }, [dias, jogos])


  return (
    <div id="playersContent">
      <div>
        <div className="playerForm">
          <strong>Buscar Jogador</strong>
          <form>
            <div className="inputContainer">
              <label htmlFor="jogos">Games</label>
              <Multiselect
                isObject={false}
                options={listaJogos}
                placeholder="Selecione um ou mais jogos"
                closeIcon="cancel"
                onSelect={filtrarPorJogos}
                onRemove={filtrarPorJogos}
              />
            </div>
            <div className="inputContainer">
              <label htmlFor="dias">Dias disponível para jogar</label>
              <Multiselect
                isObject={false}
                options={listaDias}
                placeholder="Selecione um ou mais dias"
                closeIcon="cancel"
                onSelect={filtrarPorDias}
                onRemove={filtrarPorDias}
              />
            </div>
            <Link to="/cadastrar">
              <button>
                Me Cadastrar
            </button>
            </Link>
          </form>
        </div>
        <strong>
          Player-to-Player
        </strong>
      </div>
      <div className="players">
        <ul>
          {players.map(player => (
            <PlayerInfo key={player._id} player={player} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Players;
