import { Link } from "react-router";
import { DropdownMenu } from "../../../../shared/ui";
import styles from "./UserCard.module.scss";

type UserCardProps = {
    user: {
        id: number;
        username: string;
        address: { city: string };
        company: { name: string };
    };
    onArchive?: (id: number) => void;
    onActivate?: (id: number) => void;
    onHide?: (id: number) => void;
};

function getAvatarUrl(userId: number) {
    return `https://i.pravatar.cc/160?img=${userId}`;
}

export function UserCard({ user, onArchive, onActivate, onHide }: UserCardProps) {
    const isArchived = Boolean(onActivate);

    const archiveClass = [styles.card, isArchived && styles.archive].filter(Boolean).join(" ");

    return (
        <aside className={archiveClass}>
            <img
                className={styles.avatar}
                src={getAvatarUrl(user.id)}
                alt="Avatar"
                width="112"
                height="120"
            />

            <div className={styles.card_body}>
                <div className={styles.inner}>
                    <h3 className={styles.username}>{user.username}</h3>

                    <DropdownMenu>
                        {!isArchived && <Link to={`/users/${user.id}/edit`}>Редактировать</Link>}

                        {onArchive && (
                            <button type="button" onClick={() => onArchive(user.id)}>
                                Архивировать
                            </button>
                        )}

                        {onActivate && (
                            <button type="button" onClick={() => onActivate(user.id)}>
                                Активировать
                            </button>
                        )}

                        {onHide && (
                            <button type="button" onClick={() => onHide(user.id)}>
                                Скрыть
                            </button>
                        )}
                    </DropdownMenu>
                </div>

                <span className={styles.address_city}>{user.address.city}</span>

                <span className={styles.company_name}>{user.company.name}</span>
            </div>
        </aside>
    );
}
