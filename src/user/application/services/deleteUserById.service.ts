import { UserRepository } from "../../domain/repository/userRepository";

export class DeleteUserByIdService {
  constructor(private readonly userRepository: UserRepository) {}
  async run(id: number): Promise<boolean> {
    try {
      const user = await this.userRepository.getUserById(id);
      if (user) {
        await this.userRepository.deleteUserById(id);
        return true;
      }
      return false;
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
}