import express from 'express';
import { ClientController } from './client.controller';
import { USER_ROLES } from '../../../enums/user';
import auth from '../../middlewares/auth';

const router = express.Router();

router.route('/')
    .post(
        auth(USER_ROLES.USER),
        ClientController.createClient
    )
    .get(
        auth(USER_ROLES.USER),
        ClientController.retrieveClients
    );


router.delete("/:id",
    auth(USER_ROLES.USER),
    ClientController.deleteClient
)
export const ClientRoutes = router;
