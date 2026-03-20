export interface User {
    id: number,
    name: string,
}

export type CreateUserDto = Omit<User, 'id'>;
export type UserResponseDTO = User;
