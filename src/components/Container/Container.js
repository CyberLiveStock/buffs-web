import styles from "@/components/Container/Container.module.css";

const Container = ({ children }) => {
  return (
    <div className={styles.containerCover}>
      {children} 
    </div>
  );
};

export default Container;
