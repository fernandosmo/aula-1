import { Router } from 'express';
import healthRouter from './health.router';
import productRouter from './products.router';

const router = Router();

router.use('/health', healthRouter)
router.use('/products', productRouter)

export default router;