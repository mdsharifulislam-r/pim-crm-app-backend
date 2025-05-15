import express from 'express';
import auth from '../../../middlewares/auth';
import validateRequest from '../../../middlewares/validateRequest';
import { MessageValidation } from './message.validation';
import { MessageController } from './message.controller';
import fileUploadHandler from '../../../middlewares/fileUploaderHandler';

const router = express.Router();

router.route('/')
  .post(fileUploadHandler(),auth(),validateRequest(MessageValidation.createMessageZodSchema), MessageController.createMessage)

router.route('/:id')
  .get(auth(), MessageController.retriveMessages)


export const MessageRoutes = router;