import axios from "axios";
import { useEffect, useState, useRef } from "react";
import HeaderDemandas from "../HeaderDemandas/HeaderDemandas";
import styles from "./DemandasContent.module.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";


// Registrar os componentes do Chart.js necessários
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const DemandasContent = () => {

  const [demandas, setDemandas] = useState([]);         // Coleção Demandas
  const [funcionarios, setFuncionarios] = useState({}); // Coleção Funcionarios

  // Fetch para coleção Demandas
  useEffect(() => {
    const fetchDemandas = async () => {
      try {
        const response = await axios.get("http://localhost:4000/demandas");
        setDemandas(response.data.demandas); //'demandas' array de demandas
        console.log(demandas)
      } catch (error) {
        console.log(error);
      }
    };
    fetchDemandas(); // Chamando a função para executar a requisição
  }, []); // '[]' dependência do useEffect

  // Fetch para coleção Funcionarios
  useEffect(() => {
    const fetchFuncionarios = async () => {
      try {
        const response = await axios.get("http://localhost:4000/funcionarios");
        setFuncionarios(response.data.funcionarios); //'funcionarios' array de funcionarios
        console.log(funcionarios)
      } catch (error) {
        console.log(error);
      }
    };
    fetchFuncionarios(); // Chamando a função para executar a requisição
  }, []); // '[]' dependência do useEffect

  // Gráfico 
  const [statusData, setStatusData] = useState({
    labels: ["A Fazer", "Em produção", "Finalizado"],
    datasets: [
      {
        label: "Status das Atividades",
        data: [0, 0, 0],
        backgroundColor: ["#FF6384", "#36A2EB", "#4BC0C0"],
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    if (demandas.length > 0) {
      // Calculando a quantidade de cada Status
      const quantidadeAFazer = demandas.filter((dado) => dado.status === "AFazer").length;
      const quantidadeEmProducao = demandas.filter((dado) => dado.status === "Em produção").length;
      const quantidadeFinalizada = demandas.filter((dado) => dado.status === "Finalizada").length;

      // Atualizando os dados do gráfico no estado
      setStatusData({
        labels: ["A Fazer", "Em produção", "Finalizado"],
        datasets: [
          {
            label: "Status das Atividades",
            data: [quantidadeAFazer, quantidadeEmProducao, quantidadeFinalizada],
            backgroundColor: ["#FF6384", "#36A2EB", "#4BC0C0"],
            borderWidth: 1,
          },
        ],
      });
    }
  }, [demandas]);


  return (
    <div className={styles.content}>
      <HeaderDemandas />
      <div className={styles.container}>
        {/* Indicador de Demandas */}
        <div className={styles.wrapper}>
          <h2 className={styles.chartTitle}>Indicador de Demandas</h2>
          <div className={styles.chartBox}>
            <Bar
              data={statusData}
              options={{
                plugins: {
                  legend: {
                    display: false,
                    position: "bottom",
                  },
                },
                responsive: true,
                maintainAspectRatio: false,
              }}
              width={300}
              height={300}
            />
          </div>
        </div>
      </div>

      {/* TABELA DE FUNCIONÁRIOS */}
      <div className={styles.divTabela}>
        <div>
          <h2 style={{ textAlign: "center", fontWeight: "bold", fontSize: "24px", marginBottom: "30px" }}>Últimas Tarefas</h2>
        </div>
        <div className={styles.divCorpoTabela}>
          <table className="table table-striped" id="funcionariosTable">
            <thead>

              <tr>
                <th scope="col" className={styles.headerCell}>Status</th>
                <th scope="col" className={styles.headerCell}>Nome</th>
                <th scope="col" className={styles.headerCell}>Tipo</th>
                <th scope="col" className={styles.headerCell}>Descrição</th>
              </tr>
            </thead>
            <tbody>
              {demandas.map((demanda) => (
                <tr key={demanda._id}>
                  <td className="text-center">{demanda.status}</td>
                  <td className="text-center">{demanda.idFuncionario?.nome || "Sem nome"}</td>
                  <td className="text-center">{demanda.categoria}</td>
                  <td className="text-center">{demanda.descricao}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DemandasContent;
