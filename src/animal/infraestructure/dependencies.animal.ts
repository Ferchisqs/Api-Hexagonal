import { animalesLocalData } from "../../shared/domain/animalData.json"
import { LocalDataRepositoryAnimal } from "./DbRepository/localData.repository";
import { MySQLRepositoryAnimal } from "./DbRepository/mysql.repository";
import {
  GetAnimalsService,
  GetAnimalByIdService,
  CreateAnimalService,
  DeleteAnimalService,
  PutAnimalService, 
} from "../application/services";
import {
  CreateAnimalController,
  DeleteAnimalController,
  GetAnimalByIdController,
  GetAnimalsController,
  PutAnimalController,  
} from "./controllers";

const localDataRepository = new LocalDataRepositoryAnimal(animalesLocalData);
const mysqlRepository = new MySQLRepositoryAnimal();

const getAnimalsService = new GetAnimalsService(mysqlRepository);
const getAnimalByIdService = new GetAnimalByIdService(mysqlRepository);
const createAnimalService = new CreateAnimalService(mysqlRepository);
const deleteAnimalService = new DeleteAnimalService(localDataRepository);
const putAnimalService = new PutAnimalService(localDataRepository);  

export const getAnimalsController = new GetAnimalsController(getAnimalsService);
export const getAnimalByIdController = new GetAnimalByIdController(getAnimalByIdService);
export const createAnimalController = new CreateAnimalController(createAnimalService);
export const deleteAnimalController = new DeleteAnimalController(deleteAnimalService);
export const putAnimalController = new PutAnimalController(putAnimalService); 