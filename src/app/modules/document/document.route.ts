import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLES } from '../../../enums/user';
import fileUploadHandler from '../../middlewares/fileUploaderHandler';
import validateRequest from '../../middlewares/validateRequest';
import { DocumentValidation } from './document.validation';
import { DocumentController } from './document.controller';

const router = express.Router();

router.route('/')
.post(
    auth(USER_ROLES.ADMIN,USER_ROLES.ATTORNEYS,USER_ROLES.INTAKE),
    fileUploadHandler(),
    validateRequest(DocumentValidation.createDocumentZodSchema),
    DocumentController.uploadDocument
).get(
    auth(),
    DocumentController.getAllDocuments
)

router.route('/:id')
.get(auth(),DocumentController.getSingleDocument)
.delete(
    auth(USER_ROLES.ADMIN,USER_ROLES.ATTORNEYS),
    DocumentController.deleteDocument
)

export const DocumentRoutes = router;