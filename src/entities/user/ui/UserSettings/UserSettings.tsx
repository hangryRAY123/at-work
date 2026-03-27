import styles from "./UserSettings.module.scss";

interface UserSettingsProps {
    avatar: string;
}

export function UserSettings({ avatar }: UserSettingsProps) {
    return (
        <div className={styles.settings}>
            <div className={styles.avatar}>
                <img src={avatar} alt="Avatar." width="280" height="485" />
            </div>
            <ul className={styles.list}>
                <li className={styles.list_item}>
                    <button className={styles.active} type="button">
                        Данные профиля
                    </button>
                </li>
                <li className={styles.list_item}>
                    <button type="button">Рабочее пространство</button>
                </li>
                <li className={styles.list_item}>
                    <button type="button">Приватность</button>
                </li>
                <li className={styles.list_item}>
                    <button type="button">Безопасность</button>
                </li>
            </ul>
        </div>
    );
}
