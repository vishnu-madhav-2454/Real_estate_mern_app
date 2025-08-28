import express from 'express';
import { createlisting } from '../controllers/listing.controller.js';
import { getListing } from '../controllers/listing.controller.js';
import {verifyToken } from '../utilis/verifyUser.js';

const router = express.Router();


router.post('/create',createlisting);
router.get('/:id',verifyToken,getListing);
export default router;
