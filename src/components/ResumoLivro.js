import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { inAxios } from "../services/api";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResumoLivros = () => {
  //    return <h2>Resumo</h2>;
  const [resumo, setResumo] = useState([]);
  const [grafico, setGrafico] = useState([]);

  const obterDados = async () => {
    try {
      const dadosResumo = await inAxios.get("livros/dados/resumo");
      setResumo(dadosResumo.data);
      console.log(dadosResumo.data);

      const dadosGrafico = await inAxios.get("livros/dados/grafico");

      // cria um array e adiciona a primeira linha
      const arrayGrafico = [["Ano", "R$ Total"]];

      // percorre cada linha do JSON e adiciona ao array
      dadosGrafico.data.map((dado) =>
        arrayGrafico.push([parseInt(dado.ano), parseInt(dado.total)])
      );
      setGrafico(arrayGrafico);
    } catch (error) {
      //alert(`Erro... Não foi possível obter os dados: ${error}`);
      toast.error(`Erro... Não foi possível obter os dados`, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  // Define o método que será executado assim que o componente for renderizado
  useEffect(() => {
    obterDados();
  }, []);

  return (
    <div className="container">
      <h4 className="mt-3">Resumo</h4>
      <br />
      <div className="d-flex justify-content-center">
        <span className="btn btn-outline-primary btn-lg">
          <p className="badge bg-dark">{resumo.num}</p>
          <p>Nº de Livros Cadastrados</p>
        </span>

        <span className="btn btn-outline-primary btn-lg mx-2">
          <p className="badge bg-dark">
            {Number(resumo.soma).toLocaleString("pt-br", {
              minimumFractionDigits: 2,
            })}
          </p>
          <p>Total Investido em Livros</p>
        </span>
        <br />
        <br />
        <span className="btn btn-outline-primary btn-lg me-2">
          <p className="badge bg-dark">
            {Number(resumo.maior).toLocaleString("pt-br", {
              minimumFractionDigits: 2,
            })}
          </p>
          <p>Maior Preço Cadastrados</p>
        </span>
        <br />
        <br />
        <span className="btn btn-outline-primary btn-lg">
          <p className="badge bg-dark">
            {Number(resumo.media).toLocaleString("pt-br", {
              minimumFractionDigits: 2,
            })}
          </p>
          <p>Preço Médio dos Livros</p>
        </span>
      </div>

      <div className="d-flex justify-content-center">
        <Chart
          width={1000}
          height={420}
          chartType="ColumnChart"
          loader={<div>Carregando Gráfico...</div>}
          data={grafico}
          options={{
            title: "Total de Investimentos em Livros - por Ano de Publicação",
            chartArea: { width: "80%" },
            hAxis: { title: "Ano de Publicação" },
            vAxis: { title: "Preço Acumulado R$" },
            legend: { position: "none" },
          }}
        />
      </div>
    </div>
  );
};

export default ResumoLivros;
