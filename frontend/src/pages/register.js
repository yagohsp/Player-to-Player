import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FaArrowLeft, FaTimes, FaSearch } from 'react-icons/fa';
import { Multiselect } from 'multiselect-react-dropdown';
import api from '../services/api';

export default function Register() {
    let history = useHistory();

    const [nickname, setNickname] = useState('');
    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [steam, setSteam] = useState('');
    const [descricao, setDescricao] = useState('');
    const [dias, setDias] = useState([]);
    const [jogos, setJogos] = useState([]);

    const [listaJogos, setListaJogos] = useState([]);
    const [listaDias, setListaDias] = useState([]);

    useEffect(() => {
        setListaDias(["segunda", "terça", "quarta", "quinta", "sexta", "sábado", "domingo"]);
        setListaJogos(["Counter Strike", "Dota", "Overwatch", "League of Legends", "Monster Hunter",
            "Valorant", "Call of Duty", "Mordhau", "Minecraft", "World of Warcraft", "PUBG"]);

    }, [])

    async function deletarJogador(e) {
        e.preventDefault();

        await api.delete('/players', {
            headers: { 'cpf': cpf }
        })
        history.push('/');
    }

    async function cadastrarJogador(e) {
        e.preventDefault();

        await api.post('/players', {
            nickname,
            nome,
            cpf,
            jogos,
            dias,
            steam,
            descricao
        }, {
            headers: { 'cpf': cpf }
        })
        history.push('/');
    }

    async function findPlayer() {
        setNickname('');
        setNome('');
        setJogos([]);
        setDias([]);
        setSteam('');
        setDescricao('');
        if (cpf) {
            const { data: player } = await api.get("/player", {
                headers: { 'cpf': cpf }
            })
            if (player != null) {
                setNickname(player.nickname);
                setNome(player.nome);
                setJogos(player.jogos);
                setDias(player.dias);
                setSteam(player.steam);
                setDescricao(player.descricao);
            }
        }
    }

    return (
        <div id="registerContent">
            <div className="registerForm">
                <Link to="/">
                    <button style={{ border: "none", background: "#fff", marginBottom: 15, cursor: "pointer" }}>
                        <FaArrowLeft size={15} color="#acacac" />
                    </button>
                </Link>
                <form onSubmit={cadastrarJogador} >
                    <div className="inputContainer">
                        <label htmlFor="nickname">Nickname</label>
                        <input name="nickname" id="nickname" required value={nickname} onChange={e => setNickname(e.target.value)} />
                    </div>
                    <div className="inputContainer">
                        <label htmlFor="nome">Nome real</label>
                        <input name="nome" id="nome" required value={nome} onChange={e => setNome(e.target.value)} />
                    </div>
                    <div className="inputContainer">
                        <label htmlFor="cpf">CPF</label>
                        <input name="cpf" id="cpf" required value={cpf} onChange={e => setCpf(e.target.value)} />
                    </div>
                    <div className="inputContainer">
                        <label htmlFor="jogos">Games</label>
                        <Multiselect
                            isObject={false}
                            options={listaJogos}
                            selectedValues={jogos}
                            displayValue="jogos"
                            placeholder="Selecione um ou mais jogos"
                            closeIcon="cancel"
                            onSelect={(selectedOptions) => { setJogos(selectedOptions) }}
                            onRemove={(selectedOptions) => { setJogos(selectedOptions) }}
                        />
                    </div>
                    <div className="inputContainer">
                        <label htmlFor="dias">Dias online</label>
                        <Multiselect
                            isObject={false}
                            options={listaDias}
                            selectedValues={dias}
                            displayValue="jogos"
                            placeholder="Selecione os dias que você joga"
                            closeIcon="cancel"
                            onSelect={(selectedOptions) => { setDias(selectedOptions) }}
                            onRemove={(selectedOptions) => { setDias(selectedOptions) }}
                        />
                    </div>
                    <div className="inputContainer">
                        <label htmlFor="steam">Url Steam</label>
                        <input name="steam" id="steam" required value={steam} onChange={e => setSteam(e.target.value)} />
                    </div>
                    <div className="inputContainer">
                        <label htmlFor="descricao">Descreva seu modo de jogar</label>
                        <textarea name="descricao" id="descricao" required rows="3" value={descricao} onChange={e => setDescricao(e.target.value)} />
                    </div>
                    <div className="buttons">
                        <button type="submit" name="button" onClick={deletarJogador}>
                            <FaTimes color="#fff" />
                        </button>
                        <button name="button" onClick={findPlayer}>
                            <FaSearch color="#fff" />
                        </button>
                        <button type="submit" name="button">
                            Salvar
                        </button>
                    </div>
                </form>
            </div>
        </div >
    )
}
