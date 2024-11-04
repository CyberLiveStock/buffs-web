

import styles from './FuncionariosContent.module.css';
import HeaderFuncionarios from '../HeaderFuncionarios/HeaderFuncionarios';

const FuncionariosContent = () => {
  return (
    <div className={styles.content}>
      <HeaderFuncionarios />
      <p className={styles.description}>
        Este é o conteúdo da página inicial. Você pode adicionar mais informações ou elementos aqui.
      </p>
    </div>
  );
};

export default FuncionariosContent;
