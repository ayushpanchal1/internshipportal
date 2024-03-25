import { Router } from 'express'
const router = Router()
import * as controller from '../controller/apicontroller.js'
import * as studentcontroller from '../controller/studentapicontroller.js'
import * as teachercontroller from '../controller/teacherapicontroller.js'
import { generateOtp } from '../otpGenerator.js'
import Auth from '../middleware/auth.js'

//removed auth middleware from all login and signup as token is received after login

//student related requests ------------------------------------------------------------ in ../controller/studentapicontroller.js
router.post('/studentsignup', studentcontroller.studentsignup)  
router.post('/studentlogin', studentcontroller.studentlogin)
router.get('/studentgetmyinterns', Auth, studentcontroller.studentgetmyinterns)
router.post('/studentsubcompintern', Auth, studentcontroller.studentsubcompintern)
router.post('/studentdelmyinterns', Auth, studentcontroller.studentdelmyinterns)
router.post('/studentgetmyrequests', Auth, studentcontroller.studentgetmyrequests)
router.post('/studentaddrequest', Auth, studentcontroller.studentaddrequest)
router.post('/studentremoverequest', Auth, studentcontroller.studentremoverequest)

//teacher related requests ------------------------------------------------------------ in ../controller/teacherapicontroller.js
router.post('/teachersignup', teachercontroller.teachersignup)  
router.post('/teacherlogin', teachercontroller.teacherlogin)
router.get('/teachergetmyrequests', Auth, teachercontroller.teachergetmyrequests)
router.post('/teacherapproverequest', Auth, teachercontroller.teacherapproverequest)
router.get('/teachergetmyannouncements', Auth, teachercontroller.teachergetmyAnnouncements)
router.post('/teacherpostannouncement', Auth, teachercontroller.teacherpostAnnouncement)
router.post('/teacherfetchstudents', Auth, teachercontroller.teacherfetchstudents)
router.post('/teacherfetchastudent', Auth, teachercontroller.teacherfetchastudent)
router.post('/teacherdelmyannouncements', Auth, teachercontroller.teacherdelmyAnnouncements)
router.post('/teacherdeclinerequest', Auth, teachercontroller.teacherdeclinerequest)
router.post('/teacheruploadsign', Auth, teachercontroller.teacherUploadSign)

//testing and general / common requests ----------------------------------------------- in ../controller/apicontroller.js
router.get('/userlogout', controller.userlogout)
router.get('/current-user', Auth, controller.currentUser)
router.post('/generateotp', generateOtp)
router.get('/getannouncements', Auth, controller.getAnnouncements)
router.post('/downloadrequest', Auth, controller.downloadrequest)
router.post('/uploadprofilepicture', Auth, controller.uploadProfilePicture)
router.get('/deleteprofilepicture', Auth, controller.deleteProfilePicture)
router.get('/fetchprofilepicture/:userId', Auth, controller.fetchProfilePicture)

router.post('/testsignup', controller.testsignup)
router.post('/testlogin', controller.testlogin)
router.post('/testmiddleware', Auth, controller.testmiddleware)

export default router
