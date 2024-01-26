import { User, UserResponse } from "../entities";

export function getUserDto(user: User): UserResponse {
    return {
        id_user: user.id_user,
        username: user.username,
        password: user.password,  
    };
}
