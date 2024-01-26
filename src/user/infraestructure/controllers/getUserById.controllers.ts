import { Request, Response } from "express";
import { GetUserByIdService } from "../../application/services";

export class GetUserByIdController {
  constructor(private readonly getUserByIdService: GetUserByIdService) {}

  async run(req: Request, res: Response): Promise<Response> {
    try {
      // Extrae el id de los parámetros de la solicitud
      const id = parseInt(req.params.id, 10);

      // Verifica si el id es un número válido
      if (isNaN(id)) {
        return res.status(400).json("Invalid user id");
      }

      // Llama al servicio con el id
      const user = await this.getUserByIdService.run(id);

      if (user) {
        return res.status(200).json(user);
      } else {
        return res.status(404).json("User not found");
      }
    } catch (err: any) {
      return res.status(500).send(err.message);
    }
  }
}

