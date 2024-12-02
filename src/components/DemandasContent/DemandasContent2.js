import { useEffect, useState } from "react";
import HeaderDemandas from "../HeaderDemandas/HeaderDemandas";
import styles from "./DemandasContent.module.css";
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

  const statusOptions = {
    plugins: {
      legend: {
        display: false,
        position: "bottom",
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className={styles.content}>
      <HeaderDemandas />
      <div className={styles.container}>
        <div className={styles.wrapper}> {/* Div embrulho */}
          <h2 className={styles.chartTitle}>Indicador de Demandas</h2>
          <div className={styles.chartBox}>
            <Bar
              data={statusData}
              options={statusOptions}
              width={500}
              height={400}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemandasContent;
