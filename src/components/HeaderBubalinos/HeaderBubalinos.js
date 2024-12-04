// src/components/HeaderFuncionarios/HeaderFuncionarios.js


import styles from './HeaderBubalinos.module.css'



const HeaderBubalinos = ({ openModal }) => {
  return (
    <div className={`d-flex justify-content-between align-items-center p-3 ${styles.header}`}>
      <span className={`m-0 ${styles.title}`}>Bubalinos</span>
      {/*  
      <button 
        className={`btn ${styles.button}`} 
        // Função para abrir o modal
      >
        Exportar Dados
      </button>*/}
    </div>
  );
};

export default HeaderBubalinos;
