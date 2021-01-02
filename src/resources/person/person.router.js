import { Router } from 'express';
import { catchErrors } from '../../utils/errorHandler';
import controllers from './person.controllers';
import { tokenVerify } from '../../middlewares/auth';

const router = Router();

// api/person
router
  .route('/')
  .get(catchErrors(controllers.getMany))
  .all(tokenVerify)
  .post(catchErrors(controllers.createOne));

// api/person/:id
router
  .route('/:id')
  .get(catchErrors(controllers.getOne))
  .all(tokenVerify)
  .post(catchErrors(controllers.updateOne))
  .delete(catchErrors(controllers.removeOne));

export default router;
