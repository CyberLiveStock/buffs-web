import React from "react";
import styles from "./LoginContent.module.css";

const LoginContent = () => {
  return (
    <div className={styles.container}>
      <div className={styles.imageSection}>
        <img
          src="images/bg2.png" // Substitua pela URL da imagem desejada
          alt="Imagem de login"
          className={styles.image}
        />
      </div>
      <div className={styles.formSection}>
        <h1 className={styles.title}>Bem-Vindo!</h1>
        <p className={styles.description}>
          Faça login com os dados inseridos durante seu cadastro.
        </p>
        <form className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Email" required />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password">Senha</label>
            <input type="password" id="password" placeholder="Senha" required />
          </div>
          <button type="button" className={styles.loginButton}>
            Log in
          </button>
        </form>
        <a href="/forgot-password" className={styles.forgotPassword}>
          Esqueci minha senha
        </a>
      </div>
    </div>
  );
};

export default LoginContent;
