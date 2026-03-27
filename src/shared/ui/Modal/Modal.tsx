import { useEffect } from "react";
import styles from "./Modal.module.scss";

type Props = {
    title: string;
    isOpen: boolean;
    onClose: () => void;
    autoCloseMs?: number;
};

export function Modal({ title, isOpen, onClose, autoCloseMs = 4000 }: Props) {
    useEffect(() => {
        if (!isOpen) return;
        if (!autoCloseMs) return;

        const id = window.setTimeout(() => {
            onClose();
        }, autoCloseMs);

        return () => {
            window.clearTimeout(id);
        };
    }, [autoCloseMs, isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className={styles.overlay} onMouseDown={() => onClose()} role="presentation">
            <div
                className={styles.modal}
                onMouseDown={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-label={title}
            >
                <button className={styles.close} type="button" onClick={() => onClose()}>
                    <svg
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M9.7433 1.49372C10.085 1.15201 10.085 0.59799 9.7433 0.256282C9.40159 -0.0854272 8.84757 -0.0854272 8.50586 0.256282L4.99979 3.76235L1.49373 0.256282C1.15202 -0.0854264 0.598001 -0.0854268 0.256292 0.256282C-0.0854163 0.597991 -0.0854161 1.15201 0.256292 1.49372L3.76236 4.99978L0.256281 8.50586C-0.085427 8.84757 -0.0854273 9.40159 0.256281 9.7433C0.59799 10.085 1.15201 10.085 1.49372 9.7433L4.99979 6.23722L8.50587 9.7433C8.84758 10.085 9.4016 10.085 9.74331 9.7433C10.085 9.40159 10.085 8.84757 9.74331 8.50586L6.23723 4.99978L9.7433 1.49372Z" />
                    </svg>
                </button>

                <svg
                    width="84"
                    height="84"
                    viewBox="0 0 84 84"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M25.6087 13.1907C36.4151 11.983 47.585 11.983 58.3914 13.1907C62.4487 13.6442 66.0103 15.8383 68.2633 19.0246L40.2501 47.0378L31.6063 38.394C30.5812 37.3688 28.9191 37.3688 27.894 38.394C26.8688 39.4191 26.8688 41.0811 27.894 42.1063L38.394 52.6063C39.4191 53.6314 41.0812 53.6314 42.1063 52.6063L70.5103 24.2023C70.589 24.5857 70.6517 24.9751 70.6979 25.3698C71.9902 36.419 71.9902 47.5812 70.6979 58.6304C69.9459 65.0598 64.7838 70.095 58.3914 70.8095C47.585 72.0173 36.4151 72.0173 25.6087 70.8095C19.2164 70.095 14.0542 65.0598 13.3022 58.6304C12.0099 47.5812 12.0099 36.419 13.3022 25.3698C14.0542 18.9404 19.2164 13.9052 25.6087 13.1907Z"
                        fill="#C6F4C6"
                    />
                </svg>

                <p className={styles.title}>{title}</p>
            </div>
        </div>
    );
}
