import styles from './HeaderZootecnico.module.css'

const HeaderZootecnico = () => {
    return (
      <div className={`d-flex justify-content-between align-items-center p-3 ${styles.header}`}>
        <span className={`m-0 ${styles.title}`}>Controle Zootécnico</span>
        <button 
          className={`btn ${styles.button}`} 
          //onClick={openModal} // Função para abrir o modal
        >
          Exportar Dados
        </button>
      </div>
    );
  };
  
  export default HeaderZootecnico;