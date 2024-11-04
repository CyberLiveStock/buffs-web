
import styles from './HeaderFuncionarios.module.css';

const HeaderFuncionarios = () => {
  return (
    <div className={`d-flex justify-content-between align-items-center p-3 ${styles.header}`}>
      <h2 className={`m-0 ${styles.title}`}>Funcionários</h2>
      <button className={`btn ${styles.button}`}>Adicionar Funcionário</button>
    </div>
  );
};

export default HeaderFuncionarios;
