import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLES } from '../../../enums/user';
import validateRequest from '../../middlewares/validateRequest';
import { SattlementValidation } from './sattalement.validation';
import { SattlementController } from './sattlement.controller';

const router = express.Router();

router.route("/recovery")
  .post(auth(USER_ROLES.ADMIN,USER_ROLES.ATTORNEYS),validateRequest(SattlementValidation.createRecoveryZodSchema), SattlementController.createRecovery)
  .get(auth(),SattlementController.getAllRecoverys)

router.route("/recovery/:id")
  .patch(auth(USER_ROLES.ADMIN,USER_ROLES.ATTORNEYS), SattlementController.updateRecovery)
  .delete(auth(USER_ROLES.ADMIN,USER_ROLES.ATTORNEYS), SattlementController.deleteRecovery)

router.route("/legal-fee")
  .post(auth(USER_ROLES.ADMIN,USER_ROLES.ATTORNEYS),validateRequest(SattlementValidation.createLegalFeeZodSchema), SattlementController.createLegalFee)
  .get(auth(),SattlementController.getAllLegalFees)


router.route("/legal-fee/:id")
  .patch(auth(USER_ROLES.ADMIN,USER_ROLES.ATTORNEYS), SattlementController.updateLegalFee)
  .delete(auth(USER_ROLES.ADMIN,USER_ROLES.ATTORNEYS), SattlementController.deleteLegalFee)

router.route("/expense")
  .get(auth(),SattlementController.getTotalExpensesAndMedicalBills)

router.route("/overview")
  .get(auth(),SattlementController.overview)


export const SattlementRoutes = router;
