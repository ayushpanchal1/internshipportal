import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export default async function Auth(req, res, next) {
  try {

    if (!req.cookies.token) {
      return res.status(401).json({ error: 'Unauthorized, no token' });
    }

    // access authorize header to validate request
    const token = req.cookies.token

    // retrive the user details fo the logged in user
    const decodedToken = await jwt.verify(token, process.env.JWT_KEY)
    //console.log("works")

    req.user = decodedToken.userdata
    req.role = decodedToken.role
    console.log(decodedToken);

    next()
  } catch (error) {
    res.status(401).json({ error: error.message })
  }
}

// export function localVariables(req, res, next) {
//   req.app.locals = {
//     OTP: null,
//     resetSession: false,
//   }
//   next()
// }