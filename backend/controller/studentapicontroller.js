import Student from '../models/student.model.js'
import Request from '../models/request.model.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export async function studentsignup(req, res) {
    try {
      console.log(req.body)
      const userexists = await Student.findOne({
        email: req.body.email,
      })
      if (userexists) {
        return res.json({ status: 'error, user already exists' })
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
          return res.json({ status: 'ok' })
        } else {
          console.log(err)
          return res.json({ status: 'error' })
        }
      })
    } catch (error) {
      return res.status(500).send({ error: error.message })
    }
  }

  export async function studentlogin(req, res) {
    try {
      const student = await Student.findOne({
        email: req.body.email,
      })
  
      if (!student) {
        return res.json({ status: 'error: account not found' })
      } else {
        const match = await bcrypt.compare(req.body.password, student.password)
        if (!match) {
          // passwords do not match!
          return res.json({ status: 'error' })
        } else {
          const token = jwt.sign(
            {
              id: student._id,
              role: "student",
              userdata: student,
            },
            process.env.JWT_KEY,
            { expiresIn: '24h' }
          )
  
          return res.cookie('token',token).status(200).send({
            status: 'ok, student logged in',
          })
        }
      }
    } catch (error) {
      return res.status(500).send({ error: error.message })
    }
  }
  
  export async function addrequest(req,res){
    try{
      //console.log(req.body)
        await Request.create({
          firstname: req.user.firstname,
          lastname: req.user.lastname,
          seatno: req.user.seatno,
          academicyear: req.user.academicyear,
          department: req.user.department,
          semester: req.user.semester,
          division: req.user.division,
          classteacher: req.user.classteacher,
          hod: req.user.hod,
          mothername: req.user.mothername,
          fathername: req.user.fathername,
          fromduration: req.body.FromDuration,
          toduration: req.body.ToDuration,
          companyname: req.body.CompanyName,
          companyaddress: req.body.CompanyAddress,
          whatfor: req.body.WhatFor,
          domain: req.body.Domain,
        })
        return res.json({ status: 'ok' })
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
  }
  
  export async function getmyrequests(req,res){
    try{
      const requests = await Request.find({
        email: req.user.email,
        approvalstatus: req.body.approvalstatus,
      })
      return res.status(200).send({
        status: 'ok',
        requests,
      })
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
  }