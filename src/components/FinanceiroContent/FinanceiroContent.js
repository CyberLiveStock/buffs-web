import axios from "axios";
import { useEffect, useState } from "react";
import HeaderFinanceiro from "../HeaderFinanceiro/HeaderFinanceiro";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import styles from './FinanceiroContent.module.css';
import ModalFinanceiro from "../ModalFinanceiro/ModalFinanceiro";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const FinanceiroContent = () => {

  const [isModalOpen, setModalOpen] = useState(false); // Estado do Modal

  const closeModal = () => {
    setModalOpen(false);
  };

  const openModal = () => {
    setModalOpen(true);

  };

  const [financeiros, setFinanceiros] = useState([]); // Coleção Financeiro

  const fetchFinanceiros = async () => {
    try {
      const response = await axios.get("http://localhost:4000/financeiros");
      setFinanceiros(response.data.financeiros);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchFinanceiros(); // Executar a função ao carregar o componente
  }, []);


  const [demandas1, setDemandas1] = useState([]);
  const [chartData1, setChartData1] = useState({
    labels: [],
    datasets: [],
  });
  useEffect(() => {
    const fetchDemandas = async () => {
      try {
        const response = await axios.get("http://localhost:4000/financeiroCat");
        const demandas1 = response.data; // Array retornado da API
        setDemandas1(demandas1);
        // Grafico Rendimento categoria
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
        const categorias = [...new Set(demandas1.map((item) => item.categoria))]; // EixoY
        const datasets = categorias.map((categoria, index) => {
          const data = labels.map((label) => {
            const [mes, ano] = label.split("/");
            const demanda = demandas1.find(
              (item) =>
                item.categoria === categoria &&
                item.mes === parseInt(mes) &&
                item.ano === parseInt(ano)
            );
            return demanda ? demanda.totalFinanceiros : 0;
          });
          // Paletas de cores para o datasets(Linha de categorias)
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

  // Cadastrode uma Nova Financia
  const [valor, setValor] = useState("");
  const [status, setStatus] = useState("");
  const [data, setData] = useState("");
  const [categoria, setCategoria] = useState("");
  const [tipo, setTipo] = useState("");
  const [beneficiario, setBeneficiario] = useState("");
  const [descricao, setDescricao] = useState("");

  // Função para tratar o envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita o reload da página

    const financeiroData = {
      valor,
      status,
      data,
      categoria,
      tipo,
      beneficiario,
      descricao,
    };

    try {
      const response = await axios.post("http://localhost:4000/financeiro", financeiroData);
      console.log("Registro financeiro adicionado com sucesso:", response.data);
      alert("Registro financeiro adicionado com sucesso!");
      closeModal(); // Fecha o modal após o sucesso
    } catch (error) {
      console.error("Erro ao adicionar registro financeiro:", error);
      alert("Erro ao adicionar registro financeiro. Tente novamente.");
    }
  };

  return (
    <div className={styles.content}>
      <HeaderFinanceiro openModal={openModal} />

      {/* Gráficos Lado a Lado */}
      <div className={styles.chartContainer}>
        <div className={styles.chartWrapper}>
          <h3 className={styles.chartTitle}>Custos Bubalinos</h3>
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

        <div className={styles.chartWrapper}>
          <h3 className={styles.chartTitle}>Custos Funcionários</h3>

        </div>
      </div>

      {/* TABELA FINANCEIRO */}
      <div className={styles.divTabela}>
        <div className={styles.divCorpoTabela}>
          <table className="table table-striped" id="financeiroTable">
            <thead>
              <tr>
                <th scope="col" className={styles.headerCell}>Status</th>
                <th scope="col" className={styles.headerCell}>Valor</th>
                <th scope="col" className={styles.headerCell}>Data</th>
                <th scope="col" className={styles.headerCell}>Categoria</th>
                <th scope="col" className={styles.headerCell}>Tipo</th>
                <th scope="col" className={styles.headerCell}>Beneficiário</th>
                <th scope="col" className={styles.headerCell}>Descrição</th>
              </tr>
            </thead>
            <tbody>
              {financeiros.map((financeiro) => (
                <tr key={financeiro._id}>
                  <td className="text-center">{financeiro.status}</td>
                  <td className="text-center">{financeiro.valor}</td>
                  <td className="text-center">
                    {new Date(financeiro.data).toLocaleDateString("pt-BR", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })}
                  </td>
                  <td className="text-center">{financeiro.categoria}</td>
                  <td className="text-center">{financeiro.tipo}</td>
                  <td className="text-center">{financeiro.beneficiario}</td>
                  <td className="text-center">{financeiro.descricao}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ModalFinanceiro isOpen={isModalOpen} closeModal={closeModal}>
        <h2 style={{ marginLeft: "14px" }}> Financeiro </h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.divModal}>
            <div className="form-group">
              <label className={styles.label}>Valor</label>
              <input
                type="text"
                className="form-control"
                placeholder="Digite o valor"
                value={valor}
                onChange={(e) => setValor(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className={styles.label}>Status</label>
              <input
                type="text"
                className="form-control"
                placeholder="Digite o status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
              />
            </div>
          </div>

          <div className={styles.divModal}>
            <div className="form-group">
              <label className={styles.label}>Data</label>
              <input
                type="date"
                className="form-control"
                value={data}
                onChange={(e) => setData(e.target.value)}
                required
              />
            </div>
          </div>

          <div className={styles.divModal}>
            <div className="form-group">
              <label className={styles.label}>Categoria</label>
              <select
                className="form-control"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                required
              >
                <option value="">Selecione a Categoria</option>
                <option value="Zootecnico">Zootécnico</option>
                <option value="Sanitario">Sanitário</option>
                <option value="Reprodução">Reprodução</option>
              </select>
            </div>

            <div className="form-group">
              <label className={styles.label}>Tipo</label>
              <select
                className="form-control"
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
                required
              >
                <option value="">Selecione o tipo</option>
                <option value="unico">Único</option>
                <option value="diario">Diário</option>
                <option value="semanal">Semanal</option>
                <option value="mensal">Mensal</option>
                <option value="semestral">Semestral</option>
                <option value="anual">Anual</option>
              </select>
            </div>
          </div>

          <div className={styles.divModal}>
            <div className="form-group">
              <label className={styles.labelCustom}>Beneficiário</label>
              <input
                type="text"
                className="form-control"
                placeholder="Digite o beneficiário"
                value={beneficiario}
                onChange={(e) => setBeneficiario(e.target.value)}
                required
              />
            </div>
          </div>

          <div className={styles.divModal}>
            <div className="form-group">
              <label className={styles.labelCustom}>Descrição</label>
              <input
                type="text"
                className="form-control"
                placeholder="Digite a descrição"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                required
              />
            </div>
          </div>

          <div className={styles.divModal}>
            <button
              type="submit"
              className="btn btn-primary"
              style={{
                backgroundColor: "#CE7D0A",
                border: "2px #CE7D0A",
                color: "black",
              }}
            >
              Adicionar
            </button>

            <button
              type="button"
              className="btn btn-primary"
              style={{
                backgroundColor: "#FFCF78",
                border: "2px #FFCF78",
                color: "black",
              }}
              onClick={closeModal}
            >
              Cancelar
            </button>
          </div>
        </form>
      </ModalFinanceiro>
    </div>
  );
};

export default FinanceiroContent;
