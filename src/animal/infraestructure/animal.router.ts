import { Router } from "express";
import {
  getAnimalsController,
  getAnimalByIdController,
  createAnimalController,
  deleteAnimalController,
  putAnimalController,
} from "./dependencies.animal";
import { verifyJwt } from "../../auth/application/middlewares/jwt.middleware";

const animalRouter = Router();

animalRouter
  .get("/", verifyJwt, getAnimalsController.run.bind(getAnimalsController))
  .get("/:id", verifyJwt, getAnimalByIdController.run.bind(getAnimalByIdController))
  .post("/", verifyJwt, createAnimalController.run.bind(createAnimalController))
  .delete("/:id", deleteAnimalController.run.bind(deleteAnimalController))
  .put("/:id", putAnimalController.run.bind(putAnimalController));

export default animalRouter;
