import { Router } from 'express';
import { compileNaturalLanguage } from '../controllers/nlCompileController';

const router = Router();

router.post('/compile-nl', compileNaturalLanguage);

export default router;