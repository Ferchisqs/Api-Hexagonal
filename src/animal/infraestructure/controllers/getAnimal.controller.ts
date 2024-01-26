import { Request, Response } from "express";
import { GetAnimalsService } from "../../application/services"; // Ajusta la ruta según la ubicación real de tus servicios

export class GetAnimalsController {
  constructor(private readonly getAnimalsService: GetAnimalsService) {}

  async run(req: Request, res: Response) {
    try {
      const result = await this.getAnimalsService.run();
      res.status(200).send(result);
    } catch (err: any) {
      return res.status(500).send(err.message);
    }
  }
}
