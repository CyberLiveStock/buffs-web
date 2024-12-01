import axios from "axios";
import { useEffect, useState } from "react";
import { jsPDF } from "jspdf"; // Biblioteca para criar PDFs
import "jspdf-autotable"; // Plugin para tabelas no PDF
import styles from "./SanitariosContent.module.css";
import HeaderSanitarios from "../HeaderSanitarios/HeaderSanitarios";
import "@fortawesome/fontawesome-free/css/all.min.css";

const SanitariosContent = () => {
  const [bufalos, setBufalos] = useState([]);
  const [quantidadeTratamentosAtivos, setQuantidadeTratamentosAtivos] =
    useState(0);
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
    const rows = bufalos.map((bufalo) => {
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

  return (
    <div className={styles.content}>
      <HeaderSanitarios onExportarDados={exportarPDF} />

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

      <div className={styles.divTabela}>
        <div className={styles.divCorpoTabela}>
          <table className="table table-striped" id="funcionariosTable">
            <thead>
              <tr>
                <th>Tag</th>
                <th>Nome Tratamento</th>
                <th>Descrição</th>
                <th>Data</th>
                <th>Visualizar</th>
              </tr>
            </thead>
            <tbody>
              {bufalos.map((bufalo) => (
                <tr key={bufalo._id}>
                  <td>{bufalo.tagBufalo || "N/A"}</td>
                  <td>{bufalo.sanitario?.[0]?.nomeTratamento || "N/A"}</td>
                  <td>{bufalo.sanitario?.[0]?.tipoSanitario || "N/A"}</td>
                  <td>
                    {new Date(
                      bufalo.sanitario?.[0]?.dataAplicacao || "N/A"
                    ).toLocaleDateString("pt-BR", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })}
                  </td>
                  <td>
                    <img
                      src="/images/prontuario.svg"
                      alt="Prontuários"
                      className={styles.iconFunction}
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
