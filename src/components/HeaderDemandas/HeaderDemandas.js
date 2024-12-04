import styles from "./HeaderDemandas.module.css";

const HeaderDemandas = ({openModal}) => {
  return (
    <div className={`d-flex justify-content-between align-items-center p-3 ${styles.header}`}>
      <span className={`m-0 ${styles.title}`}>Demandas</span>
      <button className={`btn ${styles.button}`} onClick={openModal}>
        Atribuir demanda
      </button>
    </div>
  );
};

export default HeaderDemandas;





