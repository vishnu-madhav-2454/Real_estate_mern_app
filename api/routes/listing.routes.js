import express from 'express';
import { createlisting } from '../controllers/listing.controller.js';


const router = express.Router();


router.post('/create',createlisting);
export default router;