import Student from "../models/student.model.js";
import Request from "../models/request.model.js";
import CompIntern from "../models/compintern.model.js";
import Notification from "../models/notification.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { verifyOTP } from "../otpGenerator.js";
import { OAuth2Client } from "google-auth-library";


dotenv.config();

const client = new OAuth2Client(
  "780340517253-mulvd9vf85ta69kj57aqu39lt7ef377s.apps.googleusercontent.com"
);

export async function studentsignup(req, res) {
  try {
    // console.log(req.body);

    // Check if any of the required fields are missing or empty
    const requiredFields = [
      "fname",
      "lname",
      "gender",
      "seatno",
      "academic",
      "department",
      "semester",
      "division",
      "classteacher",
      "hod",
      "address",
      "mothername",
      "fathername",
      "mobileno",
      "dateofbirth",
      "email",
      "password",
      "otp",
    ];

    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({ error: `${field} is required` });
      }
    }

    // Validate OTP
    const OTPcheck = await verifyOTP(req.body.email, req.body.otp)
    if(OTPcheck == false) {  return res.status(400).json({ error: `otp error` }); }
    
    const userexists = await Student.findOne({
      email: req.body.email,
    });
    if (userexists) {
      return res.json({ error: "user already exists" });
    }

    const stuname = [req.body.fname, req.body.lname].join(" ");

    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
      if (!err) {
        await Student.create({
          stuname: stuname,
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
        });
        return res.json({ status: "ok" });
      } else {
        console.log(err);
        return res.json({ error: "bcrypt error occured" });
      }
    });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
}

export async function studentlogin(req, res) {
  // console.log(req.body.googleToken);
  try {
    if (!req.body.googleToken) {
      const student = await Student.findOne({
        email: req.body.email,
      });

      if (!student) {
        return res.json({ error: "account not found" });
      } else {
        const match = await bcrypt.compare(req.body.password, student.password);
        if (!match) {
          // passwords do not match!
          return res.json({ status: "error" });
        } else {
          const token = jwt.sign(
            {
              id: student._id,
              role: "student",
              userdata: student,
            },
            process.env.JWT_KEY,
            { expiresIn: "24h" }
          );

          return res.cookie("token", token).status(200).send({
            status: "ok, student logged in",
            user: "student",
          });
        }
      }
    } else {
      const ticket = await client.verifyIdToken({
        idToken: req.body.googleToken,
      });
      const payload = ticket.getPayload();
      const { email } = payload;

      // Check if the user exists in your database
      let student = await Student.findOne({ email });

      if (!student) {
        return res.json({ error: "account not found" });
      } else {
        const token = jwt.sign(
          {
            id: student._id,
            role: "student",
            userdata: student,
          },
          process.env.JWT_KEY,
          { expiresIn: "24h" }
        );

        return res.cookie("token", token).status(200).send({
          status: "ok, student logged in",
          user: "student",
        });
      }
    }
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
}

export async function studentaddrequest(req, res) {
  try {
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
      approvalstatus: 0, //initialised as zero
    });
    return res.json({ status: "ok" });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
}

export async function studentremoverequest(req, res) {
  try {
    if (!req.body.id)
      return res
        .status(500)
        .send({ error: "please give id of request to be deleted in req body" });

    const delrequest = await Request.deleteOne({
      _id: req.body.id,
      studentid: req.user._id,
    });

    if (delrequest.deletedCount == 0)
      return res.status(500).send({ error: "no requests were deleted" });

    return res.status(200).send({
      status: "ok, deleted " + delrequest.deletedCount + " requests",
    });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
}

export async function studentgetmyrequests(req, res) {
  try {
    if (!req.body.approvalstatus) {
      var requests = await Request.find({
        studentid: req.user._id,
      });
    } else {
      var requests = await Request.find({
        studentid: req.user._id,
        approvalstatus: req.body.approvalstatus,
      });
    }
    return res.status(200).send({
      status: "ok",
      requests: requests,
    });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
}

export async function studentgetmyinterns(req, res) {
  try {
    const myinternsdata = await CompIntern.find({
      stu_id: req.user._id,
    });
    return res.status(200).send(myinternsdata);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
}

export async function studentgetmynotifications(req, res) {
  try {
    const mynotifsdata = await Notification.find({
      studentid: req.user._id,
    });
    return res.status(200).send(mynotifsdata);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
}

export async function studentsubcompintern(req, res) {
  try {
    const stuname = [req.user.firstname, req.user.lastname].join(" ");

    await CompIntern.create({
      stu_id: req.user._id,
      email: req.user.email,
      stuname: stuname,
      stufname: req.user.firstname,
      stulname: req.user.lastname,
      classteacher: req.user.classteacher,
      hod: req.user.hod,
      provider: req.body.Provider,
      fromduration: req.body.FromDuration,
      toduration: req.body.ToDuration,
      whatfor: req.body.WhatFor,
      domain: req.body.Domain,
    });
    res.json({ status: "ok" });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
}

export async function studentdelmyinterns(req, res) {
  try {
    const myinternsdata = await CompIntern.deleteOne({
      stu_id: req.user._id,
      _id: req.body._id,
    });
    // console.log(myinternsdata)
    return res.json(myinternsdata);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
}

export async function sendNotificationToStudent(studentid, teachername, teacherid, approvalstatus){
  try {
    let message = '';
    switch(approvalstatus) {
      case 1:
        message = `Your internship request has been approved by your class teacher ${teachername}.`;
        break;
      case 2:
        message = `Your internship request has been approved by your HOD ${teachername}. Your pdf is now available to download`;
        break;
      case 3:
        message = `Your internship request has been rejected by ${teachername}.`;
      default:
        break;
    }

    // Create a new Notification document
    const notification = new Notification({
      studentid: studentid,
      teachername: teachername,
      teacherid: teacherid,
      approvalstatus: approvalstatus,
      message: message
    });
    
    await notification.save();

    // console.log("Notification sent to student:", studentid);
    // console.log("Teacher name:", teachername);
    // console.log("Teacher ID:", teacherid);
    // console.log("Approval status:", approvalstatus);
    // console.log("Message:", message);

  } catch (error) {
    console.error("Error sending notification:", error);
  }
}
