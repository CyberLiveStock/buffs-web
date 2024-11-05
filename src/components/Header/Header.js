// src/components/Header/Header.js

import { useState } from "react";
import styles from './Header.module.css';

const Header = () => {
  const [menuActive, setMenuActive] = useState(false);

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  return (
    <header className={styles.header}>
      <img src="/images/Logo-buffs.svg" alt="Logo" className={styles.logo} />
      
      
    </header>
  );
};

export default Header;
