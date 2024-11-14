import axios from "axios";
import { useEffect, useState } from "react"
import styles from './FuncionariosContent.module.css';
import HeaderFuncionarios from '../HeaderFuncionarios/HeaderFuncionarios';


const FuncionariosContent = () => {
  const [funcionarios, setFuncionarios] = useState([]);

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
    fetchFuncionarios(); //Chamando a função, para executar a função
  }, []); // '[]' dependecia do useEffect

  return (
    <div className={styles.content}>
      <HeaderFuncionarios />

      {/* BARRA DE PESQUISA */}
      <div className={`row mt-3  ${styles.barraPesquisa}`}>
        <div className='col'>
          <form className='d-flex' id='searchForm'>
            <input className='form-control mr-2' type="search"
              placeholder="Pesquisar funcionário"
              aria-label="Pesquisar" id="searchInput"
            />
            <button className={`btn btn-secondary ml-2 ${styles.buttonPesquisar} `} type="submit">
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
    </div>

  );
};

export default FuncionariosContent;
