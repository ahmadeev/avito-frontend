import { axiosClient } from '../axiosClient.ts';
import type { CreateUserDto, UserResponseDTO } from './dto.ts';
import { type ListService, registerApi } from '../apiRegistry.ts';
import { queryClient } from '../queryClient.ts';

class UserService implements ListService<UserResponseDTO> {
    async getAll(): Promise<UserResponseDTO[]> {
        try {
            const res = await axiosClient.get<UserResponseDTO[]>('/users');

            return res.data;
        } catch (error) {
            console.log(error);

            return [];
        }
    }

    async create(group: CreateUserDto): Promise<UserResponseDTO> {
        const res = await axiosClient.post<UserResponseDTO>('/users', group);

        void queryClient.invalidateQueries({ queryKey: ['users'] });

        return res.data;
    }
}

export const userService = new UserService();

registerApi('users', userService);
