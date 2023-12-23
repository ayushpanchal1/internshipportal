

import Student from '../models/student.model.js'
import Teacher from '../models/teacher.model.js'
import Request from '../models/request.model.js'
import Test from '../models/test.model.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export async function currentUser(req, res) {
  try {
    const authToken = req.cookies.authToken; // Adjust this according to your cookie setup

    if (!authToken) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const decodedToken = jwt.verify(authToken, process.env.JWT_KEY);
    const user = await Student.findById(decodedToken._id).select('-password');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function studentsignup(req, res) {
  try {
    console.log(req.body)
    const userexists = await Student.findOne({
      email: req.body.email,
    })
    if (userexists) {
      res.json({ status: 'error, user already exists' })
    }
    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
      if (!err) {
        await Student.create({
          firstname: req.body.fname,
          lastname: req.body.lname,
          gender: req.body.gender,
          seatno: req.body.seatno,
          academicyear: req.body.academic,
          department: req.body.department,
          semester: req.body.semester,
          division: req.body.division,
          classteacher: req.body.classteacher,
          hod: req.body.hod,
          address: req.body.address,
          mothername: req.body.mothername,
          fathername: req.body.fathername,
          mobileno: req.body.mobileno,
          dateofbirth: req.body.dateofbirth,
          email: req.body.email,
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

export async function studentlogin(req, res) {
  try {
    const student = await Student.findOne({
      email: req.body.email,
    })

    if (!student) {
      res.json({ status: 'error: account not found' })
    } else {
      const match = await bcrypt.compare(req.body.password, student.password)
      if (!match) {
        // passwords do not match!
        res.json({ status: 'error' })
      } else {
        const token = jwt.sign(
          {
            id: student._id,
            role: student,
          },
          process.env.JWT_KEY,
          { expiresIn: '24h' }
        )

        return res.status(200).send({
          status: 'ok',
          token,
        })
      }
    }
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
}

export async function teachersignup(req, res) {
  try {
    console.log(req.body)
    const userexists = await Teacher.findOne({
      email: req.body.Email,
    })
    if (userexists) {
      res.json({ status: 'error, user already exists' })
    }
    bcrypt.hash(req.body.Password, 10, async (err, hashedPassword) => {
      if (!err) {
        await Teacher.create({
          firstname: req.body.FirstName,
          lastname: req.body.LastName,
          gender: req.body.Gender,
          department: req.body.Department,
          domain: req.body.Domain,
          role: req.body.Role,
          address: req.body.Address,
          mothername: req.body.MotherName,
          fathername: req.body.FatherName,
          mobileno: req.body.MobileNo,
          dateofbirth: req.body.DateofBirth,
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

export async function teacherlogin(req, res) {
  try {
    const teacher = await Teacher.findOne({
      email: req.body.email,
    })

    if (!teacher) {
      res.json({ status: 'error: account not found' })
    } else {
      const match = await bcrypt.compare(req.body.password, teacher.password)
      if (!match) {
        // passwords do not match!
        res.json({ status: 'error' })
      } else {
        const token = jwt.sign(
          {
            id: teacher._id,
            role: teacher,
          },
          process.env.JWT_KEY,
          { expiresIn: '24h' }
        )
        return res.status(200).send({
          status: 'ok',
          token,
        })
      }
    }
  } catch (error) {
    res.status(500).send({ error: error.message })
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
      res.json({ status: 'error: account not found' })
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
            role: test,
          },
          process.env.JWT_KEY,
          { expiresIn: '24h' }
        )
        return res.status(200).send({
          status: 'ok',
          token,
        })
      }
    }
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
}

export async function addrequest(req,res){
    try{
      console.log(req.body)
        await Request.create({
          firstname: req.body.FirstName,
          lastname: req.body.LastName,
          seatno: req.body.SeatNo,
          academicyear: req.body.AcademicYear,
          department: req.body.Department,
          semester: req.body.Semester,
          division: req.body.Division,
          classteacher: req.body.ClassTeacher,
          hod: req.body.HeadofDept,
          mothername: req.body.MotherName,
          fathername: req.body.FatherName,
          fromduration: req.body.FromDuration,
          toduration: req.body.ToDuration,
          wherefrom: req.body.WhereFrom,
          whatfor: req.body.WhatFor,
          domain: req.body.Domain,
        })
        res.json({ status: 'ok' })
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
