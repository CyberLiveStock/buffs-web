import axios from "axios";
import { useEffect, useRef, useState } from "react";
import styles from './SanitariosContent.module.css'
import HeaderSanitarios from "../HeaderSanitarios/HeaderSanitarios";



const SanitariosContent = () => {
    return(
        <div className={styles.content}>
            <HeaderSanitarios/>
            <div className={styles.divTabela}>
                {/* TABELA DE DADOS SANITARIOS */}
                <div className={styles.divCorpoTabela}>
                    <table className="table table-striped" id="funcionariosTable">
                        <thead>
                            <tr>
                                <th scope="col" className={styles.headerCell}>Nome Tratamento</th>
                                <th scope="col" className={styles.headerCell}>Data</th>
                                <th scope="col" className={styles.headerCell}>Tag</th>
                                <th scope="col" className={styles.headerCell}>Descrição</th>
                                <th scope="col" className={styles.headerCell}>Visualizar</th> 
                                {/* ALTERAR DEPOIS A ULTIMA DE ACORDO COM O FIGMA  */}
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
export default SanitariosContent;