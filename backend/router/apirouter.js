import { Router } from 'express';
const router = Router();
import * as controller from '../controller/apicontroller.js';
import {Auth} from '../middleware/auth.js';

// removed auth middleware from all login and signup as the token is received after login
router.post('/studentsignup', controller.studentsignup);  
router.post('/studentlogin', controller.studentlogin);   
router.post('/teachersignup', controller.teachersignup);  
router.post('/teacherlogin', controller.teacherlogin);
router.post('/testsignup', controller.testsignup);
router.post('/testlogin', controller.testlogin);
router.get('/current-user', Auth, controller.currentUser);
router.get('/getmyrequests', Auth, controller.getmyrequests)
// router.post('/addrequest', Auth, controller.addrequest);

// Logout route
router.get('/userlogout',controller.userlogout)

export default router;
