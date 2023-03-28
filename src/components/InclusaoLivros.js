
import { useState } from "react";
import { useForm } from "react-hook-form";
import { inAxios } from "../services/api";

import RelaxWithBook from "../image/relax-with-book.png";

const InclusaoLivros = () => {
    // register serve para definir os nomes dos compos do form (e validadções)
    // handleSubmit, para inicar o método a ser acionado no evento onSubmit do form
    const { register, handleSubmit, reset } = useForm();

    const [aviso, setAviso] = useState("");

    // método chamdo ao enviar o form (onSubmit)
    const salvar = async (campos) => {
        try {
            const response = await inAxios.post("livros", campos);
            setAviso(`Ok! Livro cadastrado com código ${response.data.id}`);
        } catch (error) {
            setAviso(`Erro... Livro não cadastrado: ${error}`);
        }

        // setTimeout: executa o comando após o tempo indicado(em milissegundos)
        setTimeout(() => {
            setAviso("");
        }, 5000);

        // limpa os camposde formulário para uma nova inclusão
        reset({ titulo: "", autor: "", foto: "", ano: "", preco: "" });
    };

    // const salvar = (campos) => {
    //     alert(JSON.stringify(campos));
    // }

    return (
        <div className="container">
            <h4 className="fst-italic mt-3">Inclusão</h4>
            <br />
            <form onSubmit={handleSubmit(salvar)}>
                <div className="form-group">
                    <label htmlFor="titulo">Título</label>
                    <input type="text" className="form-control" id="titulo" required autoFocus {...register("titulo")} />
                </div>

                <div className="form-group mt-2">
                    <label htmlFor="autor">Autor:</label>
                    <input type="text" className="form-control" id="autor" required {...register("autor")} />
                </div>

                <div className="form-group mt-2">
                    <label htmlFor="foto">URL da Foto:</label>
                    <input type="url" className="form-control" id="foto" required {...register("foto")} />
                </div>

                <div className="row mt-2">
                    <div className="col-sm-4">
                        <div className="form-group">
                            <label htmlFor="ano">Ano de Publicação:</label>
                            <input type="number" className="form-control" id="ano" required {...register("ano")} />
                        </div>
                    </div>

                    <div className="col-sm-8">
                        <div className="form-group">
                            <label htmlFor="preco">Preço R$:</label>
                            <input type="number" className="form-control" id="preco" step="0.01" required {...register("preco")} />
                        </div>
                    </div>
                </div>
                <input type="submit" className="btn btn-primary mt-3" value="Enviar" />
                <input type="reset" className="btn btn-danger mt-3 ms-3" value="Limpar" />

            </form>
            <br />
            <br />
            <div className={aviso.startsWith("Ok!") ? "alert alert-success" :
                aviso.startsWith("Erro") ? "alert alert-danger" : ""}> {aviso}
            </div>

            <img src={RelaxWithBook} alt="Boneco lendo um Livro" align="right" />
        </div>
    );
}

export default InclusaoLivros;