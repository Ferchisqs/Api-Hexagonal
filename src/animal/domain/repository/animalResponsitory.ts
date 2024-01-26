import { Animal } from "../entities";

export interface AnimalRepository {
  getAnimals(): Promise<Animal[]>;
  getAnimalById(animalId: number): Promise<Animal | null>;
  createAnimal(animal: Animal): Promise<Animal>;
  updateAnimal(animalId: number, animal: Animal): Promise<Animal | null>;
  deleteAnimal(animalId: number): Promise<void>;
}
