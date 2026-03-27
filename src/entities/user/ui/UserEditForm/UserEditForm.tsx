import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, Button } from "../../../../shared/ui";
import { userEditSchema } from "./UserEditForm.service";
import type { UserEditFormValues } from "./UserEditForm.types";

import styles from "./UserEditForm.module.scss";

type UserEditFormProps = {
    defaultValues: UserEditFormValues;
    onSubmit: (values: UserEditFormValues) => void;
};

export function UserEditForm({ defaultValues, onSubmit }: UserEditFormProps) {
    const form = useForm<UserEditFormValues>({
        resolver: zodResolver(userEditSchema),
        values: defaultValues,
        mode: "onSubmit",
    });

    const errors = form.formState.errors;

    return (
        <form className={styles.form} onSubmit={form.handleSubmit(onSubmit)}>
            <div className={styles.grid}>
                <Input
                    label="Имя"
                    placeholder="Введите имя"
                    {...form.register("name")}
                    error={errors.name?.message}
                    autoComplete="name"
                />

                <Input
                    label="Никнейм"
                    placeholder="Введите никнейм"
                    {...form.register("username")}
                    error={errors.username?.message}
                    autoComplete="username"
                />

                <Input
                    label="Почта"
                    placeholder="name@example.com"
                    {...form.register("email")}
                    error={errors.email?.message}
                    autoComplete="email"
                />

                <Input
                    label="Город"
                    placeholder="Введите город"
                    {...form.register("city")}
                    error={errors.city?.message}
                    autoComplete="address-level2"
                />

                <Input
                    label="Телефон"
                    placeholder="Только цифры"
                    inputMode="numeric"
                    {...form.register("phone")}
                    error={errors.phone?.message}
                    autoComplete="tel"
                />

                <Input
                    label="Название компании"
                    placeholder="Введите название компании"
                    {...form.register("companyName")}
                    error={errors.companyName?.message}
                    autoComplete="organization"
                />
            </div>

            <div className={styles.form_actions}>
                <Button type="submit">Сохранить</Button>
            </div>
        </form>
    );
}
