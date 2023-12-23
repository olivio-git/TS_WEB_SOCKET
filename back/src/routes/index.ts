import { Router } from 'express';
import connect from '../controllers/socketConnectController';

const router = Router();

router.use('/socket/connect', connect);

export default router;
