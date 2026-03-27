import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getUser, mergeUser, useUsersStore } from "../../entities/user/model";
import { Loader, Modal, Section } from "../../shared/ui";
import { UserSettings } from "../../entities/user/ui/UserSettings";
import { UserEditForm, type UserEditFormValues } from "../../entities/user/ui/UserEditForm";
import styles from "./UserEditPage.module.scss";

function getAvatarUrl(userId: number) {
    return `https://i.pravatar.cc/220?img=${userId}`;
}

function parseUserId(value: string | undefined) {
    const n = Number(value);
    if (!Number.isFinite(n)) return null;
    if (n <= 0) return null;
    return n;
}

function digitsOnly(value: string) {
    return value.replace(/\D/g, "");
}

export function UserEditPage() {
    const navigate = useNavigate();
    const params = useParams();

    const userId = parseUserId(params.userId);
    const patch = useUsersStore((v) => (userId ? v.patchById[userId] : undefined));
    const savePatch = useUsersStore((v) => v.savePatch);

    const [isSavedOpen, setIsSavedOpen] = useState(false);

    const { data, isLoading, isError } = useQuery({
        queryKey: ["users", userId],
        queryFn: () => getUser(userId as number),
        enabled: userId !== null,
    });

    const user = useMemo(() => {
        if (!data) return null;
        return mergeUser(data, patch);
    }, [data, patch]);

    const handleSubmit = (values: UserEditFormValues) => {
        if (!userId) return;

        savePatch(userId, {
            name: values.name,
            username: values.username,
            email: values.email,
            phone: values.phone,
            address: { city: values.city },
            company: { name: values.companyName },
        });

        setIsSavedOpen(true);
    };

    if (userId === null) {
        return (
            <div className={styles.error}>
                Некорректный `userId`. Вернитесь на главную страницу.
            </div>
        );
    }

    if (isLoading) {
        return <Loader label="Загружаем пользователя…" />;
    }

    if (isError || !user) {
        return (
            <div className={styles.error}>
                Не удалось загрузить пользователя. Попробуйте обновить страницу.
            </div>
        );
    }

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <button className={styles.backButton} type="button" onClick={() => navigate("/")}>
                    <svg
                        className={styles.desktopIcon}
                        width="21"
                        height="21"
                        viewBox="0 0 21 21"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M13.125 10.5H0.875"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                        <path
                            d="M7 16.625L0.875 10.5L7 4.375"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>

                    <svg
                        className={styles.mobileIcon}
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M13.7803 16.5303C13.4874 16.8232 13.0126 16.8232 12.7197 16.5303L8.71967 12.5303C8.42678 12.2374 8.42678 11.7626 8.71967 11.4697L12.7197 7.46967C13.0126 7.17678 13.4874 7.17678 13.7803 7.46967C14.0732 7.76256 14.0732 8.23744 13.7803 8.53033L10.3107 12L13.7803 15.4697C14.0732 15.7626 14.0732 16.2374 13.7803 16.5303Z"
                        />
                    </svg>

                    <span>Назад</span>
                </button>
            </div>

            <div className={styles.wrapper}>
                <UserSettings avatar={getAvatarUrl(userId)} />

                <div className={styles.inner}>
                    <Section title="Данные профиля">
                        <UserEditForm
                            defaultValues={{
                                name: user.name,
                                username: user.username,
                                email: user.email,
                                city: user.address.city,
                                phone: digitsOnly(user.phone),
                                companyName: user.company.name,
                            }}
                            onSubmit={handleSubmit}
                        />
                    </Section>
                </div>
            </div>

            <Modal
                title="Изменения сохранены"
                isOpen={isSavedOpen}
                onClose={() => setIsSavedOpen(false)}
                autoCloseMs={4000}
            />
        </div>
    );
}
