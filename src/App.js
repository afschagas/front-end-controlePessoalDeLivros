import { Route, Routes } from "react-router-dom";

import InclusaoLivros from "./components/InclusaoLivros";
import ManutencaoLivros from "./components/ManutencaoLivros";
import MenuSuperior from "./components/MenuSuperior";
import ResumoLivros from "./components/ResumoLivro";



const App = () => {
  return (

    <>


      <MenuSuperior />

      <Routes>
        <Route path="/" element={<InclusaoLivros />} />
        <Route path="manut" element={<ManutencaoLivros />} />
        <Route path="resumo" element={<ResumoLivros />} />
      </Routes>

    </>


  );
};

export default App;
