import axios from "axios";
import { useEffect, useState } from "react";
import { jsPDF } from "jspdf"; // Biblioteca para criar PDFs
import "jspdf-autotable"; // Plugin para tabelas no PDF
import styles from "./SanitariosContent.module.css";
import HeaderSanitarios from "../HeaderSanitarios/HeaderSanitarios";
import "@fortawesome/fontawesome-free/css/all.min.css";
import ModalBubalinos from "../ModalBubalinos/ModalBubalinos";
import DenTable from "../DenTableSanitario/DenTableSanitario.js"

const SanitariosContent = () => {
  const [bufalos, setBufalos] = useState([]);
  const [quantidadeTratamentosAtivos, setQuantidadeTratamentosAtivos] = useState(0);
  const [quantidadeSaudaveis, setQuantidadeSaudaveis] = useState(0);
  const [quantidadeBufalos, setQuantidadeBufalos] = useState(0);
  const [selectedBufalo, setSelectedBufalo] = useState(null);

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

  useEffect(() => {
    const dataAtual = new Date();
    const bufalosEmTratamento = bufalos.filter((bufalo) =>
      bufalo.sanitario.some(
        (tratamento) =>
          new Date(tratamento.dataAplicacao) <= dataAtual &&
          dataAtual <= new Date(tratamento.dataRetorno)
      )
    );
    setQuantidadeTratamentosAtivos(bufalosEmTratamento.length);
    setQuantidadeBufalos(bufalos.length);
    setQuantidadeSaudaveis(quantidadeBufalos - quantidadeTratamentosAtivos);
  }, [bufalos, quantidadeBufalos]);


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

  // Função para exportar os dados em PDF
  const exportarPDF = () => {
    if (bufalos.length === 0) {
      alert("Não há dados para exportar.");
      return;
    }

    const doc = new jsPDF();

    // Adiciona título ao PDF
    doc.setFontSize(18);
    doc.text("Relatório de Dados Sanitários", 10, 10);

    // Cabeçalhos da tabela
    const headers = [
      ["Tag", "Nome Tratamento", "Descrição", "Data Aplicação", "Data Retorno"],
    ];

    // Dados da tabela
    const rows = filteredBufalos.map((bufalo) => {
      const sanitario = bufalo.sanitario?.[0] || {}; // Seleciona o primeiro tratamento ou vazio
      return [
        bufalo.tagBufalo || "N/A",
        sanitario.nomeTratamento || "N/A",
        sanitario.tipoSanitario || "N/A",
        sanitario.dataAplicacao
          ? new Date(sanitario.dataAplicacao).toLocaleDateString("pt-BR")
          : "N/A",
        sanitario.dataRetorno
          ? new Date(sanitario.dataRetorno).toLocaleDateString("pt-BR")
          : "N/A",
      ];
    });

    // Gera a tabela no PDF
    doc.autoTable({
      head: headers,
      body: rows,
      startY: 20,
    });

    // Salva o PDF
    doc.save("relatorio_dados_sanitarios.pdf");
  };

  // Barra de Pesquisa
  const [searchTerm, setSearchTerm] = useState("");
  const filteredBufalos = bufalos.filter(
    (bufalo) =>
      bufalo.tagBufalo.toString().includes(searchTerm) ||
      bufalo.nome.toLowerCase().includes(searchTerm.toLowerCase()) // Pesquisa por nome
  );

  return (
    <div className={styles.content}>
      <HeaderSanitarios onExportarDados={exportarPDF} />
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

      {/* Contadores */}
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
            <h5>Total de Búfalos</h5>
            <h2>{quantidadeBufalos}</h2>
          </div>
        </div>
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
            <h5>Em Tratamento</h5>
            <h2>{quantidadeTratamentosAtivos}</h2>
          </div>
        </div>
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
            <h5>Saudáveis</h5>
            <h2>{quantidadeSaudaveis}</h2>
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
                <th scope="col" className={styles.headerCell}>Nome Tratamento</th>
                <th scope="col" className={styles.headerCell}>Descrição</th>
                <th scope="col" className={styles.headerCell}>Data</th>
                <th scope="col" className={styles.headerCell}>Visualizar</th>
              </tr>
            </thead>
            <tbody>
              {filteredBufalos.map((bufalo) => (
                <tr key={bufalo._id}>
                  <td className="text-center">{bufalo.tagBufalo || "N/A"}</td>
                  <td className="text-center">{bufalo.sanitario?.[0]?.nomeTratamento || "N/A"}</td>
                  <td className="text-center">{bufalo.sanitario?.[0]?.tipoSanitario || "N/A"}</td>
                  <td className="text-center">
                    {new Date(
                      bufalo.sanitario?.[0]?.dataAplicacao || "N/A"
                    ).toLocaleDateString("pt-BR", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })}
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
      {/* Modal de Bubalinos */}
      <ModalBubalinos isOpen={isModalOpen} closeModal={closeModal}>
        <h2 style={{ textAlign: "center" }}>Dados Sanitarios</h2>
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

                <div className="form-group" style={{ position: "relative" }}>
                  <label className={styles.label}>Tipo Sanitario</label>
                  <input
                    type="text"
                    className="form-control"
                    value={selectedBufalo?.sanitario?.[0]?.tipoSanitario || ""}
                    readOnly
                  />
                  {/* 'infoTag' = informa a tag do bufalo selecionado, 'infoEspec' = Qual campo quero consultar */}
                  <DenTable infoTag={selectedBufalo?.tagBufalo} infoEspec={"tipoSanitario"} />
                </div>

                <div className="form-group" style={{ position: "relative" }}>
                  <label className={styles.label}>Tratamento</label>
                  <input
                    type="text"
                    className="form-control"
                    value={selectedBufalo?.sanitario?.[0]?.nomeTratamento || ""}
                    readOnly
                  />
                  {/* 'infoTag' = informa a tag do bufalo selecionado, 'infoEspec' = Qual campo quero consultar */}
                  <DenTable infoTag={selectedBufalo?.tagBufalo} infoEspec={"nomeTratamento"} />
                </div>
              </div>
            </div>
          </div>

          <div className={styles.divModal} style={{ position: "relative" }}>
            <div className="form-group">
              <label className={styles.label}>Medicamento</label>
              <input
                type="text"
                className="form-control"
                value={selectedBufalo?.sanitario?.[0]?.loteMedicamento || ""}
                readOnly
              />
              {/* 'infoTag' = informa a tag do bufalo selecionado, 'infoEspec' = Qual campo quero consultar */}
              <DenTable infoTag={selectedBufalo?.tagBufalo} infoEspec={"loteMedicamento"} />
            </div>

            <div className="form-group" >
              <label className={styles.label}>Data Aplicação</label>
              <input
                type="text"
                className="form-control"
                value={
                  selectedBufalo
                    ? new Date(selectedBufalo?.sanitario?.[0]?.dataAplicacao).toLocaleDateString(
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
              <label className={styles.label}>Data Retorno</label>
              <input
                type="text"
                className="form-control"
                value={
                  selectedBufalo
                    ? new Date(selectedBufalo?.sanitario?.[0]?.dataRetorno).toLocaleDateString(
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

            <div className="form-group">
              <label className={styles.label}>Funcionario Responsavel</label>
              <input
                type="text"
                className="form-control"
                value={selectedBufalo?.peso || ""}
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

export default SanitariosContent;
