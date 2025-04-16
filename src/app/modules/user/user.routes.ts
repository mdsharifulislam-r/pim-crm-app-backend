import express from 'express';
import { USER_ROLES } from '../../../enums/user';
import { UserController } from './user.controller';
import auth from '../../middlewares/auth';
import fileUploadHandler from '../../middlewares/fileUploaderHandler';
const router = express.Router();


router.route('/')
    .get(
        auth(USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN, USER_ROLES.TEAM),
        UserController.getUserProfile
    )
    .patch(
        auth(USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN, USER_ROLES.TEAM),
        fileUploadHandler(),
        UserController.updateProfile
    );

export const UserRoutes = router;