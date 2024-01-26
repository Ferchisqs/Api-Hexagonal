import { AnimalRepository } from "../../domain/repository/animalResponsitory";
import { Animal, AnimalResponse } from "../../domain/entities";
import { validatePartialAnimal } from "../../domain/validators/animal.validator";

export class CreateAnimalService {
  constructor(private readonly animalRepository: AnimalRepository) {}

  async run(newAnimal: Animal): Promise<AnimalResponse> {
    try {
      const resultValidation = validatePartialAnimal(newAnimal);
      if (!resultValidation.success) {
        throw new Error(resultValidation.error.message);
      }

      const existingAnimal = await this.animalRepository.getAnimalById(newAnimal.id || 0);
      if (existingAnimal) {
        throw new Error("El animal ya existe");
      }

      const createdAnimal = await this.animalRepository.createAnimal(newAnimal);

      const response: AnimalResponse = {
        nombre: createdAnimal.nombre,
        temperatura: createdAnimal.temperatura,
        humedad: createdAnimal.humedad,
        movimiento: createdAnimal.movimiento,
      };

      return response;
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
}
