import express from 'express';
import { USER_ROLES } from '../../../enums/user';
import { UserController } from './user.controller';
import auth from '../../middlewares/auth';
import fileUploadHandler from '../../middlewares/fileUploaderHandler';
const router = express.Router();


router.route('/')
    .get(
        auth(),
        UserController.getUserProfile
    )
    .patch(
        auth(),
        fileUploadHandler(),
        UserController.updateProfile
    );

export const UserRoutes = router;