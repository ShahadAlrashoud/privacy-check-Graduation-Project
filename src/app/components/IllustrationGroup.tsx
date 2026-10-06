import styles from './IllustrationGroup.module.css';

export default function IllustrationGroup() {
  return (
    <div className={styles.illustrationGroup}>
      <img className={`${styles.card} ${styles.card1}`} src="/Document card.png" alt="Terms of Service" />
      <div className={`${styles.cardText} ${styles.cardText1}`}>Terms of Service</div>

      <img className={`${styles.card} ${styles.card2}`} src="/Document card.png" alt="Privacy Policy" />
      <div className={`${styles.cardText} ${styles.cardText2}`}>Privacy Policy</div>

      <img className={styles.shield} src="/Shield + lock.png" alt="" />

      <img className={`${styles.sparkle} ${styles.sparkle1}`} src="/Sparkle accent.png" alt="" />
      <img className={`${styles.sparkle} ${styles.sparkle2}`} src="/Sparkle accent.png" alt="" />
    </div>
  );
}