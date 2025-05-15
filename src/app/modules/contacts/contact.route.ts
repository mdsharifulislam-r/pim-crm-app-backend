import express from 'express';
import { ClientController } from './contact.controller';
import { USER_ROLES } from '../../../enums/user';
import auth from '../../middlewares/auth';
import fileUploadHandler from '../../middlewares/fileUploaderHandler';

const router = express.Router();

router.route('/')
    .post(
        auth(USER_ROLES.ADMIN,USER_ROLES.ATTORNEYS),
        fileUploadHandler('profile'),
        ClientController.createClient
    )
    .get(
        auth(),
        ClientController.retrieveClients
    );


router.route('/:id')
.delete(
    auth(USER_ROLES.ADMIN,USER_ROLES.ATTORNEYS),
    ClientController.deleteClient
)
.get(
    auth(),
    ClientController.getClient
)
export const ContactRoutes = router;
