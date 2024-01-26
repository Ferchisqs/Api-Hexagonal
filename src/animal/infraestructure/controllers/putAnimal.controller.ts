import { Request, Response } from "express";
import { PutAnimalService } from "../../application/services"; 

export class PutAnimalController {
  constructor(private readonly putAnimalService: PutAnimalService) {}

  async run(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const parseId = parseInt(id);
      const animal = req.body;
      const result = await this.putAnimalService.run(animal, parseId);
      res.status(200).send(result);
    } catch (err: any) {
      return res.status(500).send(err.message);
    }
  }
}
