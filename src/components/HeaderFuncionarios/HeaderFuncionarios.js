// src/components/HeaderFuncionarios/HeaderFuncionarios.js

import styles from './HeaderFuncionarios.module.css';

const HeaderFuncionarios = () => {
  return (
    <div className={`d-flex justify-content-between align-items-center p-3 ${styles.header}`}>
      <span className={`m-0 ${styles.title}`}>Funcionários</span>
      <button className={`btn ${styles.button}`}>Adicionar Funcionário</button>
    </div>
  );
};

export default HeaderFuncionarios;
