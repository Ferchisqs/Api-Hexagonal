import { AnimalResponse } from "../../domain/entities";
import { AnimalRepository } from "../../domain/repository/animalResponsitory";

export class GetAnimalsService {
  constructor(private readonly animalRepository: AnimalRepository) {}

  async run(): Promise<AnimalResponse[]> {
    try {
      const response = await this.animalRepository.getAnimals();
      if (response) {
        return response;
      }
      return response;
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
}
