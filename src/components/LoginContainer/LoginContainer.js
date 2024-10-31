import styles from '@/components/LoginContainer/LoginContainer.module.css';

const LoginContainer = ({children}) => {
  return (
    <div className={styles.containerCover}>
      <div className={styles.imageSide}></div>
      <div className={styles.formSide}>
        <div className={styles.container}>{children}</div>
      </div>
    </div>
  );
};

export default LoginContainer;
