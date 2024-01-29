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
  .get("/", verifyJwt, async (req, res) => {
    try {
      const animals = await getAnimalsController.run(req, res);
      res.json(animals);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  })
  .get("/:id", verifyJwt, async (req, res) => {
    try {
      const animal = await getAnimalByIdController.run(req, res);
      res.json(animal);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  })
  .post("/", verifyJwt, async (req, res) => {
    try {
      const newAnimal = await createAnimalController.run(req, res);
      res.status(201).json(newAnimal);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  })
  .delete("/:id", verifyJwt, async (req, res) => {
    try {
      await deleteAnimalController.run(req, res);
      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  })
  .put("/:id", verifyJwt, async (req, res) => {
    try {
      const updatedAnimal = await putAnimalController.run(req, res);
      res.json(updatedAnimal);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  });

export default animalRouter;
