import { AnimalResponse, Animal } from "../entities";

export function getAnimalByIdDto(animal: Animal): AnimalResponse {
  return {
    nombre: animal.nombre || "",
    temperatura: animal.temperatura || 0,
    humedad: animal.humedad || 0,
    movimiento: animal.movimiento || false,
  };
}
