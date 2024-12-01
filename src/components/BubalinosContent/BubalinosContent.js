import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./BubalinosContent.module.css";
import HeaderBubalinos from "../HeaderBubalinos/HeaderBubalinos";
import ModalBubalinos from "../ModalBubalinos/ModalBubalinos";

import "@fortawesome/fontawesome-free/css/all.min.css";

const BubalinosContent = () => {
  const [bufalos, setBufalos] = useState([]); //Coleção Bufalos
  const [selectedBufalo, setSelectedBufalo] = useState(null);

  // Estados para controlar os modais
  const [isModalOpen, setModalOpen] = useState(false);
  const [isModalZootecnicoOpen, setModalZootecnicoOpen] = useState(false);
  const [isModalSanitarioOpen, setModalSanitarioOpen] = useState(false);
  const [isModalReproducaoOpen, setModalReproducaoOpen] = useState(false);

  // Funções para controlar o modal de Bubalinos
  const openModal = (bufalo) => {
    setSelectedBufalo(bufalo);
    setModalOpen(true);
  }; // Função para abrir o modal
  const closeModal = () => {
    setSelectedBufalo(null); // Limpa o búfalo selecionado
    setModalOpen(false); // Fecha o modal
  };

  // Funções para o modal de Zootécnicos
  const openModalZootecnico = () => {
    setModalOpen(false); // Fecha o modal de Bubalinos
    setModalZootecnicoOpen(true); // Abre o modal de Zootécnicos
  };
  const closeModalZootecnico = () => setModalZootecnicoOpen(false);

  // Funções para o modal de Sanitários
  const openModalSanitario = () => {
    setModalOpen(false); // Fecha o modal de Bubalinos
    setModalSanitarioOpen(true); // Abre o modal de Sanitários
  };
  const closeModalSanitario = () => setModalSanitarioOpen(false);

  // Funções para o modal de Reprodução
  const openModalReproducao = () => {
    setModalOpen(false); // Fecha o modal de Bubalinos
    setModalReproducaoOpen(true); // Abre o modal de Reproducao
  };
  const closeModalReproducao = () => setModalReproducaoOpen(false);

  // Fetch dos dados dos bubalinos
  useEffect(() => {
    const fetchBufalos = async () => {
      try {
        const response = await axios.get("http://localhost:4000/bufalos");
        setBufalos(response.data.bufalos);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBufalos();
  }, []);

  // Barra de Pesquisa
  const [searchTerm, setSearchTerm] = useState("");
  const filteredBufalos = bufalos.filter(
    (bufalo) =>
      bufalo.tagBufalo.toString().includes(searchTerm) ||
      bufalo.nome.toLowerCase().includes(searchTerm.toLowerCase()) // Pesquisa por nome
  );

  // Calcular qunatidade de Bufalos
  const quantidadeBufalos = bufalos.length;
  return (
    <div className={styles.content}>
      <HeaderBubalinos openModal={openModal} />{" "}
      {/* Passa a função openModal para o HeaderBubalinos */}
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
      </div>
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
              {filteredBufalos.map((bufalo) => (
                <tr key={bufalo._id}>
                  <td className="text-center">{bufalo.nome}</td>
                  <td className="text-center">{bufalo.tagBufalo}</td>
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
        <h2 style={{ textAlign: "center" }}>Dados Gerais</h2>
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

                <div className="form-group">
                  <label className={styles.label}>Nome</label>
                  <input
                    type="text"
                    className="form-control"
                    value={selectedBufalo?.nome || ""}
                    readOnly
                  />
                </div>

                <div className="form-group">
                  <label className={styles.label}>Criadouro</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Baia 2"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className={styles.divModal}>
            <div className="form-group">
              <label className={styles.label}>Idade</label>
              <input
                type="text"
                className="form-control"
                value={selectedBufalo?.idade || ""}
                readOnly
              />
            </div>

            <div className="form-group">
              <label className={styles.label}>Data de Nascimento</label>
              <input
                type="text"
                className="form-control"
                value={
                  selectedBufalo
                    ? new Date(selectedBufalo.dataNasc).toLocaleDateString(
                      "pt-BR",
                      {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      }
                    )
                    : ""
                }
                readOnly
              />
            </div>
          </div>

          <div className={styles.divModal2}>
            <div className="form-group">
              <label className={styles.label}>Raça</label>
              <input
                type="text"
                className="form-control"
                value={selectedBufalo?.raca || ""}
                readOnly
              />
            </div>

            <div className="form-group">
              <label className={styles.label}>Sexo</label>
              <input
                type="text"
                className="form-control"
                value={selectedBufalo?.sexo || ""}
                readOnly
              />
            </div>
          </div>

          <div className={styles.divButton}>
            <button
              type="submit"
              style={{
                backgroundColor: "#FFCF78",
                border: "2px #FFCF78",
                color: "black",
              }}
              className="btn btn-success"
              onClick={openModalZootecnico}
            >
              Zootécnico
            </button>
            <button
              type="submit"
              style={{
                backgroundColor: "#FFCF78",
                border: "2px #FFCF78",
                color: "black",
              }}
              className="btn btn-success"
              onClick={openModalReproducao}
            >
              Reprodução
            </button>
            <button
              type="submit"
              style={{
                backgroundColor: "#FFCF78",
                border: "2px #FFCF78",
                color: "black",
              }}
              className="btn btn-success"
              onClick={openModalSanitario}
            >
              Sanitário
            </button>
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
      {/* Modal de Zootécnicos */}
      <ModalBubalinos
        isOpen={isModalZootecnicoOpen}
        closeModal={closeModalZootecnico}
      >
        <h2 style={{ textAlign: "center" }}>Dados Zootécnicos</h2>
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

                <div className="form-group">
                  <label className={styles.label}>Comprimento Corporal</label>
                  <input
                    type="text"
                    className="form-control"
                    value={
                      selectedBufalo?.zootecnico?.[0]?.comprimentoCorporal || ""
                    }
                    readOnly
                  />
                </div>

                <div className="form-group">
                  <label className={styles.label}>Altura Cernelha</label>
                  <input
                    type="text"
                    className="form-control"
                    value={
                      selectedBufalo?.zootecnico?.[0]?.alturaCernelha || ""
                    }
                    readOnly
                  />
                </div>
              </div>
            </div>
          </div>

          <div className={styles.divModal}>
            <div className="form-group">
              <label className={styles.label}>Circuferencia Corporal</label>
              <input
                type="text"
                className="form-control"
                value={
                  selectedBufalo?.zootecnico?.[0]?.circuferenciaCorporal || ""
                }
                readOnly
              />
            </div>

            <div className="form-group">
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
              type="button"
              className="btn btn-danger"
              onClick={closeModalZootecnico}
              style={{
                backgroundColor: "#FFCF78",
                color: "black",
                border: "2px #FFCF78",
              }}
            >
              Fechar
            </button>
          </div>
        </form>
      </ModalBubalinos>
      {/* Modal de Sanitários */}
      <ModalBubalinos
        isOpen={isModalSanitarioOpen}
        closeModal={closeModalSanitario}
      >
        <h2 style={{ textAlign: "center" }}>Dados Sanitários</h2>
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

                <div className="form-group">
                  <label className={styles.label}>Tipo Sanitario</label>
                  <input
                    type="text"
                    className="form-control"
                    value={selectedBufalo?.sanitario?.[0]?.tipoSanitario || ""}
                    readOnly
                  />
                </div>

                <div className="form-group">
                  <label className={styles.label}>Tratamentos</label>
                  <input
                    type="text"
                    className="form-control"
                    value={selectedBufalo?.sanitario?.[0]?.nomeTratamento || ""}
                    readOnly
                  />
                </div>
              </div>
            </div>
          </div>

          <div className={styles.divModal}>
            <div className="form-group">
              <label className={styles.label}>Medicamentos</label>
              <input
                type="text"
                className="form-control"
                value={selectedBufalo?.sanitario?.[0]?.loteMedicamento || ""}
                readOnly
              />
            </div>

            <div className="form-group">
              <label className={styles.label}>Data de aplicação</label>
              <input
                type="text"
                className="form-control"
                value={
                  selectedBufalo
                    ? new Date(
                      selectedBufalo?.sanitario?.[0]?.dataAplicacao
                    ).toLocaleDateString("pt-BR", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })
                    : ""
                }
                readOnly
              />
            </div>
          </div>

          <div className={styles.divModal2}>
            <div className="form-group">
              <label className={styles.label}>Data Retorno</label>
              <input
                type="text"
                className="form-control"
                value={
                  selectedBufalo
                    ? new Date(
                      selectedBufalo?.sanitario?.[0]?.dataRetorno
                    ).toLocaleDateString("pt-BR", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })
                    : ""
                }
                readOnly
              />
            </div>

            <div className="form-group">
              <label className={styles.label}>Funcionario Responsavel</label>
              <input
                type="text"
                className="form-control"
                value={selectedBufalo?.sanitario?.[0]?.tipoSanitario || ""}
                readOnly
              />
            </div>
          </div>

          <div className={styles.divButton}>
            <button
              type="button"
              className="btn btn-danger"
              onClick={closeModalSanitario}
              style={{
                backgroundColor: "#FFCF78",
                color: "black",
                border: "2px #FFCF78",
              }}
            >
              Fechar
            </button>
          </div>
        </form>
      </ModalBubalinos>
      {/* Modal de Sanitários */}
      <ModalBubalinos
        isOpen={isModalReproducaoOpen}
        closeModal={closeModalReproducao}
      >
        <h2 style={{ textAlign: "center" }}>Dados de Reprodução</h2>
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
                    placeholder="#0001"
                  />
                </div>

                <div className="form-group">
                  <label className={styles.label}>Nome</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Bella"
                  />
                </div>

                <div className="form-group">
                  <label className={styles.label}>Criadouro</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Baia 2"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className={styles.divModal}>
            <div className="form-group">
              <label className={styles.label}>Idade</label>
              <input
                type="text"
                className="form-control"
                placeholder="1 ano e 4 meses"
              />
            </div>

            <div className="form-group">
              <label className={styles.label}>Data de Nascimento</label>
              <input
                type="text"
                className="form-control"
                placeholder="01/07/2022"
              />
            </div>
          </div>

          <div className={styles.divModal2}>
            <div className="form-group">
              <label className={styles.label}>Raça</label>
              <input
                type="text"
                className="form-control"
                placeholder="Murrah"
              />
            </div>

            <div className="form-group">
              <label className={styles.label}>Sexo</label>
              <input type="text" className="form-control" placeholder="Fêmea" />
            </div>
          </div>

          <div className={styles.divButton}>
            <button
              type="button"
              className="btn btn-danger"
              onClick={closeModalReproducao}
              style={{
                backgroundColor: "#FFCF78",
                color: "black",
                border: "2px #FFCF78",
              }}
            >
              Fechar
            </button>
          </div>
        </form>
      </ModalBubalinos>
    </div>
  );
};

export default BubalinosContent;
