import { useEffect, useState } from "react";
import HeaderDemandas from "../HeaderDemandas/HeaderDemandas";
import styles from "./DemandasContent.module.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
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
import axios from "axios";

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

  // Dados estáticos para o gráfico de barras
  const statusData = {
    labels: ["A Fazer", "Fazendo", "Finalizado"],
    datasets: [
      {
        label: "Status das Atividades",
        data: [10, 5, 20],
        backgroundColor: ["#FF6384", "#36A2EB", "#4BC0C0"],
        borderWidth: 1,
      },
    ],
  };




  return (
    <div className={styles.content}>
      <HeaderDemandas />
      <div className={styles.container}>

        <div className={styles.containerCard}>
          <div className={styles.rowCard}>
            <div className={styles.cardPhoto}>
              <div className={styles.photo}>
                <img
                  src="/images/perfil-joao.png"
                  alt="Perfil João Lima"
                  className={styles.photoSize}
                />
              </div>
            </div>


            <div className={styles.cardDescription}>
              <div className={styles.name}>
                <h5>João Lima</h5>
              </div>
              <p>
                <span className={styles.statusLabel}>Status:</span>
                <span className={styles.statusValue}> Em andamento</span>
              </p>
              <p>
                <span className={styles.statusLabel}>Categoria:</span>
                <span className={styles.statusValue}>Sanitário</span>
              </p>
            </div>
          </div>


          <div className={styles.rowCard}>
            <div className={styles.cardPhoto}>
              <div className={styles.photo}>
                <img
                  src="/images/foto-vini.svg"
                  alt="Perfil Vinicius Souza"
                  className={styles.photoSize}
                />
              </div>
            </div>
            <div className={styles.cardDescription}>
              <div className={styles.name}>
                <h5>Vinicius Souza</h5>
              </div>
              <p>
                <span className={styles.statusLabel}>Status:</span>
                <span className={styles.statusValue}> Concluída</span>
              </p>
              <p>
                <span className={styles.statusLabel}>Categoria:</span>
                <span className={styles.statusValue}>Zootécnico</span>
              </p>
            </div>
          </div>


          <div className={styles.rowCard}>
            <div className={styles.cardPhoto}>
              <div className={styles.photo}>
                <img
                  src="/images/foto-pc.png"
                  alt="Perfil Paulo Candiani"
                  className={styles.photoSize}
                />
              </div>
            </div>
            <div className={styles.cardDescription}>
              <div className={styles.name}>
                <h5>Paulo Candiani</h5>
              </div>
              <p>
                <span className={styles.statusLabel}>Status:</span>
                <span className={styles.statusValue}> Não Iniciada</span>
              </p>
              <p>
                <span className={styles.statusLabel}>Categoria:</span>
                <span className={styles.statusValue}>Reprodução</span>
              </p>
            </div>
          </div>
        </div>


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
              <tr>
                <td className="text-center"></td>
                <td className="text-center"></td>
                <td className="text-center"></td>
                <td className="text-center"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DemandasContent;
