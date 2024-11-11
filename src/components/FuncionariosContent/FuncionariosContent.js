
import styles from './FuncionariosContent.module.css';
import HeaderFuncionarios from '../HeaderFuncionarios/HeaderFuncionarios';



const FuncionariosContent = () => {
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
    </div>

  );
};

export default FuncionariosContent;
