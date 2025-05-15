import express from "express";
import auth from "../../../middlewares/auth";
import { USER_ROLES } from "../../../../enums/user";
import validateRequest from "../../../middlewares/validateRequest";
import { ProviderValidation } from "./provider.validation";
import { ProviderController } from "./provider.controller";
import { MedicalValidation } from "./medical_bill/medical_bill.validation";
import { MedicalBillController } from "./medical_bill/medical_bill.controller";
import fileUploadHandler from "../../../middlewares/fileUploaderHandler";
import { DamageValidation } from "./damages/damage.validation";
import { DamagesController } from "./damages/damage.controller";

const router = express.Router();

router
  .route("/")
  .post(
    auth(USER_ROLES.ADMIN, USER_ROLES.ATTORNEYS),
    validateRequest(ProviderValidation.createMedicalProviderZodSchema),
    ProviderController.createProvider
  )
  .get(auth(), ProviderController.getProviders);

router
  .route("/bill")
  .post(
    auth(USER_ROLES.ADMIN, USER_ROLES.ATTORNEYS),
    fileUploadHandler(),
    validateRequest(MedicalValidation.createMedicalZodSchema),
    MedicalBillController.createMedicalBill
  );
router
  .route("/record")
  .post(
    auth(USER_ROLES.ADMIN, USER_ROLES.ATTORNEYS),
    fileUploadHandler(),
    validateRequest(MedicalValidation.createMedicalRecordZodSchema),
    MedicalBillController.createMedicalBill
  );

router
  .route("/bill/:id")
  .delete(
    auth(USER_ROLES.ADMIN, USER_ROLES.ATTORNEYS),
    MedicalBillController.deleteMedicalBill
  );

router.route("/:id")
  .patch(
    auth(USER_ROLES.ADMIN, USER_ROLES.ATTORNEYS),
    validateRequest(ProviderValidation.updateMedicalProviderZodSchema),
    ProviderController.updateProvider
  )

router.route('/damage')
  .post(
    auth(USER_ROLES.ADMIN, USER_ROLES.ATTORNEYS),
    fileUploadHandler(),
    validateRequest(DamageValidation.createDamageZodSchema),
    DamagesController.createDamage
  )

export const ProviderRoutes = router;
