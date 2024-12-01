import axios from "axios";
import { useEffect, useRef, useState } from "react";
import styles from "./ZootecnicoContent.module.css";
import HeaderZootecnico from "../HeaderZootecnico/HeaderZootecnico";
import "@fortawesome/fontawesome-free/css/all.min.css";
import ModalBubalinos from "../ModalBubalinos/ModalBubalinos";
import DesenGraf from "../DesenGraf/DesenGraf.js";

const ZootecnicoContent = () => {
  const [bufalos, setBufalos] = useState([]);
  const [selectedBufalo, setSelectedBufalo] = useState(null);

  // Estados para controlar os modais
  const [isModalOpen, setModalOpen] = useState(false);
  // Funções para controlar o modal de Bubalinos
  const openModal = (bufalo) => {
    setSelectedBufalo(bufalo);
    setModalOpen(true);
  }; // Função para abrir o modal
  const closeModal = () => {
    setSelectedBufalo(null); // Limpa o búfalo selecionado
    setModalOpen(false); // Fecha o modal
  };

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

    // Barra de Pesquisa
    const [searchTerm, setSearchTerm] = useState("");
    const filteredBufalos = bufalos.filter(
      (bufalo) =>
        bufalo.tagBufalo.toString().includes(searchTerm) ||
        bufalo.nome.toLowerCase().includes(searchTerm.toLowerCase()) // Pesquisa por nome
    );

  return (
    <div className={styles.content}>
      <HeaderZootecnico />
      <div className={`row mt-3 ${styles.barraPesquisa}`}>
        <div className="col">
          <form className="input-group" id="searchForm">
            <input
              className="form-control"
              type="search"
              placeholder="Pesquisar bubalino"
              aria-label="Pesquisar"
              id="searchInput"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col" className={styles.headerCell}>Tag</th>
                <th scope="col" className={styles.headerCell}>Nome</th>
                <th scope="col" className={styles.headerCell}>Raça</th>
                <th scope="col" className={styles.headerCell}>Sexo</th>
                <th scope="col" className={styles.headerCell}>Data Nasc</th>
                <th scope="col" className={styles.headerCell}>Peso</th>
                <th scope="col" className={styles.headerCell}>Funções</th>
              </tr>
            </thead>
            <tbody>
              {filteredBufalos.map((bufalo) => (
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
      {/* Modal de Bubalinos */}
      <ModalBubalinos isOpen={isModalOpen} closeModal={closeModal}>
        <h2 style={{ textAlign: "center" }}>Dados Zootecnico</h2>
        <form>
          <div className={styles.divContent}>
            <div className={styles.divLeftContent}>
              <div className={styles.leftContent} /> {/*  BACKGROUND IMAGE */}
            </div>

            <div className={styles.divRightContent}>
              <div className={styles.rightContent}>
                <div className="form-group">
                  <label className={styles.label}>TAG</label>
                  <input
                    type="text"
                    className="form-control"
                    value={selectedBufalo?.tagBufalo || ""}
                    readOnly
                  />
                </div>

                <div className="form-group" style={{position:"relative"}}>
                  <label className={styles.label}>Comprimento Corporal</label>
                  <input
                    type="text"
                    className="form-control"
                    value={selectedBufalo?.zootecnico?.[0]?.comprimentoCorporal || ""}
                    readOnly
                  />
                  <DesenGraf/>
                </div>

                <div className="form-group" style={{position:"relative"}}>
                  <label className={styles.label}>Altura Cernelha</label>
                  <input
                    type="text"
                    className="form-control"
                    value={selectedBufalo?.zootecnico?.[0]?.alturaCernelha || ""}
                    readOnly
                  />
                  <DesenGraf/>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.divModal} >
            <div className="form-group" style={{position:"relative"}}>
              <label className={styles.label}>Circunferencia Corporal</label>
              <input
                type="text"
                className="form-control"
                value={selectedBufalo?.zootecnico?.[0]?.circuferenciaCorporal || ""}
                readOnly
              />
              <DesenGraf/>
            </div>

            <div className="form-group" >
              <label className={styles.label}>Suplementação</label>
              <input
                type="text"
                className="form-control"
                value={selectedBufalo?.zootecnico?.[0]?.suplementacao || ""}
                readOnly
              />
            </div>
          </div>

          <div className={styles.divModal2}>
            <div className="form-group">
              <label className={styles.label}>Tipo Ração</label>
              <input
                type="text"
                className="form-control"
                value={selectedBufalo?.zootecnico?.[0]?.tipoRacao || ""}
                readOnly
              />
            </div>

            <div className="form-group" style={{position:"relative"}}>
              <label className={styles.label}>Peso</label>
              <input
                type="text"
                className="form-control"
                value={selectedBufalo?.peso || ""}
                readOnly
              />
              <DesenGraf/>
            </div>
          </div>
          
          <div className={styles.divModal2}>
            <div className="form-group">
              <label className={styles.label}>Pastagem</label>
              <input
                type="text"
                className="form-control"
                value={selectedBufalo?.zootecnico?.[0]?.tipoPastagem || ""}
                readOnly
              />
            </div>
          </div>
          <div className={styles.divButton}>
            <button
              type="submit"
              style={{ backgroundColor: "#CE7D0A", border: "2px #CE7D0A" }}
              className="btn btn-success"
              onClick={closeModal}
            >
              Fechar
            </button>
          </div>
        </form>
      </ModalBubalinos>
    </div>
  );
};

export default ZootecnicoContent;
