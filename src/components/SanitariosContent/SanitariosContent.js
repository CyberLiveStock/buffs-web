import axios from "axios";
import { useEffect, useRef, useState } from "react";
import styles from "./SanitariosContent.module.css";
import HeaderSanitarios from "../HeaderSanitarios/HeaderSanitarios";
import "@fortawesome/fontawesome-free/css/all.min.css";

const SanitariosContent = () => {
    const [bufalos, setBufalos] = useState([]);
    const [quantidadeTratamentosAtivos, setQuantidadeTratamentosAtivos] = useState(0);
    const [quantidadeSaudaveis, setQuantidadeSaudaveis] = useState(0);
    const [quantidadeBufalos, setQuantidadeBufalos] = useState(0);

    useEffect(() => {
        const fetchBufalos = async () => {
            try {
                const response = await axios.get("http://localhost:4000/bufalos");
                setBufalos(response.data.bufalos); //'sanitario' array de sanitarios
                console.log(bufalos);
            } catch (error) {
                console.log(error);
            }
        };
        fetchBufalos(); // Chamando a função para executar a requisição
    }, []); // '[]' dependência do useEffect

    // Contadores = QtdBufalos, Tratamento, Saudaveis
    
    useEffect(() => {
        const dataAtual = new Date();
        const bufalosEmTratamento = bufalos.filter((bufalo) =>
            bufalo.sanitario.some((tratamento) =>
                new Date(tratamento.dataAplicacao) <= dataAtual &&
                dataAtual <= new Date(tratamento.dataRetorno)
            )
        );
        setQuantidadeTratamentosAtivos(bufalosEmTratamento.length); 
        setQuantidadeBufalos(bufalos.length)
        setQuantidadeSaudaveis(quantidadeBufalos - quantidadeTratamentosAtivos);
    }, [bufalos]);
    return (
        <div className={styles.content}>
            <HeaderSanitarios />
            <div className={`row mt-3 ${styles.barraPesquisa}`}>
                <div className="col">
                    <form className="input-group" id="searchForm">
                        <input
                            className="form-control"
                            type="search"
                            placeholder="Pesquisar dados sanitários"
                            aria-label="Pesquisar"
                            id="searchInput"
                        />
                        <button
                            className={`btn btn-secondary ${styles.buttonPesquisar}`}
                            type="button"
                        >
                            <i className="fas fa-search"></i> {/* Ícone de lupa */}
                        </button>
                    </form>
                </div>
            </div>

            {/* CONTADOR DE BUBALINOS, OBSERVAÇÃO  E SAUDAVEIS*/}
            {/* CONTADOR DE BUBALINOS */}
            <div className={styles.divContador}>
                <div className={styles.divContainerContador}>
                    <div className={styles.divContainerLeftContador}>
                        <div className={styles.divLeftContador}>
                            <img
                                src="/images/icons/bubalinos.svg"
                                alt="Ícone de Búfalo"
                                className={styles.icon}
                            />
                        </div>
                    </div>

                    <div className={styles.divContainerRightContador}>
                        <div className={styles.divRightContador}>
                            <h5>Total de Búfalos</h5>
                        </div>
                        <div className={styles.divRightContador}>
                            <h2>{quantidadeBufalos}</h2>
                        </div>
                    </div>
                </div>
                {/* CONTADOR DE OBSERVAÇÃO */}
                <div className={styles.divContainerContador}>
                    <div className={styles.divContainerLeftContador}>
                        <div className={styles.divLeftContador}>
                            <img
                                src="/images/icons/termometro.svg"
                                alt="Ícone de Termometro"
                                className={styles.icon}
                            />
                        </div>
                    </div>

                    <div className={styles.divContainerRightContador}>
                        <div className={styles.divRightContador}>
                            <h5>Em Tratamento</h5>
                        </div>
                        <div className={styles.divRightContador}>
                            <h2>{quantidadeTratamentosAtivos}</h2>
                        </div>
                    </div>
                </div>
                {/* CONTADOR DE SAUDAVEIS */}
                <div className={styles.divContainerContador}>
                    <div className={styles.divContainerLeftContador}>
                        <div className={styles.divLeftContador}>
                            <img
                                src="/images/icons/bubalinos.svg"
                                alt="Ícone de Búfalo"
                                className={styles.icon}
                            />
                        </div>
                    </div>

                    <div className={styles.divContainerRightContador}>
                        <div className={styles.divRightContador}>
                            <h5>Saudáveis</h5>
                        </div>
                        <div className={styles.divRightContador}>
                            <h2>{quantidadeSaudaveis}</h2>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.divTabela}>
                {/* TABELA DE DADOS SANITARIOS */}
                <div className={styles.divCorpoTabela}>
                    <table className="table table-striped" id="funcionariosTable">
                        <thead>
                            <tr>
                                <th scope="col" className={styles.headerCell}>
                                    Nome Tratamento
                                </th>
                                <th scope="col" className={styles.headerCell}>
                                    Data
                                </th>
                                <th scope="col" className={styles.headerCell}>
                                    Tag
                                </th>
                                <th scope="col" className={styles.headerCell}>
                                    Descrição
                                </th>
                                <th scope="col" className={styles.headerCell}>
                                    Visualizar
                                </th>
                                {/* ALTERAR DEPOIS A ULTIMA DE ACORDO COM O FIGMA  */}
                            </tr>
                        </thead>
                        <tbody>
                            {bufalos.map((bufalo) => (
                                <tr key={bufalo._id}>
                                    <td className="text-center">
                                        {bufalo.sanitario?.[0]?.nomeTratamento || "N/A"}
                                    </td>
                                    <td className="text-center">
                                        {new Date(
                                            bufalo.sanitario?.[0]?.dataAplicacao || "N/A"
                                        ).toLocaleDateString("pt-BR", {
                                            year: "numeric",
                                            month: "2-digit",
                                            day: "2-digit",
                                        })}
                                    </td>
                                    <td className="text-center">{bufalo.tagBufalo || "N/A"}</td>
                                    <td className="text-center">
                                        {bufalo.sanitario?.[0]?.tipoSanitario || "N/A"}
                                    </td>
                                    <td className="text-center">
                                        <img
                                            src="/images/prontuario.svg"
                                            alt="Prontuários"
                                            className={styles.iconFunction}
                                            onClick={() => openModal(bufalo)}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
export default SanitariosContent;
