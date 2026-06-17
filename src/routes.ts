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
router.get("/loadTutorData", tutorController.returnTutorDataFromPhone)
router.patch("/AlterTutorData", tutorController.alterTutorData)

router.post("/pet", petController.create)
router.get("/listPetsAndRespectiveTutors", petController.listAllPetsAndRespectiveTutors)
router.get('/listPetsForTutor', petController.listExistentPetsForTutor)

router.post("/street", streetController.create)
router.get("/listStreets", streetController.listStreets)

router.post("/neighborhood", neighberhoodController.create)
router.get("/listNeighborhood", neighberhoodController.listNeighborhoods)

router.post("/address", addressController.create)

router.post("/createService", serviceController.createIndependentService.bind(serviceController))

router.post("/servicePackage", servicePackageController.userResponse.bind(servicePackageController))
router.get("/listPackages", servicePackageController.listPackages)
router.patch("/payPackage", servicePackageController.turnPackagesToPaidStatus)
router.get("/returnPackage", servicePackageController.returnExistentPackageForPetid)
router.patch("/updatePackage", servicePackageController.updateServicePackage)
router.delete('/deleteService', servicePackageController.cancelPackage)




//test route
router.post('/test', petController.create)



export {router};