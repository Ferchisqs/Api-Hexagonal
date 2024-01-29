import { Animal } from "../../domain/entities";
import { AnimalRepository } from "../../domain/repository/animalResponsitory";

export class LocalDataRepositoryAnimal implements AnimalRepository {
  private animalsLocalData: Animal[];

  constructor(animalsLocalData: Animal[]) {
    this.animalsLocalData = animalsLocalData;
  }

  async getAnimals(): Promise<Animal[]> {
    return this.animalsLocalData;
  }

  async getAnimalById(animalId: number): Promise<Animal> {
    return this.animalsLocalData.find((animal) => animal.id === animalId) ?? ({} as Animal);
  }

  async createAnimal(animal: Animal): Promise<Animal> {
    const id = this.animalsLocalData.length + 1;
    const newAnimal: Animal = { ...animal, id };
    this.animalsLocalData.push(newAnimal);
    return newAnimal;
  }

  async deleteAnimal(animalId: number): Promise<void> {
    this.animalsLocalData = this.animalsLocalData.filter((animal) => animal.id !== animalId);
  }

  async updateAnimal(animalId: number, updatedAnimal: Animal): Promise<Animal> {
    this.animalsLocalData = this.animalsLocalData.map((animal) =>
      animal.id === animalId ? { ...animal, ...updatedAnimal } : animal
    );
    return { ...updatedAnimal, id: animalId };
  }
}
