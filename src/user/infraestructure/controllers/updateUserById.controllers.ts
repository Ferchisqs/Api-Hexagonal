import { Request, Response } from "express";
import { UpdateUserByIdService } from "../../application/services";
import { validateUser } from "../../domain/validators/user.validator";

export class UpdateUserByIdController {
  constructor(private readonly updateUserByIdService: UpdateUserByIdService) {}

  async run(req: Request, res: Response): Promise<Response> {
    const userId: number = parseInt(req.params.id, 10); 
    const updatedUser = req.body; 

    try {
      const resultValidation = validateUser(updatedUser);
      if (resultValidation.success) {
        const updatedUserResult = await this.updateUserByIdService.run(
          updatedUser,
          userId
        );

        return res.status(200).json({ data: updatedUserResult });
      } else {
        return res.status(400).json({ error: resultValidation.error.message });
      }
    } catch (error: any) {
      console.error(error); 
      return res.status(500).json({ error: error.message });
    }
  }
}
