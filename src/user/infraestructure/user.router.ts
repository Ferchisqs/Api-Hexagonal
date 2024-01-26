import { Router } from "express";
import {
  deleteUserByIdController,
  getAllUsersController,
  getUserByIdController,
  updateUserByIdController,
} from "./DbRepository/dependencies.user";
import { verifyJwt } from "../../auth/application/middlewares/jwt.middleware";

const userRouter = Router();

userRouter
  .get("/", verifyJwt, getAllUsersController.run.bind(getAllUsersController))
  .get(
    "/:id", 
    verifyJwt,
    getUserByIdController.run.bind(getUserByIdController)
  )
  .delete(
    "/:id", 
    verifyJwt,
    deleteUserByIdController.run.bind(deleteUserByIdController)
  )
  .put(
    "/:id", 
    verifyJwt,
    updateUserByIdController.run.bind(updateUserByIdController)
  );

export default userRouter;
