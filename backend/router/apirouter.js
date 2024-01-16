import { Router } from 'express'
const router = Router()
import * as controller from '../controller/apicontroller.js'
import * as studentcontroller from '../controller/studentapicontroller.js'
import * as teachercontroller from '../controller/teacherapicontroller.js'
import Auth from '../middleware/auth.js'

//removed auth middleware from all login and signup as token is received after login

//student related requests ------------------------------------------------------------ in ../controller/studentapicontroller.js
router.post('/studentsignup', studentcontroller.studentsignup)
router.post('/studentlogin', studentcontroller.studentlogin)
router.post('/getmyrequests', Auth, studentcontroller.getmyrequests)
router.post('/addrequest', Auth, studentcontroller.addrequest)
router.post('/removerequest', Auth, studentcontroller.removerequest)
router.post('/downloadrequest', Auth, studentcontroller.downloadrequest)

//teacher related requests ------------------------------------------------------------ in ../controller/teacherapicontroller.js
router.post('/teachersignup', teachercontroller.teachersignup)
router.post('/teacherlogin', teachercontroller.teacherlogin)
router.get(
  '/teachergetmyrequests',
  Auth,
  teachercontroller.teachergetmyrequests
)
router.post('/teacherapprove', Auth, teachercontroller.teacherapprove)
router.post('/uploads', teachercontroller.uploadSingle)

//testing and general / common requests ----------------------------------------------- in ../controller/apicontroller.js
router.get('/userlogout', controller.userlogout)
router.get('/current-user', Auth, controller.currentUser)

router.post('/testsignup', controller.testsignup)
router.post('/testlogin', controller.testlogin)
router.post('/testmiddleware', Auth, controller.testmiddleware)

export default router
