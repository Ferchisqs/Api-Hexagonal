import { Request, Response } from "express";
import { CreateAnimalService } from "../../application/services/createAnimal.service";

export class CreateAnimalController {
  constructor(private readonly createAnimalService: CreateAnimalService) {}

  async run(req: Request, res: Response) {
    try {
      const animal = req.body;
      const result = await this.createAnimalService.run(animal);

      if (result === null) {
        return res.status(500).json({ error: "Error al crear el animal" });
      }

      res.status(201).json(result);
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  }
}
