import { Router } from 'express';
import { authenticate, requireSuperAdmin } from '../../middleware/auth.middleware.js';
import * as dbController from './db.controller.js';

const router = Router();

router.use(authenticate, requireSuperAdmin);

router.get('/tables', dbController.getTables);
router.get('/tables/:table/data', dbController.getTableData);
router.post('/tables/:table/data', dbController.createTableRow);
router.patch('/tables/:table/data/:id', dbController.updateTableRow);
router.delete('/tables/:table/data/:id', dbController.deleteTableRow);

export default router;
