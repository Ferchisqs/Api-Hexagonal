import { User } from "../../../user/domain/entities";
import { UserRepository } from "../../../user/domain/repository/userRepository";
import { AuthResponse } from "../../domain/entities";
import { validateAuth } from "../../domain/validators/auth.validation";
import bcrypt from "bcrypt";
import { createJwt } from "../utils/createJwt.util";

export class LoginAuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async run(user: User): Promise<AuthResponse> {
    try {
      const resultValidation = validateAuth(user);
      if (resultValidation.success) {
        if (user.id_user === undefined) {
          throw new Error("User id_user is undefined");
        }

        const response = await this.userRepository.getUserById(user.id_user);

        // Verifica si response es null antes de continuar
        if (response === null) {
          throw new Error("User not found");
        }

        const isPasswordValid = this.compareCredentials(user.password, response.password);

        if (isPasswordValid) {
          const jwt = createJwt(response);
          const responseToken: AuthResponse = {
            token: jwt,
          };
          return responseToken;
        }

        throw new Error(`Password or id_user was not valid`);
      }

      throw new Error(resultValidation.error.message);
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }

  private compareCredentials(requestPassword: string, storedPassword: string): boolean {
    const correctPassword = bcrypt.compareSync(requestPassword, storedPassword);
    return correctPassword;
  }
}
