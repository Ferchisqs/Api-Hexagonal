import z from "zod";

export interface Animal {
  id?: number;
  nombre: string;
  temperatura: number;
  humedad: number;
  movimiento: boolean;
}

export class Animal implements Animal {
  constructor(
    public nombre: string,
    public temperatura: number,
    public humedad: number,
    public movimiento: boolean
  ) {}
}

const animalSchema = z.object({
  id: z.number().optional(),
  nombre: z.string().min(1),
  temperatura: z.number(),
  humedad: z.number(),
  movimiento: z.boolean(),
});

export const validateAnimal = (animal: Animal) => {
  return animalSchema.safeParse(animal);
};

export const validatePartialAnimal = (animal: Animal) => {
  return animalSchema.partial().safeParse(animal);
};
