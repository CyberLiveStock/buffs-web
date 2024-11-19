import axios from "axios";
import { useEffect, useRef, useState } from "react";
import styles from './ReproducaoContent.module.css'
import HeaderReproducao from "../HeaderReproducao/HeaderReproducao";

const ReproducaoContent = () => {
    return(
        <div className={styles.content}>
            <HeaderReproducao/>
            <div className={styles.divTabela}>
                {/* TABELA REPRODUÇÃO */}
                <div className={styles.divCorpoTabela}>
                    <table className="table table-striped" id="funcionariosTable">
                        <thead>
                            <tr>
                                <th scope="col" className={styles.headerCell}>Id Reprodução</th>
                                <th scope="col" className={styles.headerCell}>Tag Mãe</th>
                                <th scope="col" className={styles.headerCell}>Raça Mãe</th>
                                <th scope="col" className={styles.headerCell}>Tag Pai</th>
                                <th scope="col" className={styles.headerCell}>Data Inseminação</th>
                                <th scope="col" className={styles.headerCell}>Data Parto</th>
                                <th scope="col" className={styles.headerCell}>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                                <tr>
                                    <td className="text-center">AA</td>
                                </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
export default ReproducaoContent;