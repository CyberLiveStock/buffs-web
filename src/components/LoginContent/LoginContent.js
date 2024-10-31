import styles from "@/components/LoginContent/LoginContent.module.css";

const LoginContent = () => {
  return (
    <div className={styles.loginContent}>
      <h1 className={styles.h1}>Bem Vindo!</h1>
      <p className={styles.p}>Faça login com os dados inseridos durante seu cadastro.</p>
      <form className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="Email" required />
          <span className={styles.icon}></span>
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="password">Senha</label>
          <input type="password" id="password" placeholder="Senha" required />
          <span className={styles.icon}></span>
        </div>
        <button type="button" className={styles.loginButton}>
          Log in
        </button>
      </form>
      <a href="/forgot-password" className={styles.forgotPassword}>
        Esqueci minha senha
      </a>
    </div>
  );
};

export default LoginContent;
