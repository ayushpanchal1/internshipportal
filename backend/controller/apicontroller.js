import Student from '../models/student.model.js'
import Teacher from '../models/teacher.model.js'
import Request from '../models/request.model.js'
// import Request from '../models/request.model.js'
import Announcement from '../models/announcement.model.js'
import Test from '../models/test.model.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import PDFDocument from 'pdfkit'
import fs from 'fs'
import path from 'path'
import multer from 'multer'
import dotenv from 'dotenv'
import { verifyOTP } from '../otpGenerator.js'

dotenv.config()

// const FRONTEND_ADDRESS process.env.FRONTEND_ADDRESS

const upload = (prefix, req) =>
  multer({
    storage: multer.diskStorage({
      destination: path.join(
        process.cwd(),
        `./media/uploads/${req.role}/${prefix}`
      ), //changed path
      filename: (req, file, cb) => {
        // const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(
          null,
          // file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
          req.role + prefix + req.user._id + path.extname(file.originalname)
        )
      },
    }),
    limits: {
      fileSize: 600 * 1024, // 600 KB limit
    },
    fileFilter: (req, file, cb) => {
      if (file.mimetype === 'image/png') {
        cb(null, true)
      } else {
        cb(new Error('Only PNG files are allowed.'))
      }
    },
  })

export async function currentUser(req, res) {
  try {
    var user = null

    if (req.role === 'student') {
      user = await Student.findById(req.user._id).select('-password')
    } else if (req.role === 'teacher') {
      user = await Teacher.findById(req.user._id).select('-password')
    } else if (req.role === 'test') {
      user = await Test.findById(req.user._id).select('-password')
    }
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
    return res.json(user)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export async function userlogout(req, res) {
  try {
    res.clearCookie('token')
    res.status(200).send({ status: 'ok, user logged out' })
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
            role: 'test',
            userdata: test,
          },
          process.env.JWT_KEY,
          { expiresIn: '24h' }
        )
        return res
          .cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
          })
          .status(200)
          .send({
            status: 'ok, test logged in',
          })
          .status(200)
          .send({
            status: 'ok, test logged in',
          })
      }
    }
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
}

export async function testmiddleware(req, res) {
  try {
    //console.log(req.user.role.email)
    res.status(200).send({ status: 'ok, middleware works!' })
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
}

export async function getAnnouncements(req, res) {
  try {
    const Announcements = await Announcement.find()
    return res.json(Announcements)
  } catch (error) {
    return res.status(500).send({ error: error.message })
  }
}

export async function downloadrequest(req, res) {
  try {
    // console.log(req.body)
    if (!req.body.id)
      return res.status(500).send({
        error: 'please give id of the request whose pdf is to be downloaded',
      })

    const request = await Request.findOne({
      _id: req.body.id,
      studentid: req.user._id,
    })
    // console.log(request)

    if (!request)
      return res
        .status(500)
        .send({ error: 'no requests were found with that id' })

    // Checking if signatures exist
    // ./media/uploads/teacher/sign/teachersign${request.classteacherid}.png
    const classteacherSignaturePath = `./media/uploads/teacher/sign/teachersign${request.classteacherid}.png`
    const hodSignaturePath = `./media/uploads/teacher/sign/teachersign${request.hodid}.png`

    // Check if the class teacher's signature file exists
    if (!fs.existsSync(classteacherSignaturePath)) {
      return res
        .status(500)
        .send({ error: "Class teacher's signature doesn't exist" })
    }

    // Check if the HOD's signature file exists
    if (!fs.existsSync(hodSignaturePath)) {
      return res.status(500).send({ error: "HOD's signature doesn't exist" })
    }

    // to prevent crashing
    // doesnt work, also needs a better implementation

    // const teachersignpath = `./media/uploads/teacher/sign/teachersign${classteacherid}.png`
    // if (fs.existsSync(teachersignpath))
    // return res.status(500).send({
    //   error: "class teacher does not have a signature uploaded",
    // });

    // if (fs.existsSync(`./media/uploads/teacher/sign/teachersign${hodid}.png`))
    // return res.status(500).send({
    //   error: "hod does not have a signature uploaded",
    // });

    if (request.approvalstatus === 2) {
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

      //./media/fake.png for placeholder sign
      //./media/uploads/teacher/sign/teachersign${request.classteacherid}.png for actual class teacher sign
      pdfDoc.image(classteacherSignaturePath, 40, 600, {
        fit: [150, 150],
      })

      //./media/uploads/teacher/sign/teachersign${request.hodid}.png for actual hod sign
      pdfDoc.image(hodSignaturePath, 430, 600, {
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

      // Set CORS headers
      res.setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_ADDRESS)
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
      res.setHeader(
        'Access-Control-Allow-Headers',
        'Content-Type, Authorization'
      )

      res.setHeader('Content-Type', 'application/pdf')
      res.setHeader('Content-Disposition', 'inline; filename="document.pdf"')
      return res.end(pdfBinary)
    } else {
      return res.status(500).send({ error: 'request does not have a pdf' })
    }
  } catch (error) {
    let pdfFileToDel = `${req.body.id}.pdf`
    let pdfPathToDel = `./media/pdf/`
    fs.unlinkSync(`${pdfPathToDel}${pdfFileToDel}`) //WORKS, deletes file after an error!!!!!!!
    return res.status(500).send({ error: error.message })
  }
}

export async function uploadProfilePicture(req, res) {
  const handler = upload('profile', req).single('image')

  handler(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading
      return res
        .status(400)
        .json({ error: 'File upload error', details: err.message })
    } else if (err) {
      // An unknown error occurred
      return res.status(500).json({ error: err.message })
    }

    // No errors, profile picture uploaded successfully
    res
      .status(200)
      .json({ status: `${req.role} Profile picture uploaded successfully.` })
  })
}

