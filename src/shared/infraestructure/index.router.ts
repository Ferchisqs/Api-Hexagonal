import { Router, Request, Response } from "express";

import animalRouter from "../../animal/infraestructure/animal.router";
import userRouter from "../../user/infraestructure/user.router";
import authRouter from "../../auth/infraestructure/auth.router";

const prefijo = "/Api";
const indexRouter = Router();

indexRouter.use(`${prefijo}/animals`, animalRouter);
indexRouter.use(`${prefijo}/users`, userRouter);
indexRouter.use(`${prefijo}/auth`, authRouter)

indexRouter.get(prefijo, (req: Request, res: Response) => {
  res.status(200).send("Hello World");
});

export default indexRouter;
