import { useEffect, useRef, useState } from "react";
import HeaderDemandas from "../HeaderDemandas/HeaderDemandas";
import styles from "./DemandasContent.module.css";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
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
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];
const data = {
  labels: labels,
  datasets: [
    {
      label: "Dataset 1",
      data: [65, 59, 80, 81, 56, 55, 40],
      fill: false,
      borderColor: "#CE7D0A", // Cor 1
      tension: 0.1,
    },
    {
      label: "Dataset 2",
      data: [45, 39, 70, 61, 46, 45, 30],
      fill: false,
      borderColor: "#FFCF78", // Cor 2
      tension: 0.1,
    },
    {
      label: "Dataset 3",
      data: [25, 49, 60, 71, 36, 35, 20],
      fill: false,
      borderColor: "#43310B", // Cor 3
      tension: 0.1,
    },
  ],
};

const config = {
  type: "line",
  data: data,
  options: {
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  },
};

const DemandasContent = () => {
  const [demandas, setDemandas] = useState([]);
  const [funcionarios, setFuncionarios] = useState([])

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


  return (
    <div className={styles.content}>
      <HeaderDemandas />
      <div className={styles.container}>
        <div className={styles.chartBox}>
          {/* Primeiro gráfico com 3 linhas */}
          <Line data={data} options={config.options} width={300} height={300} />
        </div>
        <div className={styles.chartBox}>
          {/* Segundo gráfico permanece inalterado */}
          <Line data={data} options={config.options} width={300} height={300} />
        </div>
      </div>
    </div>
  );
};

export default DemandasContent;
