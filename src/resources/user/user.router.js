import { Router } from 'express';
import { catchErrors } from '../../utils/errorHandler';
import controllers from './user.controller';
import { tokenVerify, adminRoleVerify } from '../../middlewares/auth';

const router = Router();

// api/user
router
  .route('/')
  .post(catchErrors(controllers.createOneUser))
  .all([tokenVerify, adminRoleVerify])
  .get(catchErrors(controllers.getMany));

// api/user/:id
router
  .route('/:id')
  .all([tokenVerify, adminRoleVerify])
  .get(catchErrors(controllers.getOne))
  .post(catchErrors(controllers.updateOne))
  .delete(catchErrors(controllers.removeOne));

export default router;
