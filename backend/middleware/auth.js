import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export async function Auth(req, res, next) {
  try {

    if (!req.cookies.token) {
      return res.status(401).json({ error: 'Unauthorized, no token' });
    }
  const token = req.cookies.token;
  const decodedToken = await jwt.verify(token, process.env.JWT_KEY)

  req.user = decodedToken.userdata
  req.role = decodedToken.role
  // console.log(decodedToken);ttach decoded token payload to the request object
    next();
  } catch(error){
console.log(error)
  }
  
}
// export function localVariables(req, res, next) {
//   req.app.locals = {
//     OTP: null,
//     resetSession: false,
//   }
//   next()
// }
