import express from 'express';
import { createlisting } from '../controllers/listing.controller.js';
import { getListing } from '../controllers/listing.controller.js';
import {verifyToken } from '../utilis/verifyUser.js';
import { deleteListing } from '../controllers/listing.controller.js';
import { editListing } from '../controllers/listing.controller.js';
const router = express.Router();


router.post('/create',createlisting);
router.get('/:id',getListing);
router.delete('/delete/:id',verifyToken,deleteListing);
router.post('/edit/:id',verifyToken,editListing);
export default router;
