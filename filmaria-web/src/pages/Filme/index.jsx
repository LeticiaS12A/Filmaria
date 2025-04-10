import { useState, useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from '../../service/api';
import './filme.css';

export default function Filme(){

    //sin bora pegar o id do filme na URL
    const { id} = useParams();

    //vamos usar o useNavigate (hook) para navegação
    const navigate = useNavigate();

    const [filme, setFilmes] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function lerFilmes() {
            setLoading(true);
            try{

                const response = await api.get(`r-api/?api=filmes/${id}`);
                setFilmes(response.data);

            }catch(erro){
                console.error("Não achamo o filmezin, vam bora pra HomePage", erro);
                navigate('/', {replace:true});
                return;

            }finally{
              setLoading(false);
            }
        }
        lerFilmes();
        
    }, [id, navigate]);

    function salvarFilme(){
        if(!filme) return; //garantir que o filme não é null

        const minhaLista = localStorage.getItem('@primeflix');
        let filmesSalvos = JSON.parse(minhaLista) || [];

        const temFilme = filmesSalvos.some((filmesSalvo) => filmesSalvo.id === filme.id);

        if(temFilme){
            toast.warn('Este filme já está na sua lista');
            return;
        }

        filmesSalvos.push(filme);
        localStorage.setItem('@primeflix', JSON.stringify(filmesSalvos));
        toast.success('Salvou com sucesso');
    }

    if(loading){
        return(
            <div className="loading-container">
                <h2>Carregando detalhes do filme</h2>
            </div>
        );
    }

    return(
        <div className="container">
            <div className="filmes-info">
                <article>
                    <h1>{filme.nome}</h1>
                    <img src={filme.foto} 
                    alt={`Foto do filme ${filme.nome}`}
                    />
                    <h3>Sinopse</h3>
                    <p>{filme.sinopse}</p>

                    <div className="botoes">
                        <button onClick={salvarFilme}>
                            Salvar
                        </button>

                        <a target='_blank' rel="noopener noreferrer" href={`https://www.youtube.com/results?search_query=${encodeURIComponent(filme.nome + 'trailer')}`} className="botao-link"> 
                        Trailer
                        </a>
                    </div>

                </article>
            </div>
        </div>
    )
}