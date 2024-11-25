import axios from "axios";
import { useEffect, useRef, useState } from "react";
import styles from './SanitariosContent.module.css'
import HeaderSanitarios from "../HeaderSanitarios/HeaderSanitarios";

const SanitariosContent = () => {
    const [bufalos, setBufalos] = useState([]);

    useEffect(() => {
        const fetchBufalos = async () => {
            try {
                const response = await axios.get("http://localhost:4000/bufalos");
                setBufalos(response.data.bufalos); //'sanitario' array de sanitarios
                console.log(bufalos)
            } catch (error) {
                console.log(error);
            }
        };
        fetchBufalos(); // Chamando a função para executar a requisição
    }, []); // '[]' dependência do useEffect

    return (
        <div className={styles.content}>
            <HeaderSanitarios />
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
                            {bufalos.map((bufalo) => (
                                <tr key={bufalo._id}>
                                    <td className="text-center">{bufalo.sanitario?.[0]?.nomeTratamento || "N/A"}</td>
                                    <td className="text-center">
                                        {new Date(bufalo.sanitario?.[0]?.dataAplicacao || "N/A").toLocaleDateString("pt-BR", { year: "numeric", month: "2-digit", day: "2-digit" })}
                                    </td>
                                    <td className="text-center">{bufalo.tagBufalo || "N/A"}</td>
                                    <td className="text-center">{bufalo.sanitario?.[0]?.tipoSanitario || "N/A"}</td>
                                    <td>
                                        <img
                                            src="/images/prontuario.svg"
                                            alt="Prontuários"
                                            className={styles.icon}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
export default SanitariosContent;