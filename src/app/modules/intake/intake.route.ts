import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLES } from '../../../enums/user';
import validateRequest from '../../middlewares/validateRequest';
import { IntakeValidation } from './intake.validation';
import { IntakeController } from './intake.controller';


const router = express.Router();

router.route('/')
    .post(
        auth(USER_ROLES.ADMIN,USER_ROLES.ATTORNEYS),
        validateRequest(IntakeValidation.createIntakeZodSchema),
        IntakeController.createIntake
    )
    .get(
        auth(USER_ROLES.ADMIN,USER_ROLES.ATTORNEYS),
        IntakeController.getAllIntakes
    )

export const IntakeRoutes = router;