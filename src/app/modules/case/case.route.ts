import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLES } from '../../../enums/user';
import validateRequest from '../../middlewares/validateRequest';
import { CaseValidation } from './case.validation';
import { CaseController } from './case.controller';

const router = express.Router();

router.route('/')
.post(
    auth(USER_ROLES.ADMIN,USER_ROLES.ATTORNEYS),
    validateRequest(CaseValidation.createCaseZodSchema),
    CaseController.createCase
)
.get(
    auth(),
    CaseController.getAllCases
)

router.get("/overview",auth(),CaseController.getOverviewOfCases)
router.get('/document-preview/:id',auth(),CaseController.documentPreview)
router.route('/case/:id')
.patch(auth(USER_ROLES.ADMIN,USER_ROLES.ATTORNEYS),validateRequest(CaseValidation.updateCaseZodSchema), CaseController.updateCase)

router.route('/provider/:id')
.patch(auth(USER_ROLES.ADMIN,USER_ROLES.ATTORNEYS),validateRequest(CaseValidation.manageProvidersZodSchema),CaseController.manageProviders)
export const CaseRoutes = router;