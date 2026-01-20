import styles from './DottedLines.module.css';

export default function DottedLines() {
  return (
    <div className={styles.placeholderLines}>
      <p className={styles.placeholderLine}>.............................................................................................................................................</p>
      <p className={styles.placeholderLine}>.............................................................................................................................................</p>
    </div>
  );
}
