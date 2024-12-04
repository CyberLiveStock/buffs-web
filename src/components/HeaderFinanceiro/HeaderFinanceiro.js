
import styles from './HeaderFinanceiro.module.css'

const HeaderFinanceiro = ({openModal}) => {
  return (
    <div className={`d-flex justify-content-between align-items-center p-3 ${styles.header}`}>
      <span className={`m-0 ${styles.title}`}>Financeiro</span>
      <button 
        className={`btn ${styles.button}`} 
        onClick={openModal} // Função para abrir o modal
      >
        Adicionar
      </button>
    </div>
  );
};

export default HeaderFinanceiro;
