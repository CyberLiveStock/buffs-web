import React from "react"; // Remove useState
import styles from "./LoginContent.module.css";

const LoginContent = () => {

  // Função para alternar a visibilidade da senha
  const togglePasswordVisibility = () => {
    const passwordInput = document.getElementById("password");
    const icon = document.getElementById("passwordIcon");
    
    // Verifica o tipo do input e alterna
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      icon.src = "images/not-view-password.svg"; // Troca o ícone para visualização
    } else {
      passwordInput.type = "password";
      icon.src = "images/not-view-password-bloqued.svg"; // Troca o ícone para ocultar
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.imageSection}>
        <img
          src="images/bg2.png"
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
            <input
              type="email"
              id="email"
              required
              className={styles.input}
              placeholder="" // Adiciona espaço para acionar :placeholder-shown
            />
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <span className={styles.icon}>
              <img src="images/icon_email.svg" alt="Ícone de Email" />
            </span>
          </div>
          <div className={styles.inputGroup}>
            <input
              type="password" // Inicialmente como senha
              id="password"
              required
              className={styles.input}
              placeholder="" // Adiciona espaço para acionar :placeholder-shown
            />
            <label htmlFor="password" className={styles.label}>
              Senha
            </label>
            <span
              className={styles.icon}
              onClick={togglePasswordVisibility}
              style={{ cursor: "pointer" }}
            >
              <img
                id="passwordIcon" // Adiciona ID ao ícone
                src="images/not-view-password-bloqued.svg" // Ícone padrão
                alt="Ícone de senha"
              />
            </span>
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
