import { AnimalRepository } from "../../domain/repository/animalResponsitory";
import { AnimalResponse } from "../../domain/entities";

export class GetAnimalByIdService {
  constructor(private readonly animalRepository: AnimalRepository) {}

  async run(animalId: number): Promise<AnimalResponse> {
    try {
      const response = await this.animalRepository.getAnimalById(animalId);
      if (response) {
     
        return response;
      }
      return {} as AnimalResponse;
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
}
