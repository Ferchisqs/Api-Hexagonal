import { Request, Response } from "express";
import { DeleteUserByIdService } from "../../application/services";

export class DeleteUserByIdController {
  constructor(private readonly deleteUserService: DeleteUserByIdService) {}

  async run(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const handleError = await this.deleteUserService.run(parseInt(id, 10));
      if (handleError) {
        return res.status(200).json("Delete successfully");
      } else {
        return res.status(404).json("There was an error deleting the user");
      }
    } catch (err: any) {
      return res.status(500).send(err.message);
    }
  }
}
