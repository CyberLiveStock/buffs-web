import axios from "axios";
import { useEffect, useRef, useState } from "react";
import HeaderFinanceiro from "../HeaderFinanceiro/HeaderFinanceiro";
import styles from './FinanceiroContent.module.css'


const  FinanceiroContent = () => {
return(
    <div className={styles.content}>
    <HeaderFinanceiro/>
    <div className={styles.divTabela}>
        {/* TABELA FINANCEIRO */}
        <div className={styles.divCorpoTabela}>
            <table className="table table-striped" id="financeiroTable">
                <thead>
                    <tr>
                        <th scope="col" className={styles.headerCell}>Data</th>
                        <th scope="col" className={styles.headerCell}>Categoria</th>
                        <th scope="col" className={styles.headerCell}>Valor</th>
                        <th scope="col" className={styles.headerCell}>Tipo</th>
                        <th scope="col" className={styles.headerCell}>Beneficiário</th>
                        <th scope="col" className={styles.headerCell}>Status</th>
                        <th scope="col" className={styles.headerCell}>Descrição</th>
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

export default FinanceiroContent;
