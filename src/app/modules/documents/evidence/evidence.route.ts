import express from "express";
import { EvidenceController } from "./evidence.controller";
import { EvidenceValidation } from "./evidence.validation";
import validateRequest from "../../../middlewares/validateRequest";
import auth from "../../../middlewares/auth";
import { USER_ROLES } from "../../../../enums/user";
import fileUploadHandler from "../../../middlewares/fileUploaderHandler";
const router = express.Router();

router.route("/")
    .post(fileUploadHandler(),auth(USER_ROLES.ADMIN,USER_ROLES.ATTORNEYS),validateRequest(EvidenceValidation.createEvidenceZodSchema),EvidenceController.createEvidence)
    .get(auth(),EvidenceController.getAllEvidence)

export const EvidenceRoutes = router;