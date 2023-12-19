import { Router } from 'express'
const router = Router()
import * as controller from '../controller/apicontroller.js'
import Auth from '../middleware/auth.js'

router.post('/studentsignup', controller.studentsignup)
router.post('/studentlogin', Auth, controller.studentlogin)
router.post('/teachersignup', controller.teachersignup)
router.post('/teacherlogin', Auth, controller.teacherlogin)
router.post('/testsignup', controller.testsignup)
router.post('/testlogin', controller.testlogin)

export default router
