import axios from "axios";
import { useEffect, useState } from "react";
import styles from './FuncionariosContent.module.css';
import HeaderFuncionarios from '../HeaderFuncionarios/HeaderFuncionarios';
import ModalFuncionario from '../ModalFuncionario/ModalFuncionario'; // Importe o ModalFuncionario
import '@fortawesome/fontawesome-free/css/all.min.css';

const FuncionariosContent = () => {
  const [funcionarios, setFuncionarios] = useState([]); // Coleção Funcionarios

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

  // Modal
  const [isModalOpen, setModalOpen] = useState(false); // Estado para controlar a visibilidade do modal
  const openModal = () => setModalOpen(true); // Função para abrir o modal
  const closeModal = () => setModalOpen(false); // Função para fechar o modal

  // Para Cadastrar um Novo Funcionario:
  const [nome, setNome] = useState("")
  const [salario, setSalario] = useState("")
  const [dataNasc, setDataNasc] = useState("")
  const [email, setEmail] = useState("")
  const [telefone, setTelefone] = useState("")
  const [genero, setGenero] = useState("")
  const [rua, setRua] = useState("")
  const [bairro, setBairro] = useState("")
  const [estado, setEstado] = useState("")
  const [numero, setNumero] = useState("")
  const [cidade, setCidade] = useState("")
  const [descCargo, setDescCargo] = useState("")
  const [status] = useState("Ativo")

  const handleSubmit = async (event) => {
    if (nome && salario && dataNasc && email && telefone && genero && rua && bairro && estado && numero && cidade && descCargo && status !== "") {
      const funcionario = {
        nome, salario, dataNasc, email, telefone, genero, rua, bairro, estado, numero, cidade, descCargo, status
      };
      try {
        const response = await axios.post("http://localhost:4000/funcionario", funcionario)
        if (response.status === 201) {
          router.push("/")
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Por favor, preencha todos os campos.")
    }
  }

  // Barra de Pesquisa
  const [searchTerm, setSearchTerm] = useState(''); // Parametro de pesquisa
  const filteredFuncionarios = funcionarios.filter((funcionario) =>
    funcionario.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.content}>
      <HeaderFuncionarios openModal={openModal} /> {/* Passa a função openModal para o HeaderFuncionarios */}
      {/* Barra de Pesquisa */}
      <div className={`row mt-3 ${styles.barraPesquisa}`}>
        <div className="col">
          <form className="input-group" id="searchForm">
            <input
              className="form-control"
              type="search"
              placeholder="Pesquisar funcionário"
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
            {filteredFuncionarios.map((funcionario) => (
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

        <form onSubmit={handleSubmit}>
          <div className={styles.divModal}>
            <div className="form-group">
              <label className={styles.label}>Nome</label>
              <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} className="form-control" placeholder="Digite o nome" />
            </div>

            <div className="form-group">
              <label className={styles.label}>Salário</label>
              <input type="text" value={salario} onChange={(e) => setSalario(e.target.value)} className="form-control" placeholder="Digite o salário" />
            </div>
          </div>

          <div className={styles.divModal}>
            <div className="form-group">
              <label className={styles.label}>Data Nascimento:  </label>
              <input type="date" value={dataNasc} onChange={(e) => setDataNasc(e.target.value)} className="form-control" placeholder="Digite o CPF" />
            </div>
          </div>

          <div className={styles.divModal}>
            <div className="form-group">
              <label className={styles.label}>Email</label>
              <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" placeholder="Digite o Email" />
            </div>

            <div className="form-group">
              <label className={styles.label}>Telefone</label>
              <input type="text" value={telefone} onChange={(e) => setTelefone(e.target.value)} className="form-control" placeholder="(xx) XXXXX-XXXX " />
            </div>
          </div>

          <div className={styles.divModal}>
            <div className="form-group">
              <label className={styles.label}>Gênero</label>
              <input type="text" value={genero} onChange={(e) => setGenero(e.target.value)} className="form-control" placeholder="Digite o gênero" />
            </div>

            <div className="form-group">
              <label className={styles.label}>Rua</label>
              <input type="text" value={rua} onChange={(e) => setRua(e.target.value)} className="form-control" placeholder="Digite a rua" />
            </div>
          </div>

          <div className={styles.divModal}>
            <div className="form-group">
              <label className={styles.label}>Bairro</label>
              <input type="text" value={bairro} onChange={(e) => setBairro(e.target.value)} className="form-control" placeholder="Digite o bairro" />
            </div>

            <div className="form-group">
              <label className={styles.label}>Estado</label>
              <input type="text" value={estado} onChange={(e) => setEstado(e.target.value)} className="form-control" placeholder="Digite o estado" />
            </div>
          </div>

          <div className={styles.divModal}>
            <div className="form-group">
              <label className={styles.label}>Número</label>
              <input type="text" value={numero} onChange={(e) => setNumero(e.target.value)} className="form-control" placeholder="Digite o número" />
            </div>

            <div className="form-group">
              <label className={styles.label}>Cidade</label>
              <input type="text" value={cidade} onChange={(e) => setCidade(e.target.value)} className="form-control" placeholder="Digite a cidade" />
            </div>
          </div>

          <div className={styles.divModal}>
            <div className="form-group">
              <label className={styles.labelCustom}>Descrição do Cargo</label>
              <input type="text" value={descCargo} onChange={(e) => setDescCargo(e.target.value)} className="form-control" placeholder="Digite a descrição do cargo" />
            </div>
          </div>

          <div className={styles.divModal}>
            <button type="submit" value="Cadastrar" style={{ backgroundColor: "#CE7D0A", border: "2px #CE7D0A" }} className="btn btn-success">Cadastrar</button>

            <button style={{ backgroundColor: "#FFCF78", border: "2px #FFCF78", color: "black" }} className="btn btn-success">Cancelar</button>
          </div>
        </form>

      </ModalFuncionario>
    </div>
  );
};

export default FuncionariosContent;
