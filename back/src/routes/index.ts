import { Router } from 'express';
import connect from '../controllers/socketConnectController';
import userRoutes from './userRoutes';
import roomRoutes from './roomRoutes';
import messageRoutes from './messageRoutes';
const router = Router();

router.use('/user',userRoutes)
router.use('/socket/connect', connect);
router.use('/room',roomRoutes);
router.use('/message',messageRoutes);
export default router;
