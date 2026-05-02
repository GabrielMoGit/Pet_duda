import { Router } from "express";
import { TutorController} from "./controller/tutorController";
import { PetController } from "./controller/petController";
import { StreetController } from "./controller/streetController";
import { NeighborhoodController } from "./controller/neighberhoodController";
import { AddressController } from "./controller/addressController";
import { ServicePackageController } from "./controller/servicePackageController";

const router = Router();

const tutorController = new TutorController()
const petController = new PetController()
const streetController = new StreetController()
const neighberhoodController = new NeighborhoodController()
const addressController = new AddressController()
const servicePackageController = new ServicePackageController()

router.post("/tutor", tutorController.create)

router.post("/pet", petController.create)

router.post("/street", streetController.create)
router.get("/listStreets", streetController.listStreets)

router.post("/neighborhood", neighberhoodController.create)
router.get("/listNeighborhood", neighberhoodController.listNeighborhoods)

router.post("/address", addressController.create)

router.post("/servicePackage", servicePackageController.create)
router.get("/listPackages", servicePackageController.listPackages)



export {router};