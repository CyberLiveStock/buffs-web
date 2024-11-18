import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import styles from "./HomeContent.module.css";

const HomeContent = () => {
  const [demandas, setDemandas] = useState([]);

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


  const natalidadeRef = useRef(null);
  const prenhezRef = useRef(null);
  const gestacaoRef = useRef(null);
  const racaRef = useRef(null);
  const sexoRef = useRef(null);

  useEffect(() => {
    const charts = [];

    const createChart = (ref, type, data, options) => {
      const chart = new Chart(ref.current, { type, data, options });
      charts.push(chart);
    };

    createChart(
      natalidadeRef,
      "doughnut",
      {
        labels: ["Nascimento", "Sem nascimento"],
        datasets: [{ data: [60, 40], backgroundColor: ["#d68910", "#4d4032"] }],
      },
      {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
        },
      }
    );

    createChart(
      prenhezRef,
      "doughnut",
      {
        labels: ["Prenhas", "Não prenhas"],
        datasets: [{ data: [70, 30], backgroundColor: ["#d68910", "#4d4032"] }],
      },
      {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
        },
      }
    );

    createChart(
      gestacaoRef,
      "doughnut",
      {
        labels: ["Gestantes", "Não gestantes"],
        datasets: [{ data: [50, 50], backgroundColor: ["#d68910", "#4d4032"] }],
      },
      {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
        },
      }
    );

    createChart(
      racaRef,
      "bar",
      {
        labels: ["Raça A", "Raça B", "Raça C"],
        datasets: [
          {
            label: "Número de Animais",
            data: [30, 45, 25],
            backgroundColor: ["#43310B", "#CE7D0A", "#FCA90F"],
            borderColor: ["#43310B", "#CE7D0A", "#FCA90F"],
            borderWidth: 1,
          },
        ],
      },
      {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            beginAtZero: true,
          },
          y: {
            beginAtZero: true,
          },
        },
      }
    );

    createChart(
      sexoRef,
      "bar",
      {
        labels: ["Machos", "Fêmeas"],
        datasets: [
          {
            data: [55, 45],
            backgroundColor: ["#43310B", "#FFCF78"],
            borderColor: ["#43310B", "#FFCF78"],
            borderWidth: 1,
            label: null,
          },
        ],
      },
      {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            beginAtZero: true,
          },
          y: {
            beginAtZero: true,
          },
        },
      }
    );

    return () => {
      charts.forEach((chart) => chart.destroy());
    };
  }, []);

  return (
    <div className={styles.content}>
      <div className={styles.indicators}>
        <div className={styles.indicatorCard}>
          <p>Animais ativos</p>
          <h3>110</h3>
        </div>
        <div className={styles.indicatorCard}>
          <p>Usuários ativos</p>
          <h3>3</h3>
        </div>
        <div className={styles.indicatorCard}>
          <p>Usuários inativos</p>
          <h3>2</h3>
        </div>
      </div>

      <div className={styles.doughnutCharts}>
        <div className={styles.chartContainer}>
          <canvas ref={natalidadeRef} className={styles.chart}></canvas>
          <h4>Taxa de natalidade</h4>
        </div>
        <div className={styles.chartContainer}>
          <canvas ref={prenhezRef} className={styles.chart}></canvas>
          <h4>Taxa de prenhez</h4>
        </div>
        <div className={styles.chartContainer}>
          <canvas ref={gestacaoRef} className={styles.chart}></canvas>
          <h4>Em gestação</h4>
        </div>
      </div>

      <div className={styles.barPieCharts}>
        <div className={styles.chartContainer}>
          <canvas ref={racaRef} className={styles.chartb}></canvas>
          <h4>Comparativo de Raças</h4>
        </div>
        <div className={styles.chartContainer}>
          <canvas ref={sexoRef} className={styles.chartb}></canvas>
          <h4>Comparativo de Sexos</h4>
        </div>
      </div>

     {/* TABELA DE FUNCIONÁRIOS */}
     <div className={styles.divTabela}>
      <div>
      <h2 style={{ textAlign: "center", fontWeight: "bold" }}>Ultimas Tarefas</h2>
      </div>
     <div className={styles.divCorpoTabelaS}>
        <table className="table table-striped" id="funcionariosTable">
          <thead>
            <tr>
              <th scope="col" className={styles.headerCell}>Nome</th>
              <th scope="col" className={styles.headerCell}>Tipo de Serviço</th>
              <th scope="col" className={styles.headerCell}>Status</th>
              <th scope="col" className={styles.headerCell}>Funções</th>

            </tr>
          </thead>
          <tbody>
            {demandas.map((demanda) => (
              <tr key={demanda._id}>
                <td className="text-center">{demanda.idFuncionario?.nome || "Sem nome"}</td>
                <td className="text-center">{demanda.categoria}</td>
                <td className="text-center">{demanda.status}</td>
                <td className="text-center">AAAAA</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>


    </div>

  );
};

export default HomeContent;
