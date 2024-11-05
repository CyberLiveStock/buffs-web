import { useEffect, useState } from "react";
import styles from "./Aside.module.css";

const Aside = ({ isOpen }) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const menuItems = document.querySelectorAll(`.${styles.menuList} li`);
    const currentPath = window.location.pathname;

    const setActiveItem = (item) => {
      menuItems.forEach((i) => i.classList.remove(styles.active));
      item.classList.add(styles.active);
    };

    switch (currentPath) {
      case "/home":
        setActiveItem(menuItems[0]);
        break;
      case "/demandas":
        setActiveItem(menuItems[1]);
        break;
      case "/funcionarios":
        setActiveItem(menuItems[2]);
        break;
      case "/bubalinos":
        setActiveItem(menuItems[3]);
        break;
      case "/controle-zootecnico":
        setActiveItem(menuItems[4]);
        break;
      case "/controle-sanitario":
        setActiveItem(menuItems[5]);
        break;
      case "/controle-reproducao":
        setActiveItem(menuItems[6]);
        break;
      default:
        setActiveItem(menuItems[0]);
    }

    menuItems.forEach((item) => {
      item.addEventListener("click", () => {
        setActiveItem(item);
        if (window.innerWidth <= 768) {
          setIsActive(false); // Fecha o menu após clicar em um item no mobile
        }
      });
    });

    return () => {
      menuItems.forEach((item) => {
        item.removeEventListener("click", () => {});
      });
    };
  }, []);

  return (
    <div className={`${styles.aside} ${isOpen ? styles.active : ""}`}>
      <ul className={styles.menuList}>
        <li>
          <a href="/home">
            <img
              src="/images/icons/home.svg"
              alt="Página Inicial"
              className={styles.icon}
            />{" "}
            Página Inicial
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
            Funcionários
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
