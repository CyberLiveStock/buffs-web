import { useEffect, useState } from "react";
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
import axios from "axios";

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

const DemandasContent = () => {
  const [demandas1, setDemandas1] = useState([]);
  const [chartData1, setChartData1] = useState({
    labels: [],
    datasets: [],
  });

  const [demandas2, setDemandas2] = useState([]);
  const [chartData2, setChartData2] = useState({
    labels: [],
    datasets: [],
  });
   
  
  //Grafico Referente ao rendimento do funcionario
  useEffect(() => {
    const fetchDemandas = async () => {
      try {
        const response = await axios.get("http://localhost:4000/demandasGrafFunc");
        const demandas1 = response.data; // Array retornado da API
        setDemandas1(demandas1);

        // Grafico Rendimento Funcionario
        // Processar os dados para o gráfico
        const labels = [...new Set(demandas1.map((item) => `${item.mes}/${item.ano}`))]; // EixoX
        // Organização dos dados - Ordenando Labels
        labels.sort((a, b) => {
          const [mesA, anoA] = a.split("/").map(Number); //Converte a String para Number
          const [mesB, anoB] = b.split("/").map(Number); //Converte a String para Number
          if (anoA === anoB) {
            return mesA - mesB;  // Ordenar por mês se o ano for o mesmo
          }
          return anoA - anoB;  // Caso contrário, ordenar por ano
        });

        const funcionarios = [...new Set(demandas1.map((item) => item.funcionario))]; // EixoY
        const datasets = funcionarios.map((funcionario, index) => {
          const data = labels.map((label) => {
            const [mes, ano] = label.split("/");
            const demanda = demandas1.find(
              (item) =>
                item.funcionario === funcionario &&
                item.mes === parseInt(mes) &&
                item.ano === parseInt(ano)
            );
            return demanda ? demanda.totalDemandas : 0;
          });

          // Paletas de cores para o datasets(Linha de Funcionarios)
          const colors = [
            "#CE7D0A",
            "#FFCF78",
            "#43310B",
          ];

          return {
            label: funcionario,
            data,
            fill: false,
            borderColor: colors[index % colors.length], // Atribui cor ciclicamente
            tension: 0.1,
          };
        });
        
        setChartData1({
          labels,
          datasets,
          
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchDemandas();
  }, []);

  //Grafico Referente ao rendimento das Categorias
  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await axios.get("http://localhost:4000/demandasGrafCat");
        const demandas2 = response.data; // Array retornado da API
        setDemandas2(demandas2);

        // Grafico Rendimento Categorias
        // Processar os dados para o gráfico
        const labels = [...new Set(demandas2.map((item) => `${item.mes}/${item.ano}`))]; // EixoX
        // Organização dos dados - Ordenando Labels
        labels.sort((a, b) => {
          const [mesA, anoA] = a.split("/").map(Number); //Converte a String para Number
          const [mesB, anoB] = b.split("/").map(Number); //Converte a String para Number
          if (anoA === anoB) {
            return mesA - mesB;  // Ordenar por mês se o ano for o mesmo
          }
          return anoA - anoB;  // Caso contrário, ordenar por ano
        });

        const categorias = [...new Set(demandas2.map((item) => item.categoria))]; // EixoY
        const datasets = categorias.map((categoria, index) => {
          const data = labels.map((label) => {
            const [mes, ano] = label.split("/");
            const demanda = demandas2.find(
              (item) =>
                item.categoria === categoria &&
                item.mes === parseInt(mes) &&
                item.ano === parseInt(ano)
            );
            return demanda ? demanda.totalDemandas : 0;
          });

          // Paletas de cores para o datasets(Linha de Funcionarios)
          const colors = [
            "#CE7D0A",
            "#FFCF78",
            "#43310B",
          ];

          return {
            label: categoria,
            data,
            fill: false,
            borderColor: colors[index % colors.length], // Atribui cor ciclicamente
            tension: 0.1,
          };
        });
        
        setChartData2({
          labels,
          datasets,
          
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategorias();
  }, []);

  
  return (
    <div className={styles.content}>
      <HeaderDemandas />
      <div className={styles.container}>
        <div className={styles.chartBox}>
          {/* Gráfico dinâmico dos Funcionarios */}
          <Line
            data={chartData1}
            options={{
              plugins: {
                legend: {
                  position: "bottom",
                },
              },
              responsive: true,
              maintainAspectRatio: true, // Manter proporção
            }}
            width={500}
            height={500}
          />
        </div>

        <div className={styles.chartBox}>
          {/* Gráfico dinâmico das Categorias */}
          <Line
            data={chartData2}
            options={{
              plugins: {
                legend: {
                  position: "bottom",
                },
              },
              responsive: true,
              maintainAspectRatio: true, // Manter proporção
            }}
            width={500}
            height={500}
          />
        </div>
      </div>
    </div>
  );
};

export default DemandasContent;
