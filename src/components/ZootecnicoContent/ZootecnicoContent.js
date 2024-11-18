import axios from "axios";
import { useEffect, useRef, useState } from "react";
import styles from './ZootecnicoContent.module.css'
import HeaderZootecnico from "../HeaderZootecnico/HeaderZootecnico";

const ZootecnicoContent = () => {
    const [bufalos, setBufalos] = useState([]);

    useEffect(() => {
        const fetchBufalos = async () => {
          try {
            const response = await axios.get("http://localhost:4000/bufalos");
            setBufalos(response.data.bufalos); //'bubalinos' array de bubalinos
            console.log(bufalos)
          } catch (error) {
            console.log(error);
          }
        };
        fetchBufalos(); // Chamando a função para executar a requisição
      }, []); // '[]' dependência do useEffect
    return (
        <div className={styles.content}>
            <HeaderZootecnico/>
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
                        {bufalos.map((bufalo) => (
                                <tr key={bufalo._id}>
                                    <td className="text-center">{bufalo.nome}</td>
                                    <td className="text-center">{bufalo.tagBufalo}</td>
                                    <td className="text-center">{bufalo.raca}</td>
                                    <td className="text-center">{bufalo.sexo}</td>
                                    <td className="text-center">
                                        {new Date(bufalo.dataNasc).toLocaleDateString("pt-BR", { year: "numeric", month: "2-digit", day: "2-digit" })}
                                    </td>
                                    <td className="text-center">{bufalo.peso}</td>
                                    <td className="text-center">AA</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ZootecnicoContent;