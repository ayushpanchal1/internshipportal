import { Router } from 'express'
const router = Router()
import * as controller from '../controller/apicontroller.js'
import Auth from '../middleware/auth.js'

//removed auth middleware from all login and signup as token is received after login
router.get('/current-user', Auth, controller.currentUser);
router.post('/studentsignup', controller.studentsignup)  
router.post('/studentlogin', controller.studentlogin)   
router.post('/teachersignup', controller.teachersignup)  
router.post('/teacherlogin', controller.teacherlogin)
router.get('/userlogout', controller.userlogout)
router.post('/getmyrequests', Auth, controller.getmyrequests)
router.post('/addrequest', Auth, controller.addrequest)

//test
router.post('/testsignup', controller.testsignup)
router.post('/testlogin', controller.testlogin)
router.post('/testmiddleware', Auth, controller.testmiddleware)

export default router
