import { getUserDto } from "../../domain/dtos";
import { UserResponse } from "../../domain/entities";
import { UserRepository } from "../../domain/repository/userRepository";

export class GetUserByIdService {
  constructor(private readonly userRepository: UserRepository) {}

  async run(id: number): Promise<UserResponse> {
    try {
      const response = await this.userRepository.getUserById(id);

      if (response) {
        const formattedResponse = getUserDto(response);
        return formattedResponse;
      }

      return {} as UserResponse;
    } catch (err: any) {
      console.error(err);
      throw new Error(err);
    }
  }
}