// export async function uploadProfilePicture(req, res) {
//   const handler = upload("profile", req).single("image");

//   handler(req, res, (err) => {
//     if (err) {
//       return res.status(500).json({ error: err.message });
//     }
//     res.status(200).json({ status: `${req.role} Profile picture uploaded successfully.` });
//   });
// }

export async function deleteProfilePicture(req, res) {
  const userId = req.user._id
  const role = req.role
  const filePath = path.resolve(
    `./media/uploads/${role}/profile/${role}profile${userId}.png`
  )

  // Check if the file exists
  if (fs.existsSync(filePath)) {
    // Delete the file
    fs.unlink(filePath, (err) => {
      if (err) {
        return res.status(500).json({ error: err.message })
      }
      res.status(200).json({ status: 'Profile picture deleted successfully.' })
    })
  } else {
    // If the file doesn't exist, return an error
    res.status(404).json({ error: 'Profile picture not found.' })
  }
}

export async function fetchProfilePicture(req, res) {
  const userId = req.params.userId
  const role = req.role

  // Construct the file path
  const filePath = path.resolve(
    `./media/uploads/${role}/profile/${role}profile${userId}.png`
  )

  // Check if the file exists
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      // If the file doesn't exist, send the default image
      const defaultImagePath = path.resolve('./media/user.png')
      res.sendFile(defaultImagePath)
    } else {
      // If the file exists, send it
      res.sendFile(filePath)
    }
  })
}

export async function resetPassword(req, res) {
  try {
    // Check if any of the required fields are missing or empty
    const requiredFields = [
      'email',
      'password',
      'role', // valid values: teacher or student, cant fetch from req.user as sometimes it might come from login page
      'otp',
    ]

    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({ error: `${field} is required` })
      }
    }

    // Validate OTP
    const OTPcheck = await verifyOTP(req.body.email, req.body.otp)
    if (OTPcheck == false) {
      return res.status(400).json({ error: `otp error` })
    }

    if (req.body.role === 'student') {
      var userexists = await Student.findOne({
        email: req.body.email,
      })
    } else {
      var userexists = await Teacher.findOne({
        email: req.body.email,
      })
    }

    if (!userexists) {
      return res.json({ error: 'user does not exist' })
    }

    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
      if (!err) {
        if (req.body.role === 'student') {
          await Student.findOneAndUpdate(
            {
              email: req.body.email,
            },
            {
              $set: { password: hashedPassword }, // Set declinemsg directly
            },
            { new: true }
          )
        } else {
          await Teacher.findOneAndUpdate(
            {
              email: req.body.email,
            },
            {
              $set: { password: hashedPassword }, // Set declinemsg directly
            },
            { new: true }
          )
        }
        return res.json({ status: 'ok, password has been changed' })
      } else {
        console.log(err)
        return res.json({ error: 'bcrypt error occured' })
      }
    })
  } catch (error) {
    return res.status(500).send({ error: error.message })
  }
}

// //template
// export async function testlogin(req,res){
//     try{

//     } catch (error) {
//         res.status(500).send({ error: error.message });
//     }
// }
