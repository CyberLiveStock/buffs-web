import axios from "axios";
import { useEffect, useRef, useState } from "react";
import HeaderFinanceiro from "../HeaderFinanceiro/HeaderFinanceiro";
import styles from './FinanceiroContent.module.css'


const FinanceiroContent = () => {
    const [financeiros, setFinanceiros] = useState([]); // Coleção Financeiro

    useEffect(() => {
        const fetchFinanceiros = async () => {
            try {
                const response = await axios.get("http://localhost:4000/financeiros");
                setFinanceiros(response.data.financeiros); //'financeiros' array de financeiros
                console.log(financeiros)
            } catch (error) {
                console.log(error);
            }
        };
        fetchFinanceiros(); // Chamando a função para executar a requisição
    }, []); // '[]' dependência do useEffect

    return (
        <div className={styles.content}>
            <HeaderFinanceiro />
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
                            {financeiros.map((financeiro) => (
                                <tr key={financeiro._id}>
                                    <td className="text-center">
                                        {new Date(financeiro.data).toLocaleDateString("pt-BR", {
                                            year: "numeric",
                                            month: "2-digit",
                                            day: "2-digit",
                                        })}
                                    </td>
                                    <td className="text-center">{financeiro.categoria}</td>
                                    <td className="text-center">R$ {financeiro.valor}</td>
                                    <td className="text-center">{financeiro.tipo}</td>
                                    <td className="text-center">{financeiro.beneficiario}</td>
                                    <td className="text-center">{financeiro.status}</td>
                                    <td className="text-center">{financeiro.descricao}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )

}

export default FinanceiroContent;
