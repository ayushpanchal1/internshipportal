import Teacher from '../models/teacher.model.js'
import Request from '../models/request.model.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import PDFDocument from 'pdfkit'
import fs from 'fs'

dotenv.config()

export async function teachersignup(req, res) {
    try {
      const userExists = await Teacher.findOne({
        email: req.body.email,
      });
  
      if (userExists) {
        return res.json({ status: 'error, user already exists' });
      }
  
      const hashedPassword = bcrypt.hashSync(req.body.password, 5);
  
      await Teacher.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        gender: req.body.gender,
        department: req.body.department,
        domain: req.body.domain,
        role: req.body.role,
        dateofbirth: req.body.dateofbirth,
        dateofjoining: req.body.dateofjoining,
        email: req.body.email,
        password: hashedPassword,
      });
  
      return res.json({ status: 'ok' });
    } catch (error) {
      return res.status(500).send({ error: error.message });
    }
  }  
  export async function teacherlogin(req, res) {
    try {
      const teacher = await Teacher.findOne({
        email: req.body.email,
      })
  
      if (!teacher) {
        return res.status(404).json({ error: 'Account not found' });
      }
  
      const match = await bcrypt.compare(req.body.password, teacher.password);
      if (!match) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
  
      const token = jwt.sign(
        {
          id: teacher._id,
          role: "teacher",
          userdata: teacher,
        },
        process.env.JWT_KEY,
        { expiresIn: '24h' }
      );
  
      // Sending token as a cookie and including it in the response body
      res.cookie('token', token);
      return res.status(200).json({
        token,
        userRole: "teacher", // Assuming the userRole is always "teacher" in this case
        userEmail: teacher.email, // Assuming you want to send the user's email
        status: 'ok, teacher logged in',
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
  
  export async function teachergetmyrequests(req,res){
      try{
        if(req.role != 'teacher'){
            return res.status(500).send({ error: 'User is not a teacher' });
        } else {
          const tchr = [req.user.firstname, req.user.lastname].join(' ')
          const aprlstts = req.user.role == 'classteacher' ? 0 : 1
  
          if(aprlstts==0){
            var requests = await Request.find({
              classteacher: tchr,
              approvalstatus: aprlstts,
            })
          } else {
            var requests = await Request.find({
              hod: tchr,
              approvalstatus: aprlstts,
            })
          }
  
          return res.status(200).send({
            status: 'ok',
            requests: requests,
          })
        }
      } catch (error) {
        return res.status(500).send({ error: error.message });
      }
  }
  
  export async function teacherapprove(req,res){
    try{
      if(req.role != 'teacher'){
        return res.status(500).send({ error: 'User is not a teacher' });
      }
      const tchr = [req.user.firstname, req.user.lastname].join(' ')
      const aprlstts = req.user.role == 'classteacher' ? 0 : 1

      if(aprlstts==0){
        var requests = await Request.findOneAndUpdate(
          {
            _id: req.body.id,
            classteacher: tchr,
            approvalstatus: aprlstts,
          },
          {$inc: {approvalstatus:1}},
          {returnNewDocument:true}
        )
      } else {

        const request = await Request.findOne({
          _id: req.body.id,
        }).select('-pdfdata') // exclude pdf binary to prevent recursively increasing size of field and corrupting it

        // console.log(request)

      const pdfFilename = `${req.body.id}.pdf`;
      const pdfStream = fs.createWriteStream(pdfFilename);
      const pdfDoc = new PDFDocument();

      // Pipe the PDF output to the file stream
      pdfDoc.pipe(pdfStream);
      // Write data from MongoDB document to PDF
      pdfDoc.text(JSON.stringify(request));
      // Finalize and close the PDF
      pdfDoc.end();
      await new Promise(r => setTimeout(r, 2)); // DO NOT touch this ~~gives blank input if lower than 2
      // Save PDF file in MongoDB
      const pdfBinary = fs.readFileSync(pdfFilename);

      var requests = await Request.findOneAndUpdate(
          {
            _id: req.body.id,
            hod: tchr,
            approvalstatus: aprlstts,
          },
          // {$inc: {approvalstatus:1}},
          {$set: {pdfdata: pdfBinary},
            $inc: {approvalstatus:1}},
          {returnNewDocument:true}
        )
        // console.log(requests)
      // Delete the local PDF file
        fs.unlinkSync(pdfFilename);
      }
      if(!requests) return res.status(500).send({ error: 'No request found to approve' });

      return res.status(200).send({
        status: 'ok, request approved'
      })
    
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
  }
  