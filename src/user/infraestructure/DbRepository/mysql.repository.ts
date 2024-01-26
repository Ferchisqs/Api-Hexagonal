import { db } from "../../../shared/application/mysqlConnection";
import { UserRepository } from "../../domain/repository/userRepository";
import { User } from "../../domain/entities";

export class MySqlRepositoryUser implements UserRepository {
  getUserById(id: number): Promise<User | null> {
    const query = "select * from usuarios where id = ?";
    return db.execute(query, [id])
      .then((res: any) => (res[0].length ? res[0][0] : null) as User);
  }

  updateUserById(id: number, user: User): Promise<User> {
    const { password, username } = user;
    const query = "update usuarios set contrasena = ?, username = ? where id = ?";
    return db.execute(query, [password, username, id])
      .then((res: any) => res[0] as User);
  }

  getUsers(): Promise<User[]> {
    const query = "select * from usuarios";
    return db.execute(query)
      .then((res: any) => res[0] as User[]);
  }

  createUser(user: User): Promise<User> {
    const { password, username } = user;
    const query = "insert into usuarios (contrasena, username) values (?, ?)";
    return db.execute(query, [password, username])
      .then((res: any) => res.values as User);
  }

  deleteUserById(id: number): Promise<void> {
    const query = "delete from usuarios where id = ?";
    return db.execute(query, [id])
      .then(() => {});  // No hay necesidad de retornar algo específico para la eliminación
  }
}
