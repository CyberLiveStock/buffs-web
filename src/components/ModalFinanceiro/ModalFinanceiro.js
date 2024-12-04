import React, { useState } from "react";
import styles from './ModalFinanceiro.module.css'

const ModalFinanceiro = ({ isOpen, closeModal, children }) =>{
    if (!isOpen) return null;
    return(
        <div className={styles.overlay} onClick={closeModal}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeButton} onClick={closeModal}>
                    X
                </button>
                <div className={styles.content}>{children}</div>
            </div>
        </div>
    )
}

export default ModalFinanceiro;
