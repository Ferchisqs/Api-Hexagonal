import { db } from "../../../shared/application/mysqlConnection";
import { Animal } from "../../domain/entities";
import { AnimalRepository } from "../../domain/repository/animalResponsitory";

export class MySQLRepositoryAnimal implements AnimalRepository {
  getAnimals(): Promise<Animal[]> {
    const query = "SELECT * FROM animales";
    return db.execute(query).then((res: any) => {
      return res[0] as Animal[];
    });
  }

  getAnimalById(animalId: number): Promise<Animal> {
    const query = "SELECT * FROM animales where id = ?";
    return db
      .execute(query, [animalId])
      .then((res: any) => {
        console.log(res);
        return res[0][0] as Animal;
      })
      .catch((err: any) => {
        throw new Error(err);
      });
  }

  createAnimal(animal: Animal): Promise<Animal> {
    const { nombre, temperatura, humedad, movimiento } = animal;
    const query = `INSERT INTO animales (nombre, temperatura, humedad, movimiento) VALUES (?,?,?,?)`;
    return db
      .execute(query, [nombre, temperatura, humedad, movimiento])
      .then(() => {
        return animal;
      })
      .catch((err: any) => {
        throw new Error(err);
      });
  }

  deleteAnimal(animalId: number): Promise<void> {
    const query = "DELETE FROM animales WHERE id = ?";
    return db.execute(query, [animalId]).then(() => {});
  }

  updateAnimal(animalId: number, animal: Animal): Promise<Animal> {
    const { nombre, temperatura, humedad, movimiento } = animal;
    const query = "UPDATE animales SET nombre = ?, temperatura = ?, humedad = ?, movimiento = ? WHERE id = ?";
    return db
      .execute(query, [nombre, temperatura, humedad, movimiento, animalId])
      .then(() => animal)
      .catch((err: any) => {
        throw new Error(err);
      });
  }
}
