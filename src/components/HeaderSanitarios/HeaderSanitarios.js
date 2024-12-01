import styles from "./HeaderSanitarios.module.css";
const HeaderSanitarios = ({ onExportarDados }) => {
  return (
    <div className="d-flex justify-content-between align-items-center p-3 bg-light">
      <span className={`m-0 ${styles.title}`}>Controle Sanitário</span>
      <button
        className={`btn ${styles.button}`}
        onClick={onExportarDados} // Chama a função passada
      >
        Exportar Dados
      </button>
    </div>
  );
};

export default HeaderSanitarios;
