import { Request, Response } from "express";
import { DeleteAnimalService } from "../../application/services"; // Ajusta la ruta según la ubicación real de tus servicios

export class DeleteAnimalController {
  constructor(private deleteAnimalService: DeleteAnimalService) {}

  async run(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const parseId = parseInt(id);
      const handleError = await this.deleteAnimalService.run(parseId);
      if (handleError === true) {
        return res.status(200).json("Delete successfully");
      }
      return res.status(404).json("There was an error deleting the animal");
    } catch (err: any) {
      return res.status(500).send(err.message);
    }
  }
}
