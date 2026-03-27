import type { InputHTMLAttributes } from "react";
import styles from "./Input.module.scss";

type Props = InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    error?: string;
};

export function Input({ label, error, className, ...props }: Props) {
    return (
        <label className={[styles.root, className].filter(Boolean).join(" ")}>
            <span className={styles.label}>{label}</span>

            <input className={styles.input} {...props} />

            {error && <span className={styles.error}>{error}</span>}
        </label>
    );
}
