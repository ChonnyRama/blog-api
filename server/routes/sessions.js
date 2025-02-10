import { Router } from 'express'
import controllers from '../controllers';

const {sessionController} = controllers
const router = Router()

router.post('/login', sessionController.login)
// router.post('/logout', sessionController.logout)

export default router;