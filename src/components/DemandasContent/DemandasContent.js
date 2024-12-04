import axios from "axios";
import react, { useEffect, useState } from "react";
import HeaderDemandas from "../HeaderDemandas/HeaderDemandas";
import styles from "./DemandasContent.module.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import ModalDemandas from "../ModalDemandas/ModalDemandas";


import { Line, Bar } from "react-chartjs-2";
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
  const [isModalOpen, setModalOpen] = useState(false); // Estado do Modal

  const closeModal = () => {
    setModalOpen(false);
  };

  const openModal = () => {
    setModalOpen(true);

  };


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

  // Cadastro de uma nova demanda
  const [nome, setNome] = useState("");
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [categoria, setCategoria] = useState("");
  const [descricao, setDescricao] = useState("");
  const [status, setStatus] = useState("A Fazer");
  
  const handleSubmit = async (e) => {
      const demanda = {
      nome,
      dataInicio,
      dataFim,
      categoria,
      descricao,
    };

    try {
      const response = await axios.post("http://localhost:4000/demandas", demanda);
      console.log("Demanda criada com sucesso:", response.data);
      alert("Demanda atribuída com sucesso!");
      closeModal(); // Fecha o modal após o sucesso
    } catch (error) {
      console.error("Erro ao criar a demanda:", error);
      alert("Erro ao criar a demanda. Tente novamente.");
    }
  };

  return (
    <div className={styles.content}>
      <HeaderDemandas openModal={openModal} />
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

      {/* INICIO DO MODAL DEMANDAS */}
      <ModalDemandas isOpen={isModalOpen} closeModal={closeModal}>
        <h2 style={{ marginLeft: "14px" }}> Atribuir Demanda </h2>
        <form>
          <div className={styles.divModal}>
            <div className="form-group">
              <label label className={styles.labelCustom}>Nome</label>
              <input
                type="text"
                className="form-control"
                placeholder="Digite o nome"
              />
            </div>
          </div>

          <div className={styles.divModal}>
            <div className="form-group">
              <label label className={styles.label} >Data de Início</label>
              <input
                type="date"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label label className={styles.label} >Data de Finalização</label>
              <input
                type="date"
                className="form-control"
              />
            </div>
          </div>
          {/* SELECT BOX - CATEGORIA */}
          <div className={styles.divModal}>
            <div className="form-group">
              <label className={styles.label}>Categoria</label>
              <select className="form-control">
              <option value="placeholder">Selecione a Categoria</option>
                <option value="zootecnico">Zootécnico</option>
                <option value="sanitario">Sanitário</option>
                <option value="reproducao">Reprodução</option>
              </select>
            </div>
          </div>


          <div className={styles.divModal}>
            <div className="form-group">
              <label label className={styles.labelCustom}>Descrição da Demanda</label>
              <input
                type="text"
                className="form-control"
                placeholder="Digite a descrição"
              />
            </div>
          </div>

          <div className={styles.divModal}>
            <button
              type='submit'
              className="btn btn-primary"
              style={{
                backgroundColor: "#CE7D0A",
                border: "2px #CE7D0A",
                color: "black",
              }}
            >
              Atribuir
            </button>

            <button
              type='submit'
              className="btn btn-primary"
              style={{
                backgroundColor: "#FFCF78",
                border: "2px #FFCF78",
                color: "black",
              }}
            >
              Cancelar
            </button>
          </div>
        </form>
      </ModalDemandas>
    </div>
  );
};

export default DemandasContent;
