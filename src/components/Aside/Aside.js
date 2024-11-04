// src/components/Aside/Aside.js

import styles from './Aside.module.css';

const Aside = () => {
  return (
    <div className={styles.aside}>
      <ul className={styles.menuList}>
        <li><a href="#">Pagina Inicial</a></li>
        <li><a href="#">Demandas</a></li>
        <li><a href="#">Funcionarios</a></li>
        <li><a href="#">Bubalinos</a></li>
        <li><a href="#">Controle Zootécnico</a></li>
        <li><a href="#">Controle Sanitário</a></li>
        <li><a href="#">Controle de reprodução</a></li>
      </ul>
    </div>
  );
};

export default Aside;
