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
  const [chartDataBubalino, setChartDataBubalino] = useState({
    labels: [],
    datasets: [
      {
        label: 'Suplementação',
        data: [],
        borderColor: 'rgba(75,192,192,1)',
        fill: false,
      },
      {
        label: 'Ração',
        data: [],
        borderColor: 'rgba(255,99,132,1)',
        fill: false,
      },
      {
        label: 'Vacinas',
        data: [],
        borderColor: 'rgba(255,159,64,1)',
        fill: false,
      },
    ],
  });

  const [chartDataFuncionario, setChartDataFuncionario] = useState({
    labels: [],
    datasets: [
      {
        label: 'Folha de Pagamento',
        data: [],
        borderColor: 'rgba(153, 102, 255, 1)',
        fill: false,
      },
    ],
  });

  useEffect(() => {
    const fetchFinanceiros = async () => {
      try {
        const response = await axios.get("http://localhost:4000/financeiros");
        const data = response.data.financeiros; // 'financeiros' array de financeiros
        setFinanceiros(data);

        // Organizar os dados para os gráficos
        const receitasBubalino = { suplementacao: [], racao: [], vacinas: [] };
        const receitasFuncionario = { folhaDePagamento: [] };
        const labels = [];

        data.forEach((item) => {
          const date = new Date(item.data);
          const label = `${date.getDate()}/${date.getMonth() + 1}`;
          if (!labels.includes(label)) {
            labels.push(label);
          }

          // Custos Bubalinos
          if (item.categoria === 'Suplementação') {
            receitasBubalino.suplementacao.push(item.valor);
            receitasBubalino.racao.push(0);
            receitasBubalino.vacinas.push(0);
          } else if (item.categoria === 'Ração') {
            receitasBubalino.racao.push(item.valor);
            receitasBubalino.suplementacao.push(0);
            receitasBubalino.vacinas.push(0);
          } else if (item.categoria === 'Vacinas') {
            receitasBubalino.vacinas.push(item.valor);
            receitasBubalino.suplementacao.push(0);
            receitasBubalino.racao.push(0);
          } else {
            receitasBubalino.suplementacao.push(0);
            receitasBubalino.racao.push(0);
            receitasBubalino.vacinas.push(0);
          }

          // Custos Funcionários
          if (item.categoria === 'Folha de Pagamento') {
            receitasFuncionario.folhaDePagamento.push(item.valor);
          }
        });

        // Atualizando os gráficos
        setChartDataBubalino((prevData) => ({
          ...prevData,
          labels: labels,
          datasets: [
            { ...prevData.datasets[0], data: receitasBubalino.suplementacao },
            { ...prevData.datasets[1], data: receitasBubalino.racao },
            { ...prevData.datasets[2], data: receitasBubalino.vacinas },
          ],
        }));

        setChartDataFuncionario((prevData) => ({
          ...prevData,
          labels: labels,
          datasets: [
            { ...prevData.datasets[0], data: receitasFuncionario.folhaDePagamento },
          ],
        }));

      } catch (error) {
        console.log(error);
      }
    };
    fetchFinanceiros(); // Chamando a função para executar a requisição
  }, []); // '[]' dependência do useEffect

  return (
    <div className={styles.content}>
      <HeaderFinanceiro openModal={openModal}/>

      {/* Gráficos Lado a Lado */}
      <div className={styles.chartContainer}>
        <div className={styles.chartWrapper}>
          <h3 className={styles.chartTitle}>Custos Bubalinos</h3>
          <Line data={chartDataBubalino} options={{ responsive: true, maintainAspectRatio: true }} />
        </div>

        <div className={styles.chartWrapper}>
          <h3 className={styles.chartTitle}>Custos Funcionários</h3>
          <Line data={chartDataFuncionario} options={{ responsive: true, maintainAspectRatio: true }} />
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
        <form>
          <div className={styles.divModal}>
            <div className="form-group">
              <label label className={styles.label}>Valor</label>
              <input
                type="text"
                className="form-control"
                placeholder="Digite o valor"
              />
            </div>

            <div className="form-group">
              <label label className={styles.label}>Status</label>
              <input
                type="text"
                className="form-control"
                placeholder="Digite o status"
              />
            </div>
          </div>

          <div className={styles.divModal}>
            <div className="form-group">
              <label label className={styles.label} >Data</label>
              <input
                type="date"
                className="form-control"
              />
            </div>
          </div>

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

            <div className="form-group">
              <label label className={styles.label}>Tipo</label>
              <select className="form-control">
                <option value="placeholder">Selecione o tipo</option>
                <option value="zootecnico">Único</option>
                <option value="sanitario">Diário</option>
                <option value="reproducao">Semanal</option>
                <option value="reproducao">Mensal</option>
                <option value="reproducao">Semestral</option>
                <option value="reproducao">Anual</option>
              </select>
            </div>
          </div>


          <div className={styles.divModal}>
            <div className="form-group">
              <label label className={styles.labelCustom}>Beneficiário</label>
              <input
                type="text"
                className="form-control"
                placeholder="Digite o beneficiário"
              />
            </div>
          </div>

          <div className={styles.divModal}>
            <div className="form-group">
              <label label className={styles.labelCustom}>Descrição</label>
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
              Adicionar
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
      </ModalFinanceiro>
    </div>
  );
};

export default FinanceiroContent;
