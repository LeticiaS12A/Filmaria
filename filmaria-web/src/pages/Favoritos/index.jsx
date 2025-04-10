import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import './favoritos.css';

export default function Favoritos(){

    const [ filmes, setFilmes] = useState([])
    const [ loading, setLoading ] = useState(true)

    useEffect(() => {
        setLoading(true);
        try{
            const minhaLista = localStorage.getItem('@primeflix');
            setFilmes(minhaLista ? JSON.parse(minhaLista) : []);
        }
        catch(error){
            console.error('Erro ao carregar filmes salvos', error)
            toast.error('Erro ao carregar filme!')
            setFilmes([]);
        }
        finally{
            setLoading(false);
        }
    },[]);

    function Deletar(id){
        const confirma = window.confirm('Tem certeza que deseja apagar este filme?');
        if(!confirma){
            return;
        }

        try{
            const filmeFiltrado = filmes.filter(( item ) => item.id !== id );
            setFilmes(filmeFiltrado)
            localStorage.setItem('@primeflix', JSON.stringify(filmeFiltrado))
            toast.success('filme deletado com sucesso!')
        }
        catch(error){
            console.error('Error ao excluir um filme do localStorage!', error);
            toast.error('Falha ao deletar um filme do localStorage!');
        }

    }
    
    if(loading){
        return(
            <div className="loading-container">
                <h2>Carregando favoritos...</h2>
            </div>
        )
    }
    
    return(
        <div className="container">
            <div className="filmes-container">
                <h1>Filmes Favoritos</h1>
                {filmes.length === 0 && (
                    <span className="lista-vazia"> Você não salvo nenhum filme!</span>
                )}

                <ul>
                    {filmes.map(( item ) => (
                        <li key={item.id}>
                            <span>{item.nome}</span>
                            <div className="acoes">
                                <Link to={`/filme/${item.id}`}>Ver Detalhes</Link>
                                <button onClick={() => Deletar(item.id)}>Excluir</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}