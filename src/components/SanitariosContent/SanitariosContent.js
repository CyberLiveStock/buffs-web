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
    
    // Verifica se o termo de pesquisa está vazio
    const filteredBufalosForPDF = searchTerm.trim() !== ""
      ? filteredBufalos // Se o searchTerm não está vazio, usa o filteredBufalos
      : []; // Se o searchTerm está vazio, passa um array vazio

    // Se filteredBufalosForPDF estiver vazio, não gera o PDF
    if (filteredBufalosForPDF.length === 0) {
      alert("Pesquise a Tag de um Bufalo, o qual deseja exportar seu dado.");
      return;
    }

    const doc = new jsPDF();

    // Para Formatação de Data
    const formatDate = (dateString) => {
      if (!dateString) return "Data não disponível"; // Caso a data seja nula ou indefinida
      const date = new Date(dateString); // Converte a string em um objeto Date
      return date.toLocaleDateString("pt-BR", { // Formata para o padrão brasileiro
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    };

    //Imagem Fundo
    const imgFundo = '/images/bubalinos.png';  // Caminho para a imagem PNG
    // Arrumar Escala da imagem
    const Fundoscale = 0.1;
    const Fundowidth = 761 * Fundoscale;
    const Fundoheight = 790 * Fundoscale;
    doc.addImage(imgFundo, 'PNG', 70, 110, Fundowidth, Fundoheight);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(26);
    doc.setTextColor(0, 0, 0);        // Cor do texto (Preto)
    doc.setFillColor(255, 207, 120);  // Cor de fundo (amarelo)
    doc.rect(10, 20, 190.5, 20, 'F'); // Retângulo de fundo (Y, X, Largura, Altura)
    doc.text('Relatório Sanitário', 105, 35, null, null, 'center');
    doc.setDrawColor(143, 143, 143); // Define a cor da linha como cinza
    doc.rect(9.5, 10, 191, 270);     // Margen da Folha

    // Imagem Logo
    const imgLogo = '/images/logo.png';  
    // Arrumar Escala da imagem
    const Logoscale = 0.06;
    const Logowidth = 511 * Logoscale;
    const Logoheight = 192 * Logoscale;
    doc.addImage(imgLogo, 'PNG', 165, 25, Logowidth, Logoheight);


    //Inicio: Sessão 01
    doc.setFont("helvetica", "italic");
    doc.setFontSize(14);
    let yPositionn = 50; // Posição inicial no eixo Y

    filteredBufalos.map((bufalo) => {
      doc.text(
        `${bufalo.nome} | TAG: ${bufalo.tagBufalo}`,
        80,  // Posição X
        yPositionn // Posição Y
      );
      yPositionn += 10; // Ajuste a posição Y para a próxima linha
    });
    //Fim: Sessão 01

    //Inicio: Sessão 02 - Infos Atuais
    doc.setFont("helvetica", "bolditalic");
    doc.setFontSize(16);                    //Texto
    doc.text('Infos Atuais', 15, 70);       //Texto
    doc.setDrawColor(0, 0, 0);              //Texto
    doc.rect(50, 69, 140, 0.2, 'F');        //Linha

    // Adicionando informações do búfalo
    doc.setFont("helvetica", "regular");
    doc.setFontSize(12);
    let yPosition = 80; // Posição inicial no eixo Y

    filteredBufalos.map((bufalo) => {
      const idadeTexto = bufalo.idade === 1 ? 'ano' : 'anos';
      doc.text(`Idade: ${bufalo.idade} ${idadeTexto}`, 15, yPosition);
      yPosition += 10; // Ajusta a posição Y para a próxima linha

      doc.text(`Peso: ${bufalo.zootecnico?.[0]?.peso}  kg`, 15, yPosition);
      yPosition += 10; // Ajusta a posição Y para a próxima linha

      doc.text(`Raça: ${bufalo.raca}`, 15, yPosition);
      yPosition += 10; // Ajusta a posição Y para a próxima linha

      doc.text(`Sexo: ${bufalo.sexo}`, 15, yPosition);
      yPosition += 15; // Ajusta a posição Y para a próxima linha (um pouco mais espaçada)

    });
    //Fim: Sessão 02 - Infos Atuais

    //Inicio: Sessão 03 - Sanitario Atual
    doc.setFont("helvetica", "bolditalic");
    doc.setFontSize(16);                     //Texto
    doc.text('Atual Dados Sanitario', 15, 130); //Texto
    doc.setDrawColor(0, 0, 0);               //Texto
    doc.rect(75, 130, 117, 0.2, 'F');           //Linha

    // Adicionando informações do búfalo
    doc.setFont("helvetica", "regular");
    doc.setFontSize(12);
    let Positiony = 140; // Posição inicial no eixo Y

    filteredBufalos.map((bufalo) => {

      doc.text(`Tipo Sanitario: ${bufalo?.sanitario?.[0]?.tipoSanitario}`, 15, Positiony);
      Positiony += 10; // Ajusta a posição Y para a próxima linha

      doc.text(`Nome Tratamento: ${bufalo?.sanitario?.[0]?.nomeTratamento}`, 15, Positiony);
      Positiony += 10; // Ajusta a posição Y para a próxima linha

      doc.text(`Medicamento: ${bufalo?.sanitario?.[0]?.loteMedicamento}`, 15, Positiony);
      Positiony += 10; // Ajusta a posição Y para a próxima linha

      doc.text(`Data Aplicação: ${formatDate(bufalo?.sanitario?.[0]?.dataAplicacao)}`, 15, Positiony);
      Positiony += 10; // Ajusta a posição Y para a próxima linha (um pouco mais espaçada)

      doc.text(`Data Retorno: ${formatDate(bufalo?.sanitario?.[0]?.dataRetorno)}`, 15, Positiony);
      Positiony += 15; // Ajusta a posição Y para a próxima linha (um pouco mais espaçada)
    });
    //Fim: Sessão 03 - Sanitario Atuais

    //Inicio: Sessão 04 - Sanitario Historico
    doc.setFont("helvetica", "bolditalic");
    doc.setFontSize(16);                     //Texto
    doc.text('Historico Dados Sanitario', 15, 200); //Texto
    doc.setDrawColor(0, 0, 0);               //Texto
    doc.rect(85, 200, 109, 0.2, 'F');           //Linha

    // Adicionando informações do búfalo
    doc.setFont("helvetica", "regular");
    doc.setFontSize(12);
    let PositionY = 210; // Posição inicial no eixo Y

    filteredBufalos.map((bufalo) => {
      PositionY += 10; // Espaçamento após o título

      // Verifica se há dados no histórico sanitário
      if (bufalo.historicoSanitario && bufalo.historicoSanitario.length > 0) {
        bufalo.historicoSanitario.forEach((sanitario, index) => {
          // Adiciona um título para cada registro do histórico sanitário
          doc.text(`Histórico Sanitário ${index + 1}`, 15, PositionY);
          PositionY += 10;

          // Adiciona os detalhes do histórico sanitário
          doc.text(`Tipo Sanitário: ${sanitario.tipoSanitario || "Não informado"}`, 15, PositionY);
          PositionY += 10;

          doc.text(`Nome Tratamento: ${sanitario.nomeTratamento || "Não informado"}`, 15, PositionY);
          PositionY += 10;

          doc.text(`Medicamento: ${sanitario.loteMedicamento || "Não informado"}`, 15, PositionY);
          PositionY += 10;

          doc.text(`Data Aplicação: ${formatDate(sanitario.dataAplicacao)}`, 15, PositionY);
          PositionY += 10;

          doc.text(`Data Retorno: ${formatDate(sanitario.dataRetorno)}`, 15, PositionY);
          PositionY += 15;

          // Verifica se a posição Y ultrapassou o limite da página
          if (PositionY > 280) { // Ajuste baseado no tamanho da página (A4 geralmente tem limite de ~280 para conteúdo)
            doc.addPage(); // Adiciona uma nova página
            doc.setDrawColor(143, 143, 143); // Define a cor da linha como vermelho
            doc.rect(9.5, 10, 191, 270);    // Margen
            doc.addImage(imgFundo, 'PNG', 70, 110, Fundowidth, Fundoheight); // Marca da agua
            PositionY = 15; // Reseta a posição Y para o início da nova página
          }
        });
      } else {
        doc.text("Sem dados de histórico sanitário disponíveis.", 15, PositionY);
        PositionY += 15;
      }
    });
    //Fim: Sessão 04 - Sanitario Historico

    // Salva o PDF
    doc.save("relatorio_dados_sanitarios.pdf");
  };
  //Fim da Função para exportar os dados em PDF

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
