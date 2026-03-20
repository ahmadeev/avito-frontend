import { http, HttpResponse } from 'msw';
import type { User, UserResponseDTO } from '../api/users/dto.ts';

let id = 3;

const GROUP: User = {
    id: 1,
    name: 'Дружная компания',
};

const GROUP_2: User = {
    id: 2,
    name: 'веселые посиделки',
};

const groups: User[] = [GROUP, GROUP_2];

export const handlers = [
    /* groups */
    http.get('/api/groups', () => {
        return HttpResponse.json(groups);
    }),
    http.post('/api/groups', async ({ request }) => {
        const json = await request.json() as UserResponseDTO;

        json.id = id++;

        groups.push(json);

        return HttpResponse.json(json);
    }),
];
