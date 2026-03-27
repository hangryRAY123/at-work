export type User = {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
    address: {
        city: string;
    };
    company: {
        name: string;
    };
};

export type UserPatch = {
    name?: string;
    username?: string;
    email?: string;
    phone?: string;
    address?: {
        city?: string;
    };
    company?: {
        name?: string;
    };
};
