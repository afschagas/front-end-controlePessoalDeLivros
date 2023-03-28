import "./ItemLista.css";

const ItemLista = (props) => {

    let excluirClick = props.excluirClick
    let  alterarClick = props.alterarClick


    return (
        <tr>
            <td>{props.id}</td>
            <td>{props.titulo}</td>
            <td>{props.autor}</td>
            <td>{props.ano}</td>
            <td className="text-end">
                {Number(props.preco).toLocaleString("pt-br", { minimumFractionDigits: 2 })}
            </td>
            <td className="center">
                <img src={props.foto} alt="Capa do Livro" width="75" />
            </td>
            <td className="text-center">
                <i className="exclui text-danger fw-bold" title="Excluir" onClick={excluirClick}>&#10008;</i>
                <i className="altera text-success fw-bold ms-2" title="Alterar" onClick={alterarClick}>&#36;</i>
            </td>
        </tr>
    )
}


export default ItemLista