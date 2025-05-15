import express from 'express';
import { NoteController } from './note.controller';
import auth from '../../middlewares/auth';
import { USER_ROLES } from '../../../enums/user';
import validateRequest from '../../middlewares/validateRequest';
import { NoteValidation } from './note.validation';
const router = express.Router();
router.route('/')
    .post(auth(), validateRequest(NoteValidation.createNoteZodSchema), NoteController.createNote)
    .get(auth(), NoteController.retrieveNotes);


export const NoteRoutes = router;