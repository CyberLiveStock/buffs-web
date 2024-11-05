// src/components/Header/Header.js

import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <img src="/images/Logo-buffs.svg" alt="Logo" className={styles.logo} /> 
    </header>
  );
};

export default Header;
