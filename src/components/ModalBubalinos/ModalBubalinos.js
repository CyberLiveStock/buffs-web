import React from "react";
import styles from "./ModalBubalinos.module.css";

const ModalBubalinos = ({ isOpen, closeModal, children }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={closeModal}>
          X
        </button>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};
export default ModalBubalinos;
