import Student from '../models/student.model.js'
import Teacher from '../models/teacher.model.js'
import Request from '../models/request.model.js'
// import Request from '../models/request.model.js'
import Notif from '../models/notification.model.js'
import Test from '../models/test.model.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import PDFDocument from 'pdfkit'
import fs from 'fs'

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
        res.json({ error: 'incorrect username or password' })
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

export async function getnotifs(req, res){
    try{
      const notifs = await Notif.find()
      return res.json(notifs)
    } catch (error) {
      return res.status(500).send({ error: error.message });
    }
}

export async function downloadrequest(req, res) {
  try {
    // console.log(req.body)
    if (!req.body.id) return res.status(500).send({ error: "please give id of the request whose pdf is to be downloaded" });

    const request = await Request.findOne({
      _id: req.body.id,
      studentid: req.user._id,
    })

    if (!request) return res.status(500).send({ error: "no requests were found with that id" });

    if (request.approvalstatus < 2) {
      return res.status(500).send({ error: "request does not have a pdf" });
    } else {
      const pdfPath = `./media/pdf/`
      const pdfFilename = `${req.body.id}.pdf`
      const pdfStream = fs.createWriteStream(`${pdfPath}${pdfFilename}`)
      // const pdfDoc = new PDFDocument();
      const pdfDoc = new PDFDocument({ size: 'LETTER' })

      // Pipe the PDF output to the file stream
      pdfDoc.pipe(pdfStream)
      // Write data from MongoDB document to PDF
      // pdfDoc.text(JSON.stringify(request));
      // para = "$";

      pdfDoc
        .image('./media/logo.png', 50, 50, {
          fit: [200, 200],
          align: 'left',
          valign: 'top',
        })
        .moveDown(8)

      pdfDoc
        .font('Helvetica-Bold')
        .fontSize(20)
        .text('Internship Approval Letter', { align: 'center' })
        .moveDown(1)

      pdfDoc
        .font('Helvetica-Bold')
        .fontSize(13)
        .text('To Whomsoever it may concern,')
        .moveDown(2)

      pdfDoc
        .font('Helvetica')
        .fontSize(13)
        .text(
          `This is to validate that the student ${request.firstname} ${request.lastname} has recieved the permission to intern at ${request.companyname} from ${request.fromduration} to ${request.toduration}.`,
          { align: 'justify' }
        )
        .moveDown(1)

      pdfDoc
        .font('Helvetica')
        .fontSize(13)
        .text(
          'Any extension to the internship period has to be informed to the responsible faculties and approval must be attained from them.',
          { align: 'justify' }
        )
        .moveDown(4)

      pdfDoc.image('./media/fake.png', 40, 600, {
        fit: [150, 150],
      })

      pdfDoc.image('./media/fake.png', 430, 600, {
        fit: [150, 150],
      })

      pdfDoc.font('Helvetica-Bold').fontSize(13).text('Class Teacher', 80, 700)

      pdfDoc.font('Helvetica-Bold').fontSize(13).text('HOD', 490, 700)

      pdfDoc.lineWidth(2).rect(20, 20, 573, 750).stroke()

      // Finalize and close the PDF
      pdfDoc.end()

      await new Promise((r) => setTimeout(r, 20)) // DO NOT touch this ~~gives blank input if lower than 2
      // Save PDF file in MongoDB                 //ye pehle 2 tha, image ke bad 15 kiya tha
      const pdfBinary = fs.readFileSync(`${pdfPath}${pdfFilename}`)
      // const pdfBinary = Buffer.from(requests.pdfdata.toString('base64'), 'base64');
      // console.log(pdfBinary)
      // Delete the local PDF file
      fs.unlinkSync(`${pdfPath}${pdfFilename}`)

      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", 'inline; filename="document.pdf"');
      return res.end(pdfBinary);
    }

  } catch (error) {
    let pdfFileToDel = `${req.body.id}.pdf`
    let pdfPathToDel = `./media/pdf/`
    fs.unlinkSync(`${pdfPathToDel}${pdfFileToDel}`) //WORKS, deletes file after an error!!!!!!!
    return res.status(500).send({ error: error.message });
  }
}

// //template
// export async function testlogin(req,res){
//     try{

//     } catch (error) {
//         res.status(500).send({ error: error.message });
//     }
// }
