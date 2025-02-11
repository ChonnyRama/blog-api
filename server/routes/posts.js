import { Router } from 'express'
import controllers from '../controllers';
import { verifyToken } from '../controllers/sessionController';

const { postController } = controllers
const router = Router()

router.post('/new', verifyToken, postController.createPost)

export default router;