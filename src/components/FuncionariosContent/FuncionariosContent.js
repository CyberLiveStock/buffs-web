import axios from "axios";
import { useEffect, useState } from "react";
import styles from './FuncionariosContent.module.css';
import HeaderFuncionarios from '../HeaderFuncionarios/HeaderFuncionarios';
import ModalFuncionario from '../ModalFuncionario/ModalFuncionario'; // Importe o ModalFuncionario

const FuncionariosContent = () => {
  const [funcionarios, setFuncionarios] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false); // Estado para controlar a visibilidade do modal

  const openModal = () => setModalOpen(true); // Função para abrir o modal
  const closeModal = () => setModalOpen(false); // Função para fechar o modal

  useEffect(() => {
    const fetchFuncionarios = async () => {
      try {
        const response = await axios.get("http://localhost:4000/funcionarios");
        setFuncionarios(response.data.funcionarios); //'funcionarios' array de funcionarios
        console.log(funcionarios)
      } catch (error) {
        console.log(error);
      }
    };
    fetchFuncionarios(); // Chamando a função para executar a requisição
  }, []); // '[]' dependência do useEffect

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
              <th scope="col" className={styles.headerCell}>Cargo</th>
              <th scope="col" className={styles.headerCell}>Editar / Deletar</th>
            </tr>
          </thead>
          <tbody>
            {funcionarios.map((funcionario) => (
              <tr key={funcionario._id}>
                <td className="text-center">{funcionario.nome}</td>
                <td className="text-center">{funcionario.descCargo}</td>
                <td className="text-center">AAA</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal de Adicionar Funcionário */}
      <ModalFuncionario isOpen={isModalOpen} closeModal={closeModal}>
      
      <h2 style={{ marginLeft: "14px" }}>Cadastrar Funcionário</h2>

        <form>
          <div className={styles.divModal}>
            <div className="form-group">
              <label className={styles.label}>Nome</label>
              <input type="text" className="form-control" placeholder="Digite o nome" />
            </div>

            <div className="form-group">
              <label className={styles.label}>Salário</label>
              <input type="text" className="form-control" placeholder="Digite o salário" />
            </div>
          </div>

          <div className={styles.divModal}>
            <div className="form-group">
              <label className={styles.label}>CPF</label>
              <input type="text" className="form-control" placeholder="Digite o CPF" />
            </div>

            <div className="form-group">
              <label className={styles.label}>Data de Nascimento</label>
              <input type="text" className="form-control" placeholder="   /  /   " />
            </div>
          </div>

          
          <div className={styles.divModal}>
          <div className="form-group">
              <label className={styles.label}>Email</label>
              <input type="text" className="form-control" placeholder="Digite o Email" />
            </div>

            <div className="form-group">
              <label className={styles.label}>Telefone</label>
              <input type="text" className="form-control" placeholder="(xx) XXXXX-XXXX " />
            </div>
          </div>

          <div className={styles.divModal}>
          <div className="form-group">
              <label className={styles.label}>Gênero</label>
              <input type="text" className="form-control" placeholder="Digite o gênero" />
            </div>

            <div className="form-group">
              <label className={styles.label}>Rua</label>
              <input type="text" className="form-control" placeholder="Digite a rua" />
            </div>
          </div>

          <div className={styles.divModal}>
          <div className="form-group">
              <label className={styles.label}>Bairro</label>
              <input type="text" className="form-control" placeholder="Digite o bairro" />
            </div>

            <div className="form-group">
              <label className={styles.label}>Estado</label>
              <input type="text" className="form-control" placeholder="Digite o estado" />
            </div>
          </div>

          <div className={styles.divModal}>
          <div className="form-group">
              <label className={styles.label}>Número</label>
              <input type="text" className="form-control" placeholder="Digite o número" />
            </div>

            <div className="form-group">
              <label className={styles.label}>Cidade</label>
              <input type="text" className="form-control" placeholder="Digite a cidade" />
            </div>
          </div>

          <div className={styles.divModal}>
          <div className="form-group">
              <label className={styles.labelCustom}>Descrição do Cargo</label>
              <input type="text" className="form-control" placeholder="Digite a descrição do cargo" />
            </div>
          </div>

          <div className={styles.divModal}> 
          <button type="submit" style={{ backgroundColor: "#CE7D0A", border: "2px #CE7D0A"  }} className="btn btn-success">Cadastrar</button>

          <button type="submit" style={{ backgroundColor: "#FFCF78", border: "2px #FFCF78", color : "black"  }} className="btn btn-success">Cancelar</button>
          </div> 
        </form>
      </ModalFuncionario>
    </div>
  );
};

export default FuncionariosContent;
