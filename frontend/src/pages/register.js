import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
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
                            displayValue="jogos"
                            placeholder="Selecione um ou mais jogos"
                            closeIcon="cancel"
                            onSelect={(selectedOptions) => {setJogos(selectedOptions)}}
                            onRemove={(selectedOptions) => {setJogos(selectedOptions)}}
                        />
                    </div>
                    <div className="inputContainer">
                        <label htmlFor="dias">Dias online</label>
                        <Multiselect
                            isObject={false}
                            options={listaDias}
                            displayValue="jogos"
                            placeholder="Selecione os dias que você joga"
                            closeIcon="cancel"
                            onSelect={(selectedOptions) => {setDias(selectedOptions)}}
                            onRemove={(selectedOptions) => {setDias(selectedOptions)}}
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
                    <button type="submit">
                        Enviar
                    </button>
                </form>
            </div>
        </div >
    )
}
