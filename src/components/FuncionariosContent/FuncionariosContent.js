import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./FuncionariosContent.module.css";
import HeaderFuncionarios from "../HeaderFuncionarios/HeaderFuncionarios";
import ModalFuncionario from "../ModalFuncionario/ModalFuncionario";
import "@fortawesome/fontawesome-free/css/all.min.css";

const FuncionariosContent = () => {
  const [funcionarios, setFuncionarios] = useState([]); // Coleção Funcionarios
  const [isModalOpen, setModalOpen] = useState(false); // Estado do Modal
  const [isEdit, setIsEdit] = useState(false); // Estado de edição
  const [funcionarioId, setFuncionarioId] = useState(null); // ID do funcionário para edição

  const [nome, setNome] = useState("");
  const [salario, setSalario] = useState("");
  const [dataNasc, setDataNasc] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [genero, setGenero] = useState("");
  const [rua, setRua] = useState("");
  const [bairro, setBairro] = useState("");
  const [estado, setEstado] = useState("");
  const [numero, setNumero] = useState("");
  const [cidade, setCidade] = useState("");
  const [descCargo, setDescCargo] = useState("");
  const [status, setStatus] = useState("Ativo"); // Estado do status

  useEffect(() => {
    const fetchFuncionarios = async () => {
      try {
        const response = await axios.get("http://localhost:4000/funcionarios");
        setFuncionarios(response.data.funcionarios);
      } catch (error) {
        console.log(error);
      }
    };
    fetchFuncionarios();
  }, []);

  // Para Barra de Pesquisa
  const [searchTerm, setSearchTerm] = useState("");
  const filteredFuncionarios = funcionarios.filter((funcionario) =>
    funcionario.nome.toLowerCase().includes(searchTerm.toLowerCase()) && funcionario.status === 'Ativo'
  );

  // Abrir Modal para Cadastro ou Edição
  const openModal = (funcionario = null) => {
    if (funcionario) {
      setIsEdit(true);
      setFuncionarioId(funcionario._id);
      setNome(funcionario.nome);
      setSalario(funcionario.salario);
      setDataNasc(funcionario.dataNasc);
      setEmail(funcionario.email);
      setTelefone(funcionario.telefone);
      setGenero(funcionario.genero);
      setRua(funcionario?.endereco?.[0]?.rua);
      setBairro(funcionario?.endereco?.[0]?.bairro);
      setEstado(funcionario?.endereco?.[0]?.estado);
      setNumero(funcionario?.endereco?.[0]?.numero);
      setCidade(funcionario?.endereco?.[0]?.cidade);
      setDescCargo(funcionario.descCargo);
      setStatus(funcionario.status); // Carregar o status atual
    } else {
      setIsEdit(false);
      setFuncionarioId(null);
      setNome("");
      setSalario("");
      setDataNasc("");
      setEmail("");
      setTelefone("");
      setGenero("");
      setRua("");
      setBairro("");
      setEstado("");
      setNumero("");
      setCidade("");
      setDescCargo("");
      setStatus("Ativo"); // Resetar status para 'Ativo'
    }
    setModalOpen(true);
  };

  // Fechar Modal
  const closeModal = () => {
    setModalOpen(false);
    setIsEdit(false);
    setFuncionarioId(null);
  };

  const handleSubmit = async (event, isArchive = false) => {
    event.preventDefault(); // Evita o comportamento padrão do formulário
    // Lógica para arquivar o funcionário
    if (isArchive) {
      try {
        const response = await axios.put(`http://localhost:4000/funcionario/${funcionarioId}`, { status: "Inativo" });
        if (response.status === 200) {
          alert("Funcionário arquivado com sucesso!");
        }
      } catch (error) {
        console.error("Erro ao arquivar funcionário:", error);
        alert("Erro ao arquivar o funcionário.");
      }
      return; // Finaliza a função para não executar o restante da lógica
    }
    // Lógica para Cadastrar ou Editar o funcionário
    if (nome && salario && dataNasc && email && telefone && genero && rua && bairro && estado && numero && cidade && descCargo && status !== "") {
      const funcionario = {
        nome, salario, dataNasc, email, telefone, genero, descCargo, status,
        endereco: [
          {
            rua,
            bairro,
            cidade,
            estado,
            numero
          }
        ]
      };
      try {
        if (isEdit) {
          // Lógica para atualizar
          const response = await axios.put(`http://localhost:4000/funcionario/${funcionarioId}`, funcionario);
          if (response.status === 200) {
            alert("Funcionário atualizado com sucesso!");
          }
        } else {
          // Lógica para cadastrar
          const response = await axios.post("http://localhost:4000/funcionario", funcionario);
          if (response.status === 201) {
            alert("Funcionário cadastrado com sucesso!");
          }
        }
      } catch (error) {
        console.error("Erro ao salvar funcionário:", error);
      }
    } else {
      alert("Por favor, preencha todos os campos.");
    }
  };

  return (
    <div className={styles.content}>
      <HeaderFuncionarios openModal={() => openModal()} />

      <div className={`row mt-3 ${styles.barraPesquisa}`}>
        <div className="col">
          <form className="input-group" id="searchForm">
            <input
              className="form-control"
              type="search"
              placeholder="Pesquisar funcionário"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className={`btn btn-secondary ${styles.buttonPesquisar}`}
              type="button"
            >
              <i className="fas fa-search"></i>
            </button>
          </form>
        </div>
      </div>

      <div className={styles.divInfosFunc}>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col" className={styles.headerCell}>
                Nome
              </th>
              <th scope="col" className={styles.headerCell}>
                Cargo
              </th>
              <th scope="col" className={styles.headerCell}>
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredFuncionarios.map((funcionario) => (
              <tr key={funcionario._id}>
                <td className="text-center">{funcionario.nome}</td>
                <td className="text-center">{funcionario.descCargo}</td>
                <td className="text-center">
                  <img
                    src="/images/icons/pen.svg"
                    className={styles.icon}
                    alt="lapis_editar"
                    onClick={() => openModal(funcionario)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal de Cadastro e Edição */}
      <ModalFuncionario isOpen={isModalOpen} closeModal={closeModal}>
        <h2 style={{ marginLeft: "14px" }}>{isEdit ? "Editar Funcionário" : "Cadastrar Funcionário"}</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.divModal}>
            <div className="form-group">
              <label label className={styles.label}>Nome</label>
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="form-control"
                placeholder="Digite o nome"
              />
            </div>
            <div className="form-group">
              <label label className={styles.label}>Salário</label>
              <input
                type="text"
                value={salario}
                onChange={(e) => setSalario(e.target.value)}
                className="form-control"
                placeholder="Digite o salário"
              />
            </div>
          </div>

          <div className={styles.divModal}>
            <div className="form-group">
              <label label className={styles.label} >Data Nascimento</label>
              <input
                type="date"
                value={dataNasc ? new Date(dataNasc).toISOString().split('T')[0] : ""}
                onChange={(e) => setDataNasc(e.target.value)}
                className="form-control"
              />
            </div>
          </div>

          <div className={styles.divModal}>
            <div className="form-group">
              <label className={styles.labelCustom}>Email</label>
              <input

                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                placeholder="Digite o Email"
              />
            </div>
          </div>

          <div className={styles.divModal}>
            <div className="form-group">
              <label label className={styles.label}>Telefone</label>
              <input
                type="text"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                className="form-control"
                placeholder="(xx) XXXXX-XXXX"
              />
            </div>
            <div className="form-group">
              <label label className={styles.label}>Gênero</label>
              <input
                type="text"
                value={genero}
                onChange={(e) => setGenero(e.target.value)}
                className="form-control"
                placeholder="Gênero"
              />
            </div>
          </div>

          <div className={styles.divModal}>
            <div className="form-group">
              <label className={styles.labelCustom}>Rua</label>
              <input
                type="text"
                value={rua}
                onChange={(e) => setRua(e.target.value)}
                className="form-control"
                placeholder="Rua"
              />
            </div>
          </div>

          <div className={styles.divModal}>
            <div className="form-group">
              <label className={styles.label}>Bairro</label>
              <input
                type="text"
                value={bairro}
                onChange={(e) => setBairro(e.target.value)}
                className="form-control"
                placeholder="Bairro"
              />
            </div>

            <div className="form-group">
              <label className={styles.label} >Número</label>
              <input
                type="text"
                value={numero}
                onChange={(e) => setNumero(e.target.value)}
                className="form-control"
                placeholder="Número"
              />
            </div>
          </div>

          <div className={styles.divModal}>
            <div className="form-group">
              <label className={styles.label} >Cidade</label>
              <input
                type="text"
                value={cidade}
                onChange={(e) => setCidade(e.target.value)}
                className="form-control"
                placeholder="Cidade"
              />
            </div>
            <div className="form-group">
              <label className={styles.label} >Estado</label>
              <input
                type="text"
                value={estado}
                onChange={(e) => setEstado(e.target.value)}
                className="form-control"
                placeholder="Estado"
              />
            </div>
          </div>

          <div className={styles.divModal}>
            <div className="form-group">
              <label className={styles.labelCustom} >Descrição Cargo</label>
              <input
                type="text"
                value={descCargo}
                onChange={(e) => setDescCargo(e.target.value)}
                className="form-control"
                placeholder="Descrição Cargo"
              />
            </div>
          </div>

          <div className={styles.divModal}>
            <button
              type="submit"
              className="btn btn-primary"
              style={{
                backgroundColor: "#FFCF78",
                border: "2px #FFCF78",
                color: "black",
              }}
            >
              {isEdit ? "Atualizar" : "Cadastrar"}
            </button>

            {isEdit && (
              <button
                type="button"
                className="btn btn-warning ms-2"
                style={{
                  backgroundColor: "#f39c12",
                  border: "2px #f39c12",
                  color: "black",
                }}
                onClick={(e) => handleSubmit(e, true)} // Passa true para arquivar
              >
                Arquivar
              </button>
            )}

            <button
              type="button"
              className="btn btn-secondary ms-2"
              style={{
                backgroundColor: "#ccc",
                border: "2px #ccc",
                color: "black",
              }}
              onClick={closeModal}
            >
              Cancelar
            </button>
          </div>
        </form>
      </ModalFuncionario>

    </div>
  );
};

export default FuncionariosContent;
