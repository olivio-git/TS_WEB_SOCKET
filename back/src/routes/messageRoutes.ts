import express from 'express';
import catchedAsync from '../utils/catchedAsync';
import { route } from './userRoutes';
import { messageSend, roomMessages } from '../controllers/messageController';

const router=express();

router.post('/',catchedAsync(messageSend));
router.get('/room/:id',catchedAsync(roomMessages));
export = router;