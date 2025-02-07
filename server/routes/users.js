import { Router } from 'express'
import controllers from '../controllers';

const {userController} = controllers
const router = Router()

router.get('/test', userController.test)

export default router;