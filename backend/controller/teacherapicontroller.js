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
      // console.log(req.body)
      const userexists = await Teacher.findOne({
        email: req.body.Email,
      })
      if (userexists) {
        return res.json({ status: 'error, user already exists' })
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
  
  export async function teacherlogin(req, res) {
    try {
      const teacher = await Teacher.findOne({
        email: req.body.email,
      })
  
      if (!teacher) {
        return res.json({ status: 'error: account not found' })
      } else {
        const match = await bcrypt.compare(req.body.password, teacher.password)
        if (!match) {
          // passwords do not match!
          return res.json({ status: 'error' })
        } else {
          const token = jwt.sign(
            {
              id: teacher._id,
              role: "teacher",
              userdata: teacher,
            },
            process.env.JWT_KEY,
            { expiresIn: '24h' }
          )
          return res.cookie('token',token).status(200).send({
            status: 'ok, teacher logged in',
          })
        }
      }
    } catch (error) {
        return res.status(500).send({ error: error.message })
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
  
          if(!requests) return res.status(500).send({ error: "The teacher has no requests to approve" });

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
          approvalstatus: aprlstts,
        }).select('-pdfdata') // exclude pdf binary to prevent recursively increasing size of field and corrupting it

        // console.log(request)

      const pdfFilename = `${req.body.id}.pdf`;
      const pdfStream = fs.createWriteStream(pdfFilename);
      const pdfDoc = new PDFDocument();

      // Pipe the PDF output to the file stream
      pdfDoc.pipe(pdfStream);
      // Write data from MongoDB document to PDF
      // pdfDoc.text(JSON.stringify(request));
      // para = "$";

      pdfDoc
        .image("./media/logo.png", 50, 50, {
          fit: [200, 200],
          align: "left",
          valign: "top",
        })
        .moveDown(8);

      pdfDoc
        .font("Helvetica-Bold")
        .fontSize(20)
        .text("Internship Approval Letter", { align: "center" })
        .moveDown(1);

      pdfDoc
        .font("Helvetica-Bold")
        .fontSize(13)
        .text("To Whomsoever it may concern,")
        .moveDown(2);

      pdfDoc
        .font("Helvetica")
        .fontSize(13)
        .text(
          `This is to validate that the student ${request.firstname} ${request.lastname} has recieved the permission to intern at Amazon.Inc for the stipulated duration of 30 days from 01 - 01 - 2024 to 30 - 01 - 2024.`,
          { align: "justify" }
        )
        .moveDown(1);

      pdfDoc
        .font("Helvetica")
        .fontSize(13)
        .text(
          "Any extension to the internship will result in DIVINE PUNISHMENT from god",
          { align: "justify" }
        )
        .moveDown(4);

      pdfDoc
        .font("Helvetica-Bold")
        .fontSize(13)
        .text("Yours Truly,", { align: "justify" });

      pdfDoc.image("./media/fake.png", {
        fit: [150, 150],
        valign: "bottom",
      });

      
      // Finalize and close the PDF
      pdfDoc.end();

      await new Promise(r => setTimeout(r, 20)); // DO NOT touch this ~~gives blank input if lower than 2
      // Save PDF file in MongoDB                 //ye pehle 2 tha, image ke bad 15 kiya tha 
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
        // fs.unlinkSync(pdfFilename);                        DOESN'T WORK! should delete the pdf after an error
    }
  }