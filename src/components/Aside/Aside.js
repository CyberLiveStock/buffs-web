// src/components/Aside/Aside.js

import { useEffect } from "react";
import styles from "./Aside.module.css";

const Aside = () => {
  useEffect(() => {
    const menuItems = document.querySelectorAll(`.${styles.menuList} li`);
    const currentPath = window.location.pathname; // Obtém a rota atual

    // Função para definir o item ativo
    const setActiveItem = (item) => {
      menuItems.forEach((i) => i.classList.remove(styles.active));
      item.classList.add(styles.active);
    };

    // Define o item ativo com base na rota atual
    switch (currentPath) {
      case "/":
        setActiveItem(menuItems[0]); // Home
        break;
      case "/demandas":
        setActiveItem(menuItems[1]); // Demandas
        break;
      case "/funcionarios":
        setActiveItem(menuItems[2]); // Funcionários
        break;
      case "/bubalinos":
        setActiveItem(menuItems[3]); // Bubalinos
        break;
      case "/controle-zootecnico":
        setActiveItem(menuItems[4]); // Controle Zootécnico
        break;
      case "/controle-sanitario":
        setActiveItem(menuItems[5]); // Controle Sanitário
        break;
      case "/controle-reproducao":
        setActiveItem(menuItems[6]); // Controle de Reprodução
        break;
      default:
        setActiveItem(menuItems[0]); // Fallback para Home
    }

    // Adiciona o evento de clique a cada item
    menuItems.forEach((item) => {
      item.addEventListener("click", () => {
        setActiveItem(item); // Define o item ativo ao clicar
      });
    });

    // Cleanup: remove event listeners ao desmontar o componente
    return () => {
      menuItems.forEach((item) => {
        item.removeEventListener("click", () => {});
      });
    };
  }, []);

  return (
    <div className={styles.aside}>
      <ul className={styles.menuList}>
        <li>
          <a href="/">
            <img
              src="/images/icons/home.svg"
              alt="Página Inicial"
              className={styles.icon}
            />{" "}
            Pagina Inicial
          </a>
        </li>
        <li>
          <a href="/demandas">
            <img
              src="/images/icons/demandas.svg"
              alt="Demandas"
              className={styles.icon}
            />{" "}
            Demandas
          </a>
        </li>
        <li>
          <a href="/funcionarios">
            <img
              src="/images/icons/funcionarios.svg"
              alt="Funcionários"
              className={styles.icon}
            />{" "}
            Funcionarios
          </a>
        </li>
        <li>
          <a href="/bubalinos">
            <img
              src="/images/icons/bubalinos.svg"
              alt="Bubalinos"
              className={styles.icon}
            />{" "}
            Bubalinos
          </a>
        </li>
        <li>
          <a href="/controle-zootecnico">
            <img
              src="/images/icons/statistics.svg"
              alt="Controle Zootécnico"
              className={styles.icon}
            />{" "}
            Controle Zootécnico
          </a>
        </li>
        <li>
          <a href="/controle-sanitario">
            <img
              src="/images/icons/statistics.svg"
              alt="Controle Sanitário"
              className={styles.icon}
            />{" "}
            Controle Sanitário
          </a>
        </li>
        <li>
          <a href="/controle-reproducao">
            <img
              src="/images/icons/statistics.svg"
              alt="Controle de Reprodução"
              className={styles.icon}
            />{" "}
            Controle de Reprodução
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Aside;
