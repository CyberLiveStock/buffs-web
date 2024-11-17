import axios from "axios";
import React, { useEffect, useRef } from "react";
import styles from './BubalinosContent.module.css'
import HeaderBubalinos from "../HeaderBubalinos/HeaderBubalinos";


const BubalinosContent = () => {
    return (

        <div className={styles.content}>
            <HeaderBubalinos/>
            <div className={styles.divTabela}>
                {/* TABELA DE BUBALINOS */}
                <div className={styles.divCorpoTabela}>
                    <table className="table table-striped" id="funcionariosTable">
                        <thead>
                            <tr>
                                <th scope="col" className={styles.headerCell}>Nome</th>
                                <th scope="col" className={styles.headerCell}>Tag</th>
                                <th scope="col" className={styles.headerCell}>Raça</th>
                                <th scope="col" className={styles.headerCell}>Sexo</th>
                                <th scope="col" className={styles.headerCell}>Data Nasc</th>
                                <th scope="col" className={styles.headerCell}>Peso</th>
                                <th scope="col" className={styles.headerCell}>Funções</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="text-center">AAA</td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default BubalinosContent;
