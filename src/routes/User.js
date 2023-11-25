import express from 'express'
import userController from '../controller/User.js';

const router = express.Router()
router.post('/',userController.create)
router.post('/login',userController.login)

export default router