import styles from "./page.module.css";

export default function Address({ params: { id } }) {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Address {id}</h1>
    </main>
  );
}
