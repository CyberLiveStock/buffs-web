import React from "react";
import styles from "./ModalBubalinosSanitarios.module.css";

const ModalBubalinosSanitarios = ({ isOpen, closeModal, children }) => {
  if (!isOpen) return null; // Não renderiza o modal se não estiver aberto.

  return (
    <div className={styles.overlay} onClick={closeModal}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={closeModal}>
          X
        </button>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};

export default ModalBubalinosSanitarios;
