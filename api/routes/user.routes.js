import express from 'express';
import { test,updateUserinfo,deleteUser } from '../controllers/user.controller.js';
import { verifyToken } from '../utilis/verifyUser.js';

const router = express.Router();

router.get('/test',test);
router.post('/update/:id',verifyToken,updateUserinfo);
router.delete('/delete/:id',verifyToken,deleteUser);

export default router;