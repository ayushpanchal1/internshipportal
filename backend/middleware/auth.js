import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export async function Auth(req, res, next) {
  try {
<<<<<<< HEAD
=======

    if (!req.cookies.token) {
      return res.status(401).json({ error: 'Unauthorized, no token' });
    }
    
    // access authorize header to validate request
    const token = req.cookies.token
>>>>>>> origin/backendDev2

    if (!req.cookies.token) {
      return res.status(401).json({ error: 'Unauthorized, no token' });
    }
  const token = req.cookies.token;
  const decodedToken = await jwt.verify(token, process.env.JWT_KEY)

<<<<<<< HEAD
  req.user = decodedToken.userdata
  req.role = decodedToken.role
  // console.log(decodedToken);ttach decoded token payload to the request object
    next();
  } catch(error){
console.log(error)
=======
    req.user = decodedToken.userdata
    req.role = decodedToken.role
    // console.log(decodedToken);

    next()
  } catch (error) {
    res.status(401).json({ error: error.message })
>>>>>>> origin/backendDev2
  }
  
}
// export function localVariables(req, res, next) {
//   req.app.locals = {
//     OTP: null,
//     resetSession: false,
//   }
//   next()
// }
