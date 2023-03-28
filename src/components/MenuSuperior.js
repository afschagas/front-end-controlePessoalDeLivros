
import { Link } from "react-router-dom";

const MenuSuperior = () => {
    return (
        <nav className="navbar navbar-expand-sm bg-dark navbar-dark sticky-top" >
            <div className="container">
                <Link to="/" className="navbar-brand" href="#">Controle Pessoal de Livros</Link>
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link to="/" className="nav-link" href="#">Inclusão</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/manut" className="nav-link" href="#">Manutenção</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/resumo" className="nav-link" href="#">Resumo</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default MenuSuperior;