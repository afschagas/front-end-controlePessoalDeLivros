import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { inAxios } from "../services/api";

import ItemLista from "./ItemLista";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManutencaoLivros = () => {
  const [livros, setLivros] = useState([]);

  const { register, handleSubmit, reset } = useForm();

  const obterLista = async () => {
    try {
      const lista = await inAxios.get("livros");
      setLivros(lista.data);
      console.log(lista.data);
    } catch (error) {
      //alert(`Erro... Não foi possível obter os dados: ${error}`);
      toast.error(`Erro... Não foi possível obter os dados`, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  // define o método que será executado asssim que o componente for renderizado
  useEffect(() => {
    obterLista();
  }, []);

  // Filtra Lista
  const filtrarLista = async (campos) => {
    try {
      const lista = await inAxios.get(`livros/filtro/${campos.palavra}`);
      lista.data.length
        ? setLivros(lista.data)
        : toast.warning(`Não há livros com a palavra-chave pesquisada...`, {
            position: toast.POSITION.TOP_RIGHT,
          });

      //alert("Não há livros com a palavra-chave pesquisada...");
    } catch (error) {
      //alert(`Erro... Não foi possível obter os dados: ${error}`);
      toast.error(`Erro... Não foi possível obter os dados`, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  // Exclusão do Registro
  const excluir = async (id, titulo) => {
    if (!window.confirm(`Confirma a exclusão do livro "${titulo}"?`)) {
      return;
    }
    try {
      await inAxios.delete(`livros/${id}`);
      setLivros(livros.filter((livros) => livros.id !== id));
    } catch (error) {
      //alert(`Erro... Não foi possível excluir este livro: ${error}`);
      toast.error(`Erro... Não foi possível excluir este livro`, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  // Alterar registro
  const alterar = async (id, titulo, index) => {
    const novoPreco = Number(
      prompt(`Informe o novo preço do livro "${titulo}"`)
    );
    if (isNaN(novoPreco) || novoPreco === 0) {
      return;
    }
    try {
      await inAxios.put(`livros/${id}`, { preco: novoPreco });
      const livrosAlteracao = [...livros];
      livrosAlteracao[index].preco = novoPreco;
      setLivros(livrosAlteracao);
    } catch (error) {
      //alert(`Erro... Não foi possível alterar o preço: ${error}`);
      toast.error(`Erro... Não foi possível alterar o preço`, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-7">
          <h4 className="fst-italic mt-3">Manutenção</h4>
        </div>
        <div className="col-sm-5">
          <form onSubmit={handleSubmit(filtrarLista)}>
            <div className="input-group mt-3">
              <input
                type="text"
                className="form-control"
                placeholder="Título ou Autor"
                required
                {...register("palavra")}
              />
              <input
                type="submit"
                className="btn btn-primary"
                value="Pesquisar"
              />
              <input
                type="button"
                className="btn btn-danger"
                value="Todos"
                onClick={() => {
                  reset({ palavra: "" });
                  obterLista();
                }}
              />
            </div>
          </form>
        </div>
      </div>

      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>Cód.</th>
            <th>Título</th>
            <th>Autor</th>
            <th>Ano</th>
            <th>Preço</th>
            <th>Foto</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {livros.map((livros, index) => (
            <ItemLista
              key={livros.id}
              id={livros.id}
              titulo={livros.titulo}
              autor={livros.autor}
              ano={livros.ano}
              preco={livros.preco}
              foto={livros.foto}
              excluirClick={() => excluir(livros.id, livros.titulo)}
              alterarClick={() => alterar(livros.id, livros.titulo, index)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManutencaoLivros;
