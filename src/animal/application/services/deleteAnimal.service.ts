import { AnimalRepository } from "../../domain/repository/animalResponsitory"

export class DeleteAnimalService {
  constructor(private animalRepository: AnimalRepository) {}

  async run(animalId: number): Promise<boolean> {
    try {
      const findAnimal = await this.animalRepository.getAnimalById(animalId);
      if (findAnimal) {
        await this.animalRepository.deleteAnimal(animalId);
        return true;
      }
      return false;
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
}
