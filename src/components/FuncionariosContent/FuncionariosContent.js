import React, { useState } from 'react';
import styles from './FuncionariosContent.module.css';
import HeaderFuncionarios from '../HeaderFuncionarios/HeaderFuncionarios'; // Importe o Header
import ModalFuncionario from '../ModalFuncionario/ModalFuncionario'; // Importe o ModalFuncionario

const FuncionariosContent = () => {
  const [isModalOpen, setModalOpen] = useState(false); // Estado para controlar a visibilidade do modal

  const openModal = () => setModalOpen(true); // Função para abrir o modal
  const closeModal = () => setModalOpen(false); // Função para fechar o modal

  return (
    <div className={styles.content}>
      <HeaderFuncionarios openModal={openModal} /> {/* Passa a função openModal para o HeaderFuncionarios */}

      {/* BARRA DE PESQUISA */}
      <div className={`row mt-3 ${styles.barraPesquisa}`}>
        <div className='col'>
          <form className='d-flex' id='searchForm'>
            <input
              className='form-control mr-2'
              type="search"
              placeholder="Pesquisar funcionário"
              aria-label="Pesquisar"
              id="searchInput"
            />
            <button
              className={`btn btn-secondary ml-2 ${styles.buttonPesquisar}`}
              type="button" // Mudei de "submit" para "button"
              onClick={openModal} // Função para abrir o modal
            >
              Pesquisar
            </button>
          </form>
        </div>
      </div>

      {/* TABELA DE FUNCIONÁRIOS */}
      <div className={styles.divInfosFunc}>
        <table className="table table-striped" id="funcionariosTable">
          <thead>
            <tr>
              <th scope="col" className={styles.headerCell}>Nome</th>
              <th scope="col" className={styles.headerCell}>CPF</th>
              <th scope="col" className={styles.headerCell}>Cargo</th>
              <th scope="col" className={styles.headerCell}></th>
              <th scope="col" className={styles.headerCell}></th>
              <th scope="col" className={styles.headerCell}></th>
              <th scope="col" className={styles.headerCell}>Editar / Deletar</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="7" className="text-center">Patrão vai mexer futuramente</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Modal de Adicionar Funcionário */}
      <ModalFuncionario isOpen={isModalOpen} closeModal={closeModal}>
        <h2>Adicionar Novo Funcionário</h2>
        <form>
          <div className="form-group">
            <label>Nome</label>
            <input type="text" className="form-control" placeholder="Digite o nome" />
          </div>
          <div className="form-group">
            <label>CPF</label>
            <input type="text" className="form-control" placeholder="Digite o CPF" />
          </div>
          <div className="form-group">
            <label>Cargo</label>
            <input type="text" className="form-control" placeholder="Digite o cargo" />
          </div>
          <button type="submit" className="btn btn-success">Salvar</button>
        </form>
      </ModalFuncionario>
    </div>
  );
};

export default FuncionariosContent;
