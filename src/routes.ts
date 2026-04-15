import { Router } from "express";
import { tutorController} from "./controller/tutorController";
import { petController } from "./controller/petController";
import { streetController } from "./controller/streetController";

const router = Router();

const TutorController = new tutorController()
const PetController = new petController()
const StreetController = new streetController()

router.post("/tutor", TutorController.create)
router.post("/pet", PetController.create)
router.post("/street", StreetController.create)
router.get("/listStreets", StreetController.listStreets)

export {router};