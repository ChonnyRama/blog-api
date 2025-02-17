import { Router } from 'express'
import controllers from '../controllers';
import { verifyToken } from '../controllers/sessionController';

const { postController } = controllers
const router = Router()

router.post('/new', verifyToken, postController.createPost)
router.get('/published', postController.getAllPublished)
router.get('/all', verifyToken, postController.getAllPosts)
router.put('/toggle_publish', verifyToken, postController.updatePublished)


export default router;