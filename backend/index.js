const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const Student = require('./models/student.model')
const Teacher = require('./models/teacher.model')
const Test = require('./models/test.model')
const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()
const MONGO_URI = process.env.MONGO_URI;
app.use(cors()) 
app.use(express.json())


console.log("server starting")

// Mongo DB connection
mongoose.connect(MONGO_URI) 
const connection = mongoose.connection;
connection.once('open', () => {
    try {
        console.log("MongoDB connected")
    } catch(e) {
        console.error(e);
    }
})

//test api req
app.get('/hello', (req, res) => {
    res.send('hello world')
})

//student signup 
app.post('/api/studentsignup', async (req, res) => { 
    console.log(req.body)
    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
        if(!err) {
            await Student.create({
            firstname: req.body.FirstName,
            lastname: req.body.LastName,
            gender: req.body.Gender,
            seatno: req.body.SeatNo,
            academicyear: req.body.AcademicYear,
            department: req.body.Department,
            semester: req.body.Semester,
            division: req.body.Division,
            classteacher: req.body.ClassTeacher,
            hod: req.body.HeadofDept,
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
        res.json({ status: 'error'})
    }
    });
})

// app.post('/api/testsignup', async (req, res) => { 
//     console.log(req.body)
//     console.log(req.body.Email)
//     bcrypt.hash(req.body.Password, 10, async (err, hashedPassword) => {
//         if(!err) {
//             console.log(req.body.Password);
//             await Test.create({
//             email: req.body.Email,
//             password: hashedPassword,
//         })
//         res.json({ status: 'ok' })
//     } else {
//         console.log(err)
//         res.json({ status: 'error'})
//     }
//     });
// })

app.post('/api/teachersignup', async (req, res) => { 
    console.log(req.body)
    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
    if(!err) {
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
            password: req.body.Password,
        })
        res.json({ status: 'ok' })
    } else {
        console.log(err)
        res.json({ status: 'error'})
    }
      });
})

app.post('/api/studentlogin', async (req, res) => { 
    
    const student = await Student.findOne({
            email: req.body.Email,
        })

        if (!student) {
            res.json({ status: 'error: account not found'})
        } else {
            const match = await bcrypt.compare(req.body.Password, student.password);
            if (!match) {
            // passwords do not match!
            res.json({ status: 'error'})
            } else { 
                res.json({ status: 'ok'})
            }
        }
})

// app.post('/api/testlogin', async (req, res) => { 
    
//     const test = await Test.findOne({
//             email: req.body.Email,
//         })
//         if (!test) {
//             res.json({ status: 'error: account not found'})
//         } else {
//             const match = await bcrypt.compare(req.body.Password, test.password);
//             console.log(match)
//             if (!match) {
//             // passwords do not match!
//             res.json({ status: 'error'})
//             } else { 
//                 res.json({ status: 'ok'})
//             }
//         }
// })

app.post('/api/teacherlogin', async (req, res) => { 
    
    const teacher = await Teacher.findOne({
            email: req.body.Email,
        })

        if (!teacher) {
            res.json({ status: 'error: account not found'})
        } else {
            const match = await bcrypt.compare(req.body.Password, teacher.password);
            if (!match) {
            // passwords do not match!
            res.json({ status: 'error'})
            } else { 
                res.json({ status: 'ok'})
            }
        }
})

app.listen(1337, () => {
    console.log('server started on port 1337')
})