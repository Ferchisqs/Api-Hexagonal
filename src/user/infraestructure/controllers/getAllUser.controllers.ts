import { Request, Response } from "express";
import { GetAllUsersService } from "../../application/services";

export class GetAllUsersController {
  constructor(private readonly getAllUsersService: GetAllUsersService) {}

  async run(_req: Request, res: Response): Promise<Response> {
    try {
      const result = await this.getAllUsersService.run();

      if (result.length > 0) {
        return res.status(200).json(result);
      } else {
        return res.status(404).json("No users found");
      }
    } catch (err: any) {
      return res.status(500).send(err.message);
    }
  }
}
