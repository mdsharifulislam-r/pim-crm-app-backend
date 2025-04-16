import express from 'express';
import { TeamController } from './team.controller';
import auth from '../../middlewares/auth';
import { USER_ROLES } from '../../../enums/user';
import validateRequest from '../../middlewares/validateRequest';
import { teamZodValidationSchema } from './team.validation';
const router = express.Router();

router.route('/')
    .post(
        auth(USER_ROLES.SUPER_ADMIN),
        validateRequest(teamZodValidationSchema),
        TeamController.addTeamMember
    )
    .get(
        auth(USER_ROLES.SUPER_ADMIN),
        TeamController.retrieveTeamMember
    );

router.route('/:id')
    .patch(
        auth(USER_ROLES.SUPER_ADMIN),
        TeamController.updateTeamMember
    )
    .delete(
        auth(USER_ROLES.SUPER_ADMIN),
        TeamController.deleteTeamMember
    );

export const TeamRoutes = router;
