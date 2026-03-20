export interface ListService<T> { getAll: () => Promise<T[]> }

const registry = new Map<string, ListService<unknown>>();
const publicApi = new Set<string>();

export function isPublicApi(entity: string) {
    return publicApi.has(entity);
}

export function getApi<T>(entity: string) {
    const api = registry.get(entity);

    if (!api) {
        throw new Error(`API not registered: ${entity}`);
    }

    return api as ListService<T>;
}

export function registerApi<T>(entity: string, service: ListService<T>) {
    registry.set(entity, service);
    publicApi.add(entity);
}
