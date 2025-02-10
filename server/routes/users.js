import { Router } from 'express'
import controllers from '../controllers';

const {userController} = controllers
const router = Router()

router.get('/test', userController.test)
router.post('/create', userController.createUser)

export default router;