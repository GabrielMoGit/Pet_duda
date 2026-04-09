import { Router } from "express";
import { tutorController} from "./controller/tutorController";
import { petController } from "./controller/petController";

const router = Router();

const TutorController = new tutorController()
const PetController = new petController()

router.post("/tutor", TutorController.create)
router.post("/pet", PetController.create)

export {router};