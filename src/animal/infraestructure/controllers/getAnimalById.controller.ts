import { Request, Response } from "express";
import { GetAnimalByIdService } from "../../application/services"; 

export class GetAnimalByIdController {
  constructor(private readonly getAnimalByIdService: GetAnimalByIdService) {}

  async run(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const parseId = parseInt(id);
      const result = await this.getAnimalByIdService.run(parseId);
      res.status(200).send(result);
    } catch (err: any) {
      return res.status(500).send(err.message);
    }
  }
}
