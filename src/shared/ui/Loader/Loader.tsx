import styles from "./Loader.module.scss";

type Props = {
    label?: string;
};

export function Loader({ label = "Загрузка…" }: Props) {
    return (
        <div className={styles.root} role="status" aria-live="polite">
            <div className={styles.spinner} />
            <div className={styles.label}>{label}</div>
        </div>
    );
}
