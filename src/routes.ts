import { Router } from "express";
import { tutorController} from "./controller/tutorController";
import { petController } from "./controller/petController";
import { streetController } from "./controller/streetController";
import { NeighborhoodController } from "./controller/neighberhoodController";
import { AddressController } from "./controller/addressController";

const router = Router();

const TutorController = new tutorController()
const PetController = new petController()
const StreetController = new streetController()
const neighberhoodController = new NeighborhoodController()
const addressController = new AddressController()

router.post("/tutor", TutorController.create)

router.post("/pet", PetController.create)

router.post("/street", StreetController.create)
router.get("/listStreets", StreetController.listStreets)

router.post("/neighborhood", neighberhoodController.create)
router.get("/listNeighborhood", neighberhoodController.listNeighborhoods)

router.post("/address", addressController.create)



export {router};