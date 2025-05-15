import express from "express";
import { MedicalBillController } from "./medical_bill.controller";
import auth from "../../../../middlewares/auth";
import { USER_ROLES } from "../../../../../enums/user";

const router = express.Router();

router.route("/:id")
    .get(
        auth(),
        MedicalBillController.getAllMedicalRecordsOfCase)
    .delete(
            auth(USER_ROLES.ADMIN,USER_ROLES.ATTORNEYS),
            MedicalBillController.deleteMedicalBill)


export const MedicalBillRoute = router;
            