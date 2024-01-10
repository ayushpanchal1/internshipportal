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
            academicyear: req.body.academicyear,
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
          studentid: req.user._id,
          studentemail: req.user.email,
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
          fromduration: req.body.fromduration,
          toduration: req.body.toduration,
          companyname: req.body.companyname,
          companyaddress: req.body.companyaddress,
          whatfor: req.body.whatfor,
          domain: req.body.domain,
          approvalstatus: 0,
        })
        return res.json({ status: 'ok' })
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
  }

  export async function removerequest(req, res) {
    try {
      const requestId = req.body.id;
  
      if (!requestId) {
        return res.status(400).json({ error: 'Request id is missing' });
      }
  
      const deletedRequest = await Request.findByIdAndDelete(requestId);
  
      if (!deletedRequest) {
        return res.status(404).json({ error: 'Request not found or already deleted' });
      }
  
      return res.status(200).json({ status: 'ok', deletedRequestId: requestId });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
  
  
  export async function downloadrequest(req,res){
    try{
      console.log(req.body)
      if(!req.body.id) return res.status(500).send({ error: "please give id of the request whose pdf is to be downloaded"});
      // req.body.id = "6585a0e7c9541879187f3e7d"

      const requests = await Request.findOne({
        _id: req.body.id,
        studentid: req.user._id,
      })

      if (!requests) return res.status(500).send({ error: "no requests were found with that id"});

      if (!requests.pdfdata) return res.status(500).send({ error: "request does not have a pdf"});

      // const pdfBinary = Buffer.from(requests.pdfdata, 'Base64');
      const pdfBinary = Buffer.from(requests.pdfdata.toString('base64'), 'base64');
      console.log(pdfBinary)

      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", 'inline; filename="document.pdf"');
      return res.end(pdfBinary);
      
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
  }
  
  export async function getmyrequests(req,res){
    try{
      const requests = await Request.find({
        studentid: req.user._id,
        approvalstatus: req.body.approvalstatus,
      })
      return res.status(200).send({
        status: 'ok',
        requests: requests,
      })
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
  }