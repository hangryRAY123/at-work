export const JSON_PLACEHOLDER_BASE_URL = "https://jsonplaceholder.typicode.com";

type Json = unknown;

export async function fetchJson<T = Json>(path: string, init?: RequestInit) {
    const res = await fetch(`${JSON_PLACEHOLDER_BASE_URL}${path}`, {
        ...init,
        headers: {
            Accept: "application/json",
            ...(init?.headers ?? {}),
        },
    });

    if (!res.ok) {
        throw new Error(`Request failed: ${res.status} ${res.statusText}`);
    }

    return (await res.json()) as T;
}
