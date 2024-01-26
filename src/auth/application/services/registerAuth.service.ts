import { User } from "../../../user/domain/entities";
import { UserRepository } from "../../../user/domain/repository/userRepository";
import { validateUser } from "../../../user/domain/validators/user.validator";
import { AuthResponse } from "../../domain/entities";
import { createPasswordHash, createJwt } from "../utils";

export class RegisterAuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async run(user: User): Promise<AuthResponse> {
    try {
      const resultValidation = validateUser(user);

      if (resultValidation.success) {
        const id_user = resultValidation.data.id_user;

        if (id_user === undefined) {
          throw new Error("id_user is undefined");
        }

        const isUserCreated = await this.existingUser(id_user);

        if (!isUserCreated) {
          const password = createPasswordHash(resultValidation.data.password);

          const newUser: User = {
            ...resultValidation.data,
            id_user,
            password,
          };

          const responseUser: any = await this.userRepository.createUser(newUser);
          const jwt = createJwt(responseUser);

          const responseToken: AuthResponse = {
            token: jwt,
          };

          return responseToken;
        }

        throw new Error("Could not create user");
      }

      throw new Error(resultValidation.error.message);
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }


  private async existingUser(id_user: number): Promise<boolean> {
    const existingUser = await this.userRepository.getUserById(id_user);
    return !!existingUser;
  }
}
