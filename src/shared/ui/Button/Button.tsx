import type { ButtonHTMLAttributes } from "react";
import styles from "./Button.module.scss";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "ghost" | "danger";
};

export function Button({ variant = "primary", className, children, ...props }: Props) {
    const cx =
        variant === "primary"
            ? styles.primary
            : variant === "danger"
              ? styles.danger
              : styles.ghost;

    return (
        <button className={[styles.root, cx, className].filter(Boolean).join(" ")} {...props}>
            {children}
        </button>
    );
}
