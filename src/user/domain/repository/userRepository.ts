import { User } from "../entities";

export interface UserRepository {
  getUsers(): Promise<User[]>;
  getUserById(id: number): Promise<User | null>;  
  createUser(user: User): Promise<User>;
  deleteUserById(id: number): Promise<void>;
  updateUserById(id: number, user: User): Promise<User>;  
}
