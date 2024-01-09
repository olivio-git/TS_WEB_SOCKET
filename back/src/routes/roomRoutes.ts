import express from 'express';
import  catchedAsync from '../utils/catchedAsync';
import { getRoomMessageController, getRoomsController, postRoomController } from '../controllers/roomController';



const router = express();
router.post('/',catchedAsync(postRoomController));
router.get('/',catchedAsync(getRoomsController));
router.get('/messages/:id',catchedAsync(getRoomMessageController));

export = router;