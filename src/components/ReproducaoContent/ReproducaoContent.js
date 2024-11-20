import axios from "axios";
import { useEffect, useRef, useState } from "react";
import styles from './ReproducaoContent.module.css'
import HeaderReproducao from "../HeaderReproducao/HeaderReproducao";

const ReproducaoContent = () => {
    const [reproducoes, setReproducoes] = useState([]);

    useEffect(() => {
        const fetchReproducoes = async () => {
          try {
            const response = await axios.get("http://localhost:4000/reproducoes");
            setReproducoes(response.data.reproducoes); //'reproducoes' array de reproducoes
            console.log(reproducoes)
          } catch (error) {
            console.log(error);
          }
        };
        fetchReproducoes(); // Chamando a função para executar a requisição
      }, []); // '[]' dependência do useEffect

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
                                <th scope="col" className={styles.headerCell}>Raça Pai</th>
                                <th scope="col" className={styles.headerCell}>Data Inseminação</th>
                                <th scope="col" className={styles.headerCell}>Data Parto</th>
                                <th scope="col" className={styles.headerCell}>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                        {reproducoes.map((reproducao) => (
                                <tr key={reproducao._id}>
                                    <td className="text-center"></td>
                                    <td className="text-center">{reproducao.tagMae}</td>
                                    <td className="text-center">{reproducao.mae?.raca || "Não Informada"}</td>
                                    <td className="text-center">{reproducao.tagPai}</td>
                                    <td className="text-center">{reproducao.pai?.raca || "Não Informada"}</td>
                                    <td className="text-center">
                                        {new Date(reproducao.dataInseminacao).toLocaleDateString("pt-BR")}
                                    </td>
                                    <td className="text-center">
                                        {new Date(reproducao.dataParto).toLocaleDateString("pt-BR")}
                                    </td>
                                    <td className="text-center">{reproducao.status}</td>                                
                                </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
export default ReproducaoContent;