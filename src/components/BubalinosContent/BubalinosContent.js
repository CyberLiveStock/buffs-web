import axios from "axios";
import { useEffect, useRef, useState } from "react";
import styles from "./BubalinosContent.module.css";
import HeaderBubalinos from "../HeaderBubalinos/HeaderBubalinos";
import ModalBubalinos from "../ModalBubalinos/ModalBubalinos";

const BubalinosContent = () => {
  const [bufalos, setBufalos] = useState([]);

  const [isModalOpen, setModalOpen] = useState(false); // Estado para controlar a visibilidade do modal

  const openModal = () => setModalOpen(true); // Função para abrir o modal
  const closeModal = () => setModalOpen(false); // Função para fechar o modal

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

  return (
    <div className={styles.content}>
      <HeaderBubalinos openModal={openModal} />{" "}
      {/* Passa a função openModal para o HeaderBubalinos */}
      <div className={styles.divTabela}>
        {/* TABELA DE BUBALINOS */}
        <div className={styles.divCorpoTabela}>
          <table className="table table-striped" id="funcionariosTable">
            <thead>
              <tr>
                <th scope="col" className={styles.headerCell}>
                  Nome
                </th>
                <th scope="col" className={styles.headerCell}>
                  Tag
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
                  <td className="text-center">{bufalo.peso}</td>
                  <td className="text-center">
                    <img
                      src="/images/prontuario.svg"
                      alt="Prontuários"
                      style={{ width: "24px", height: "24px" }}
                      onClick={openModal}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ModalBubalinos isOpen={isModalOpen} closeModal={closeModal}>
        <h2 style={{ textAlign: "center" }}>Dados Gerais</h2>
        <form>
          <div className={styles.divContent}>
            <div className={styles.divLeftContent}>
              <div className={styles.leftContent}>{/*  BACKGROUND IMAGE*/}</div>
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
              type="submit"
              style={{
                backgroundColor: "#FFCF78",
                border: "2px #FFCF78",
                color: "black",
              }}
              className="btn btn-success"
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
            >
              Sanitário
            </button>
          </div>

          <div className={styles.divButton}>
            <button
              type="submit"
              style={{ backgroundColor: "#CE7D0A", border: "2px #CE7D0A" }}
              className="btn btn-success"
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
