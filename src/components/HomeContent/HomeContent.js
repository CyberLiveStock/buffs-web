import React, { useEffect } from "react";
import anychart from "anychart";
import styles from "./HomeContent.module.css";

const HomeContent = () => {
  useEffect(() => {
    const createDonutChart = (containerId, title, data) => {
      const chart = anychart.pie(data);
      chart.title(title);
      chart.radius("43%");
      chart.innerRadius("30%");
      chart.container(containerId);
      chart.draw();
    };

    createDonutChart("natalidadeChart", "Taxa de natalidade", [
      { x: "Nasceu", value: 60 },
      { x: "Não Nasceu", value: 40 },
    ]);

    createDonutChart("prenhezChart", "Taxa de prenhez", [
      { x: "Prenhe", value: 70 },
      { x: "Não Prenhe", value: 30 },
    ]);

    createDonutChart("gestacaoChart", "Em gestação", [
      { x: "Em Gestação", value: 50 },
      { x: "Não em Gestação", value: 50 },
    ]);

    const racasData = {
      header: ["Raça", "Quantidade"],
      rows: [
        ["Murrah", 15],
        ["Jafarabadi", 100],
        ["Mediterrâneo", 55],
        ["Carabao", 80],
      ],
    };

    const racasChart = anychart.column();
    racasChart.data(racasData);
    racasChart.title("Comparativo de raças");
    racasChart.container("racasChart");
    racasChart.draw();

    const sexosData = {
      header: ["Sexo", "Quantidade"],
      rows: [
        ["Fêmeas", 100],
        ["Machos", 35],
      ],
    };

    const sexosChart = anychart.column();
    sexosChart.data(sexosData);
    sexosChart.title("Comparativo de sexos");
    sexosChart.container("sexosChart");
    sexosChart.draw();
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
        <div className={styles.indicatorCard}>
          <p>Valor arroba</p>
          <h3>R$ 120</h3>
        </div>
      </div>

      <div className={styles.charts}>
        <div className={styles.donutCharts}>
          <div className={styles.donutChart}>
            <div id="natalidadeChart" className={styles.chart}></div>
          </div>
          <div className={styles.donutChart}>
            <div id="prenhezChart" className={styles.chart}></div>
          </div>
          <div className={styles.donutChart}>
            <div id="gestacaoChart" className={styles.chart}></div>
          </div>
        </div>

        <div className={styles.barCharts}>
          <div className={styles.barChart}>
            <div id="racasChart" className={styles.chart}></div>
          </div>
          <div className={styles.barChart}>
            <div id="sexosChart" className={styles.chart}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeContent;
