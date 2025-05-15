import express from 'express';
import { TeamController } from './team.controller';
import auth from '../../middlewares/auth';
import { USER_ROLES } from '../../../enums/user';
import validateRequest from '../../middlewares/validateRequest';
import { TeamValidation } from './team.validation';
import fileUploadHandler from '../../middlewares/fileUploaderHandler';
const router = express.Router();

router.route('/')
    .post(
        auth(USER_ROLES.ADMIN,USER_ROLES.ATTORNEYS),
        validateRequest(TeamValidation.teamZodValidationSchema),
        TeamController.addTeamMember
    )
    .get(
        auth(),
        TeamController.getTeams
    );

router.route('/:id')
    .patch(
        auth(USER_ROLES.ADMIN,USER_ROLES.ADMIN),
        TeamController.updateTeamMember
    )
    .delete(
        auth(USER_ROLES.ADMIN,USER_ROLES.ATTORNEYS),
        TeamController.deleteTeamMember
    )
    .get(
        auth(),
        TeamController.retrieveTeamMember
    )



export const TeamRoutes = router;
