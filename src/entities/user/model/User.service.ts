import { fetchJson } from "../../../shared/api/jsonPlaceholder";
import type { User, UserPatch } from "./User.types";

export async function getUsers() {
    return await fetchJson<User[]>("/users");
}

export async function getUser(userId: number) {
    return await fetchJson<User>(`/users/${userId}`);
}

export function mergeUser(user: User, patch: UserPatch | undefined): User {
    if (!patch) return user;

    return {
        ...user,
        ...patch,
        address: {
            ...user.address,
            ...(patch.address ?? {}),
        },
        company: {
            ...user.company,
            ...(patch.company ?? {}),
        },
    };
}
