import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUsers, mergeUser, useUsersStore } from "../../entities/user/model";
import { Loader, Section } from "../../shared/ui";
import { UserCard } from "../../entities/user/ui/UserCard";
import styles from "./UsersPage.module.scss";

export function UsersPage() {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["users"],
        queryFn: getUsers,
    });

    const statusById = useUsersStore((v) => v.statusById);
    const patchById = useUsersStore((v) => v.patchById);
    const archive = useUsersStore((v) => v.archive);
    const activate = useUsersStore((v) => v.activate);
    const hide = useUsersStore((v) => v.hide);

    const firstSix = useMemo(() => {
        const users = (data ?? []).slice(0, 6);

        return users.map((u) => mergeUser(u, patchById[u.id]));
    }, [data, patchById]);

    const activeUsers = firstSix.filter((u) => (statusById[u.id] ?? "active") === "active");
    const archivedUsers = firstSix.filter((u) => (statusById[u.id] ?? "active") === "archived");

    if (isLoading) {
        return <Loader label="Загружаем пользователей…" />;
    }

    if (isError) {
        return (
            <div className={styles.error}>
                Не удалось загрузить пользователей. Попробуйте обновить страницу.
            </div>
        );
    }

    return (
        <div className={styles.page}>
            <Section title="Активные">
                {activeUsers.length > 0 ? (
                    <div className={styles.grid}>
                        {activeUsers.map((user) => (
                            <UserCard key={user.id} user={user} onArchive={archive} onHide={hide} />
                        ))}
                    </div>
                ) : (
                    <p className={styles.empty}>Нет активных карточек.</p>
                )}
            </Section>

            <Section title="Архив">
                {archivedUsers.length > 0 ? (
                    <div className={styles.grid}>
                        {archivedUsers.map((user) => (
                            <UserCard key={user.id} user={user} onActivate={activate} />
                        ))}
                    </div>
                ) : (
                    <p className={styles.empty}>Архив пуст.</p>
                )}
            </Section>
        </div>
    );
}
