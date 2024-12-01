import axios from "axios";
import { useEffect, useRef, useState } from "react";
import styles from "./ZootecnicoContent.module.css";
import HeaderZootecnico from "../HeaderZootecnico/HeaderZootecnico";
import "@fortawesome/fontawesome-free/css/all.min.css";

const ZootecnicoContent = () => {
  const [bufalos, setBufalos] = useState([]);

  useEffect(() => {
    const fetchBufalos = async () => {
      try {
        const response = await axios.get("http://localhost:4000/bufalos");
        setBufalos(response.data.bufalos); //'bubalinos' array de bubalinos
        console.log(bufalos);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBufalos(); // Chamando a função para executar a requisição
  }, []); // '[]' dependência do useEffect

  const quantidadeBufalos = bufalos.length;

  return (
    <div className={styles.content}>
      <HeaderZootecnico />
      <div className={`row mt-3 ${styles.barraPesquisa}`}>
        <div className="col">
          <form className="input-group" id="searchForm">
            <input
              className="form-control"
              type="search"
              placeholder="Pesquisar dados zootécnicos"
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

      {/* CONTADOR DE BUBALINOS E OBSERVAÇÃO */}
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
              <h5>Em observação</h5>
            </div>
            <div className={styles.divRightContador}>
              <h2>10</h2>
            </div>
          </div>
        </div>
      </div>

      {/* TABELA DE BUBALINOS */}
      <div className={styles.divTabela}>
        <div className={styles.divCorpoTabela}>
          <table className="table table-striped" id="funcionariosTable">
            <thead>
              <tr>
                <th scope="col" className={styles.headerCell}>
                  Tag
                </th>
                <th scope="col" className={styles.headerCell}>
                  Nome
                </th>
                <th scope="col" className={styles.headerCell}>
                  Raça
                </th>
                <th scope="col" className={styles.headerCell}>
                  Sexo
                </th>
                <th scope="col" className={styles.headerCell}>
                  Data Nasc
                </th>
                <th scope="col" className={styles.headerCell}>
                  Peso
                </th>
                <th scope="col" className={styles.headerCell}>
                  Funções
                </th>
              </tr>
            </thead>
            <tbody>
              {bufalos.map((bufalo) => (
                <tr key={bufalo._id}>
                  <td className="text-center">{bufalo.tagBufalo}</td>
                  <td className="text-center">{bufalo.nome}</td>
                  <td className="text-center">{bufalo.raca}</td>
                  <td className="text-center">{bufalo.sexo}</td>
                  <td className="text-center">
                    {new Date(bufalo.dataNasc).toLocaleDateString("pt-BR", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })}
                  </td>
                  <td className="text-center">{bufalo.peso} Kg</td>
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

export default ZootecnicoContent;
