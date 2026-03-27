import styles from "./Section.module.scss";

interface SectionProps {
    children: React.ReactNode;
    title: string;
}

export function Section({ children, title }: SectionProps) {
    return (
        <section className={styles.section}>
            <div className={styles.section_header}>
                <h2 className={styles.title}>{title}</h2>
            </div>

            {children}
        </section>
    );
}
