import { Router } from 'express'
import controllers from '../controllers';

const {sessionController} = controllers
const router = Router()

router.post('/login', sessionController.login)
// router.post('/logout', sessionController.logout)
router.get('/verify', sessionController.verifyToken, (req, res) => {
  res.status(200).json({message: 'Token is valid', user: req.user})
})

router.post('/logout', sessionController.logout)

export default router;