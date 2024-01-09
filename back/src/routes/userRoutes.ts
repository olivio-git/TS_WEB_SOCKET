import express from 'express';
import  catchedAsync from '../utils/catchedAsync';
import { getUserController, loginUserVerify, postUserController, protectedRoutesToken, validateSecion } from '../controllers/userController';

const router = express();

router.get('/',catchedAsync(getUserController));
router.post('/',catchedAsync(postUserController));
router.post('/auth/login',catchedAsync(loginUserVerify)); 
router.post('/auth/token',catchedAsync(protectedRoutesToken));
router.post('/auth/validate',catchedAsync(validateSecion));
export = router;