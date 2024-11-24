import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import styles from "./HomeContent.module.css";
import { Popover, PopoverTrigger, PopoverContent, Button, Card, CardBody } from "@nextui-org/react";

const HomeContent = () => {
  const [demandas, setDemandas] = useState([]);         // Coleção Demandas
  const [bufalos, setBufalos] = useState([]);           // Coleção Bufalos
  const [funcionarios, setFuncionarios] = useState({}); // Coleção Funcionarios
  const [reproducoes, setReproducoes] = useState({});   // Coleção Reproduções

  const [quantidadeFuncionariosAtivo, setQuantidadeFuncionariosAtivo] = useState(0);
  const [quantidadeFuncionariosInativo, setQuantidadeFuncionariosInativo] = useState(0);



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

  // Fetch para coleção Bufalos
  useEffect(() => {
    const fetchBufalos = async () => {
      try {
        const response = await axios.get("http://localhost:4000/bufalos");
        setBufalos(response.data.bufalos); //'bufalos' array de bufalos
        console.log(bufalos)
      } catch (error) {
        console.log(error);
      }
    };
    fetchBufalos(); // Chamando a função para executar a requisição
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

  // Fetch para coleção Reproducoes
  useEffect(() => {
    const fetchReproducoes = async () => {
      try {
        const response = await axios.get("http://localhost:4000/reproducoes");
        setReproducoes(response.data.reproducoes); //'reproducoes' array de reproducoes
        console.log(reproducoes)
      } catch (error) {
        console.log(error);
      }
    };
    fetchReproducoes(); // Chamando a função para executar a requisição
  }, []); // '[]' dependência do useEffect

  const natalidadeRef = useRef(null);
  const prenhezRef = useRef(null);
  const gestacaoRef = useRef(null);
  const racaRef = useRef(null);
  const sexoRef = useRef(null);

  // Calculo quantidade de Animais Ativos
  const quantidadeBufalos = bufalos.length

  // Calculo quantidade de Funcionarios (Ativos e Inativos)
  useEffect(() => {
    if (funcionarios.length > 0) {
      const ativos = funcionarios.filter((dado) => dado.status === "Ativo").length;
      setQuantidadeFuncionariosAtivo(ativos);
      const inativos = funcionarios.filter((dado) => dado.status === "Inativo").length;
      setQuantidadeFuncionariosInativo(inativos);
    }
  }, [funcionarios]);

  useEffect(() => {
    if (bufalos.length > 0 && reproducoes.length > 0) {
      // Calculando a quantidade de cada Sexo
      const quantidadeMachos = bufalos.filter((dado) => dado.sexo === "Macho").length;
      const quantidadeFemeas = bufalos.filter((dado) => dado.sexo === "Fêmea").length;

      // Calculando a quantidade de cada Raças
      const quantidadeMurrah = bufalos.filter((dado) => dado.raca === "Murrah").length;
      const quantidadeJafarabadi = bufalos.filter((dado) => dado.raca === "Jafarabadi").length;
      const quantidadeMediterrâneo = bufalos.filter((dado) => dado.raca === "Mediterrâneo").length;

      // Calculo de Reproduções
      const quantidadeGestantes = reproducoes.filter((dado) => dado.status === "Em andamento").length;
      const quantidadeNaoGestantes = reproducoes.filter((dado) => dado.status !== "Em andamento").length;
      const totalConcluidas = reproducoes.filter((dado) => dado.status === "Concluido").length;

      const totalInseminadas = reproducoes.length;
      const taxaPrenhez = totalInseminadas > 0 ? (quantidadeGestantes / totalInseminadas) * 100 : 0;
      const taxaNaoPrenhez = 100 - taxaPrenhez;

      const taxaNatalidade = totalInseminadas > 0 ? (totalConcluidas / totalInseminadas) * 100 : 0;
      const taxaNaoNatalidade = 100 - taxaNatalidade;

      const charts = [];

      const createChart = (ref, type, data, options) => {
        const chart = new Chart(ref.current, { type, data, options });
        charts.push(chart);
      };


      createChart(
        natalidadeRef,
        "doughnut",
        {
          labels: ["Nascimento (%)", "Sem nascimento (%)"],
          datasets: [{ data: [taxaNatalidade, taxaNaoNatalidade], backgroundColor: ["#d68910", "#4d4032"] }],
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
          labels: ["Prenhas (%)", "Não prenhas (%)"],
          datasets: [{ data: [taxaPrenhez, taxaNaoPrenhez], backgroundColor: ["#d68910", "#4d4032"] }],
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
          labels: ["Gestantes (%)", "Não gestantes (%)"],
          datasets: [{ data: [quantidadeGestantes, quantidadeNaoGestantes], backgroundColor: ["#d68910", "#4d4032"] }],
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
          labels: ["Murrah", "Jafarabadi", "Mediterrâneo"],
          datasets: [
            {
              label: "Número de Animais",
              data: [quantidadeMurrah, quantidadeJafarabadi, quantidadeMediterrâneo],
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
              data: [quantidadeMachos, quantidadeFemeas],
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
    }
  }, [bufalos, reproducoes]);

  return (
    <div className={styles.content}>
      <div className={styles.indicators}>
        <div className={styles.indicatorCard}>
          <p>Animais ativos</p>
          <h3>{quantidadeBufalos}</h3>
        </div>
        <div className={styles.indicatorCard}>
          <p>Usuários ativos</p>
          <h3>{quantidadeFuncionariosAtivo}</h3>
        </div>
        <div className={styles.indicatorCard}>
          <p>Usuários inativos</p>
          <h3>{quantidadeFuncionariosInativo}</h3>
        </div>
      </div>

      <div className={styles.doughnutCharts}>
        <div className={styles.chartContainer}>
          <canvas ref={natalidadeRef} className={styles.chart}></canvas>
          <h4>Taxa de natalidade</h4>
        </div>

        <div className={styles.chartContainer}>
          <Popover placement="right">
            <PopoverTrigger>
              <Button>(i)</Button>
            </PopoverTrigger>
            <PopoverContent>
              <Card style={{ backgroundColor: "#f9f9f9", borderRadius: "8px", padding: "2px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}>
                <CardBody>
                  <p style={{ fontSize: "14px", color: "#333", lineHeight: "0.3" }}>
                    Indicativo de sucesso da inseminação.
                  </p>
                </CardBody>
              </Card>

            </PopoverContent>
          </Popover>
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
          <h2 style={{ textAlign: "center", fontWeight: "bold", fontSize: "24px", marginBottom: "30px" }}>Últimas Tarefas</h2>
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
              {/* Filtro para renderizar somente tarefas em produção no caso diferente de "Finalizado" */}
              {demandas.filter((demanda) => demanda.status !== "Finalizada").map((demanda) => (
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
