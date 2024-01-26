import { User, UserResponse } from "../../domain/entities";
import { UserRepository } from "../../domain/repository/userRepository";
import { validatePartialUser } from "../../domain/validators/user.validator";
import { createPasswordHash } from "../../../auth/application/utils";

export class UpdateUserByIdService {
  constructor(private readonly userRepository: UserRepository) {}

  async run(user: User, id: number): Promise<UserResponse> { // Cambiado el parámetro a id
    const resultValidation = validatePartialUser(user);
    if (resultValidation.success) {
      const originalUser = await this.userRepository.getUserById(id); // Cambiado a getUserById
      if (!originalUser) throw new Error("User not found");

      originalUser.username = user.username;
      originalUser.password = createPasswordHash(user.password);

      return await this.userRepository.updateUserById(id, originalUser); // Cambiado a updateUserById
    }
    throw new Error(resultValidation.error.message);
  }
}
