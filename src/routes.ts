import { Router } from "express";
import { tutorController} from "./controller/tutorController";

const router = Router();

const TutorController = new tutorController();

router.post("/tutor", TutorController.create)

export {router};