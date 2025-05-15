import express from 'express';
import auth from '../../../middlewares/auth';
import { USER_ROLES } from '../../../../enums/user';
import validateRequest from '../../../middlewares/validateRequest';
import { ChannelValidation } from './channel.validation';
import { ChannelController } from './channel.controller';

const router = express.Router();

router.route('/')
  .post(auth(USER_ROLES.ADMIN, USER_ROLES.ATTORNEYS), validateRequest(ChannelValidation.createChannelZodSchema), ChannelController.createChannel)
  .get(auth(), ChannelController.retrieveChannels);
  
router.route('/:id')
  .put(auth(USER_ROLES.ADMIN, USER_ROLES.ATTORNEYS), validateRequest(ChannelValidation.updateChannelZodSchema), ChannelController.updateChannel)
  .delete(auth(USER_ROLES.ADMIN, USER_ROLES.ATTORNEYS), ChannelController.deleteChannel)
  .patch(auth(USER_ROLES.ADMIN, USER_ROLES.ATTORNEYS), validateRequest(ChannelValidation.addTeamMemberZodSchema), ChannelController.addTeamMember);

export const ChannelRoutes = router;
