import { create } from "zustand";
import type { UserPatch } from "./User.types";

export type UserCardStatus = "active" | "archived" | "hidden";

type UsersState = {
    statusById: Record<number, UserCardStatus | undefined>;
    patchById: Record<number, UserPatch | undefined>;

    getStatus: (userId: number) => UserCardStatus;
    archive: (userId: number) => void;
    activate: (userId: number) => void;
    hide: (userId: number) => void;

    savePatch: (userId: number, patch: UserPatch) => void;
};

function mergePatch(prev: UserPatch | undefined, patch: UserPatch): UserPatch {
    const next: UserPatch = { ...prev, ...patch };

    if (prev?.address || patch.address) {
        next.address = { ...(prev?.address ?? {}), ...(patch.address ?? {}) };
    }

    if (prev?.company || patch.company) {
        next.company = { ...(prev?.company ?? {}), ...(patch.company ?? {}) };
    }

    return next;
}

export const useUsersStore = create<UsersState>()((set, get) => ({
    statusById: {},
    patchById: {},

    getStatus: (userId) => get().statusById[userId] ?? "active",

    archive: (userId) => {
        set((v) => ({
            ...v,
            statusById: { ...v.statusById, [userId]: "archived" },
        }));
    },

    activate: (userId) => {
        set((v) => ({
            ...v,
            statusById: { ...v.statusById, [userId]: "active" },
        }));
    },

    hide: (userId) => {
        set((v) => ({
            ...v,
            statusById: { ...v.statusById, [userId]: "hidden" },
        }));
    },

    savePatch: (userId, patch) => {
        set((v) => ({
            ...v,
            patchById: {
                ...v.patchById,
                [userId]: mergePatch(v.patchById[userId], patch),
            },
        }));
    },
}));
