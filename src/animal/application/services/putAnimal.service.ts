import { AnimalRepository } from "../../domain/repository/animalResponsitory";
import { Animal, AnimalResponse } from "../../domain/entities";
import { validatePartialAnimal } from "../../domain/validators/animal.validator";

export class PutAnimalService {
  constructor(private readonly animalRepository: AnimalRepository) {}

  async run(animal: Animal, animalId: number): Promise<AnimalResponse | null> {
    try {
      const resultValidation = validatePartialAnimal(animal);
      if (!resultValidation.success) {
        throw new Error(resultValidation.error.message);
      }

      const originalAnimal = await this.animalRepository.getAnimalById(animalId);
      if (!(animal.nombre && animal.temperatura && animal.humedad && originalAnimal)) {
        throw new Error("Animal not found");
      }

      const updatedAnimal = await this.animalRepository.updateAnimal(animalId, animal);

      if (!updatedAnimal) {
        return null;  
      }

      
      const response: AnimalResponse = {
        nombre: updatedAnimal.nombre,
        temperatura: updatedAnimal.temperatura,
        humedad: updatedAnimal.humedad,
        movimiento: updatedAnimal.movimiento,
      };

      return response;
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
}
