import Student from '../models/student.model.js'
import Teacher from '../models/teacher.model.js'
// import Request from '../models/request.model.js'
import Test from '../models/test.model.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()


export async function currentUser(req, res) {
  try {
    var user = null
    
    if (req.role === 'student') {
      user = await Student.findById(req.user._id).select('-password');
    } else if (req.role === 'teacher') {
      user = await Teacher.findById(req.user._id).select('-password');
    } else if (req.role === 'test') {
      user = await Test.findById(req.user._id).select('-password');
    }
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function userlogout(req,res){
    try{
      res.clearCookie('token') 
      res.status(200).send({ status: 'ok, user logged out' })
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

export async function testsignup(req, res) {
  try {
    console.log(req.body)
    console.log(req.body.Email)
    bcrypt.hash(req.body.Password, 10, async (err, hashedPassword) => {
      if (!err) {
        console.log(req.body.Password)
        await Test.create({
          email: req.body.Email,
          password: hashedPassword,
        })
        res.json({ status: 'ok' })
      } else {
        console.log(err)
        res.json({ status: 'error' })
      }
    })
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
}

export async function testlogin(req, res) {
  try {
    const test = await Test.findOne({
      email: req.body.Email,
    })
    if (!test) {
      res.json({ error: 'account not found' })
    } else {
      const match = await bcrypt.compare(req.body.Password, test.password)
      // console.log(match)
      if (!match) {
        // passwords do not match!
        res.json({ status: 'error' })
      } else {
        const token = jwt.sign(
          {
            id: test._id,
            role: "test",
            userdata: test,
          },
          process.env.JWT_KEY,
          { expiresIn: '24h' }
        )
        return res.cookie('token',token).status(200).send({
          status: 'ok, test logged in',
        })
      }
    }
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
}

export async function testmiddleware(req,res){
    try{
      //console.log(req.user.role.email)
      res.status(200).send({status: 'ok, middleware works!'})
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

// //template
// export async function testlogin(req,res){
//     try{

//     } catch (error) {
//         res.status(500).send({ error: error.message });
//     }
// }
