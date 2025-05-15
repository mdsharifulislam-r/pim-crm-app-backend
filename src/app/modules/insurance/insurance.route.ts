import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLES } from '../../../enums/user';
import { InsuranceValidation } from './insurance.validation';
import validateRequest from '../../middlewares/validateRequest';
import { InsuranceController } from './insurance.controller';

const router = express.Router();

router.route("/")
    .post(
        auth(USER_ROLES.ADMIN,USER_ROLES.ATTORNEYS),
        validateRequest(InsuranceValidation.createInsuranceZodSchema),
        InsuranceController.createInsurance
    )
    ;

router.route("/:id")
    .patch(auth(USER_ROLES.ADMIN,USER_ROLES.ATTORNEYS), validateRequest(InsuranceValidation.updateInsuranceZodSchema), InsuranceController.updateInsurance)
    .get(auth(), InsuranceController.getAllInsurances)

export const InsuranceRoutes = router;