import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLES } from '../../../enums/user';
import { PersonalInfoController } from './personal_info.controller';
import validateRequest from '../../middlewares/validateRequest';
import { PersonalInfoValidation } from './personal_info.validation';

const router = express.Router();

router.post('/',auth(USER_ROLES.ADMIN,USER_ROLES.ATTORNEYS),validateRequest(PersonalInfoValidation.createPersonalInfoZodSchema),PersonalInfoController.createPersonalInfo)

router
.route("/:id")
.get(auth(USER_ROLES.ADMIN,USER_ROLES.ATTORNEYS),PersonalInfoController.getPersonalInfo)
.patch(auth(USER_ROLES.ADMIN,USER_ROLES.ATTORNEYS),validateRequest(PersonalInfoValidation.updatePersonalInfoZodSchema),PersonalInfoController.updatePersonalInfo)

export const PersonalInfoRoutes=router;