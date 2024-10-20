import { toast } from "react-toastify";
import { httpAxios } from "./httpAxios";

export async function googleLoginTeacher(requestBody, navigate, signIn) {
  try {
    const response = await httpAxios.post("/api/teacherlogin", requestBody);
    const data = response.data;
    // console.log(data.email);

    if (data.error) {
      throw new Error(data.error);
    } else {
      signIn({
        token: data.token,
        expiresIn: 3600,
        tokenType: "Bearer",
        authState: { email: data.email, session: "admin" },
      });
      localStorage.setItem("SessionInfo", "admin");
      localStorage.setItem("SessionEmail", data.email);
      navigate("/teacher/TeacherDashboard");
    }
  } catch (error) {
    toast.error(`Login credentials are incorrect!`);
  }
}

export async function loginTeacher(requestBody, navigate, signIn) {
  try {
    const response = await httpAxios.post("/api/teacherlogin", requestBody);

    const data = response.data;

    if (data.error) {
      throw new Error(data.error);
    } else {
      signIn({
        token: data.token,
        expiresIn: 3600,
        tokenType: "Bearer",
        authState: { email: requestBody.email, session: "admin" },
      });
      localStorage.setItem("SessionInfo", "admin");
      localStorage.setItem("SessionEmail", requestBody.email);
      navigate("/teacher/TeacherDashboard");
    }
  } catch (error) {
    toast.error(
      `Teacher Log in credentials are incorrect! Sign up if you do not have an account! ${error}`
    );
  }
}

export async function getMyAnnouncementsTeacher(setAnnouncements) {
  try {
    const response = await httpAxios.get("/api/teachergetmyannouncements");
    var data = response.data;

    if (data.error) {
      throw new Error(data.error);
    } else {
      if (Array.isArray(data)) {
        // `data` is an array, you can safely call reverse on it
        data.reverse();
      }
      setAnnouncements(data);
    }
  } catch (error) {
    toast.error(`Error fetching teachermyannouncements! ${error}`);
  }
}

export async function delMyAnnouncementsTeacher(
  setAnnouncements,
  delAnnouncementid
) {
  try {
    const response = await httpAxios.post("/api/teacherdelmyannouncements", {
      _id: delAnnouncementid,
    });
    var data = response.data;

    if (data.error) {
      throw new Error(data.error);
    } else {
      getMyAnnouncementsTeacher(setAnnouncements);
    }
  } catch (error) {
    toast.error(`Error while deleting teachermyannouncement! ${error}`);
  }
}
export async function uploadSignaturePicture(formData) {
  try {
    const response = await httpAxios.post("/api/teacheruploadsign", formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Set the content type for FormData
      },
    });
    var data = response.data;
    if (response.status === 200) {
      toast.error(data.status);
    } else {
      throw new Error("Failed to upload profile picture");
    }
  } catch (error) {
    toast.error(`Error while uploading profile picture! ${error}`);
  }
}
export async function postAnnouncementTeacher(requestBody) {
  try {
    const response = await httpAxios.post(
      "/api/teacherpostannouncement",
      requestBody
    );
    const data = response.data;

    if (data.error) {
      throw new Error(data.error);
    } else {
      toast.error("Submitted!");
    }
  } catch (error) {
    toast.error(`Error occured while posting! ${error}`);
  }
}

export async function getAllStudentsForTeacher(setAllUser) {
  try {
    const response = await httpAxios.post("/api/teacherfetchstudents");
    var data = response.data;

    if (data.error) {
      throw new Error(data.error);
    } else {
      setAllUser(data.students);
    }
  } catch (error) {
    toast.error(`Error fetching all students! ${error}`);
  }
}

export async function getAStudentforTeacher(id, setUserData, setInterns) {
  try {
    const response = await httpAxios.post("/api/teacherfetchastudent/", {
      id: id,
    });
    const data = response.data;

    if (data.error) {
      throw new Error(data.error);
    } else {
      const userData = data.student;
      const completedInterns = data.interns;
      const requestedInterns = data.internreqs;
      setUserData(userData);
      setInterns({
        completedInterns: completedInterns,
        requestedInterns: requestedInterns,
      });
    }
  } catch (error) {
    toast.error(`Error while fetching a student's profile! ${error}`);
  }
}

export async function getMyRequestsTeacher(setRequests) {
  try {
    const response = await httpAxios.get("/api/teachergetmyrequests");
    var data = response.data;

    if (data.error) {
      throw new Error(data.error);
    } else {
      data = data.requests;
      if (Array.isArray(data)) {
        // `data` is an array, you can safely call reverse on it
        data.reverse();
      }
      setRequests(data);
    }
  } catch (error) {
    toast.error(`Error fetching teachermyrequests! ${error}`);
  }
}

export async function approveRequestTeacher(setRequests, ApproveReqId) {
  try {
    const response = await httpAxios.post("/api/teacherapproverequest", {
      id: ApproveReqId,
    });
    var data = response.data;

    if (data.error) {
      throw new Error(data.error);
    } else {
      getMyRequestsTeacher(setRequests);
    }
  } catch (error) {
    toast.error(`Error while approving a request! ${error}`);
  }
}

export async function declineRequestTeacher(
  setRequests,
  DeclineReqId,
  DeclineMsg
) {
  try {
    const response = await httpAxios.post("/api/teacherdeclinerequest", {
      id: DeclineReqId,
      declinemsg: DeclineMsg,
    });
    var data = response.data;

    if (data.error) {
      throw new Error(data.error);
    } else {
      getMyRequestsTeacher(setRequests);
    }
  } catch (error) {
    toast.error(`Error while declining a request! ${error}`);
  }
}
