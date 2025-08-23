import express from 'express';
import { test,updateUserinfo } from '../controllers/user.controller.js';
import { verifyToken } from '../utilis/verifyUser.js';

const router = express.Router();

router.get('/test',test);
router.post('/update/:id',verifyToken,updateUserinfo);

export default router;