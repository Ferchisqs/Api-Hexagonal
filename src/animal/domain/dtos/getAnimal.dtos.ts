import { Animal, AnimalResponse } from "../entities";
import { getAnimalByIdDto } from "./getAnimalById.dto";

export function getAnimalsDto(animals: Animal[]): AnimalResponse[] {
  const formattedAnimals: AnimalResponse[] = [];
  animals.forEach((animal) => {
    formattedAnimals.push(getAnimalByIdDto(animal));
  });
  return formattedAnimals;
}
