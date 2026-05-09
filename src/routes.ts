import { Router } from "express";
import { TutorController} from "./controller/tutorController";
import { PetController } from "./controller/petController";
import { StreetController } from "./controller/streetController";
import { NeighborhoodController } from "./controller/neighberhoodController";
import { AddressController } from "./controller/addressController";
import { ServicePackageController } from "./controller/servicePackageController";
import { ServiceController } from "./controller/serviceController";

const router = Router();

const tutorController = new TutorController()
const petController = new PetController()
const streetController = new StreetController()
const neighberhoodController = new NeighborhoodController()
const addressController = new AddressController()
const servicePackageController = new ServicePackageController()
const serviceController = new ServiceController()

router.post("/tutor", tutorController.create)

router.post("/pet", petController.create)

router.post("/street", streetController.create)
router.get("/listStreets", streetController.listStreets)

router.post("/neighborhood", neighberhoodController.create)
router.get("/listNeighborhood", neighberhoodController.listNeighborhoods)

router.post("/address", addressController.create)

router.post("/servicePackage", servicePackageController.create)
router.get("/listPackages", servicePackageController.listPackages)
router.patch("/payPackage", servicePackageController.turnPackagesToPaidStatus)




//test route
router.patch('/test', servicePackageController
      .turnPackagesToDoneStatusAndCreateNewPackage
      .bind(servicePackageController))



export {router};