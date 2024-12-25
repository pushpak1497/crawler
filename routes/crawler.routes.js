import {Router} from 'express';
import { crawlDomain } from '../controllers/crawler.controller.js';


const router = Router();

router.post('/crawl', crawlDomain);

export default router;
