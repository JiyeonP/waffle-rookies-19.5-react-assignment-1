import "./DetailPage.css";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Profile from "./Profile/Profile";
import Buttons from "./Buttons/Buttons";
import Information from "./Information/Information";
import DeleteConfirm from "./DeleteConfirm/DeleteConfirm";
import Comments from "./Comments/Comments";
import LockBox from "./Information/LockBox";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API from "../API";
import { useAuthContext } from "../Context/AuthContext";

const DetailPage = () => {
  const { setLogin } = useAuthContext();
  const [changedStudent, setChangedStudent] = useState(targetStudent);
  const [deleteClicked, setDeleteClicked] = useState(false);
  const params = useParams();
  const history = useHistory();
  let targetStudent = {};

  useEffect(() => {
    API.get(`student/${params.id}`).then((res) => {
      targetStudent = { ...res.data, email: res.data.email.split["@"][0] };
    });
    setChangedStudent(targetStudent);
  }, []);

  const handleEmailChange = (e) => {
    if (e.target.value.includes("@")) {
      toast.error("@는 사용할 수 없습니다.");
      return;
    }
    const newChangedStudent = { ...changedStudent, email: e.target.value };
    setChangedStudent(newChangedStudent);
  };

  const handlePhoneChange = (values) => {
    const { value } = values;
    const newChangedStudent = {
      ...changedStudent,
      phone: value,
    };
    setChangedStudent(newChangedStudent);
  };

  const handleMajorChange = (e) => {
    const newChangedStudent = { ...changedStudent, major: e.target.value };
    setChangedStudent(newChangedStudent);
  };

  const handleProfileImgChange = (e) => {
    const newChangedStudent = {
      ...changedStudent,
      profile_img: e.target.value,
    };
    setChangedStudent(newChangedStudent);
  };

  const handleSave = () => {
    API.patch(`student/${params.id}`, {
      ...changedStudent,
      email: changedStudent.email + "@waffle.hs.kr",
    })
      .then((res) => {
        toast.success("저장되었습니다.");
      })
      .catch((error) => {
        if (error.response.status === 401) {
          toast.error("토큰이 만료되었습니다.");
          localStorage.setItem("isLogin", "no");
          localStorage.setItem("token", "none");
          setLogin(false);
        }
        toast.error(error.response.message);
      });
    targetStudent = changedStudent;
  };

  const handleConfirm = (v) => {
    setDeleteClicked(v);
  };

  const handleLock = () => {
    setChangedStudent({ ...targetStudent, locked: !changedStudent.locked });

    API.patch(`student/${params.id}`, {
      ...changedStudent,
      email: changedStudent.email + "@waffle.hs.kr",
      locked: true,
    }).catch((error) => {
      if (error.response.status === 401) {
        toast.error("토큰이 만료되었습니다.");
        localStorage.setItem("isLogin", "no");
        localStorage.setItem("token", "none");
        setLogin(false);
      }
      toast.error(error.response.message);
    });
  };

  const handleCancel = () => {
    setChangedStudent({
      ...targetStudent,
      email: targetStudent.email.split("@")[0],
      locked: false,
    });
  };

  const handleDelete = () => {
    API.delete(`student/${params.id}`).catch((error) => {
      if (error.response.status === 401) {
        toast.error("토큰이 만료되었습니다.");
        localStorage.setItem("isLogin", "no");
        localStorage.setItem("token", "none");
        setLogin(false);
      }
      toast.error(error.response.message);
    });
    history.push("/students");
  };

  return (
    <div className="detailWrapper">
      <div className="detailPage">
        <Buttons
          changedStudent={changedStudent}
          setChangedStudent={setChangedStudent}
          handleCancel={handleCancel}
          handleSave={handleSave}
          handleConfirm={handleConfirm}
          handleLock={handleLock}
        />
        <Profile changedStudent={changedStudent} />
        <Information
          changedStudent={changedStudent}
          handleEmailChange={handleEmailChange}
          handleMajorChange={handleMajorChange}
          handlePhoneChange={handlePhoneChange}
          handleProfileImgChange={handleProfileImgChange}
        />
        <Comments />
        <DeleteConfirm
          deleteClicked={deleteClicked}
          onConfirm={handleDelete}
          onCancel={() => handleConfirm(false)}
        />
        {changedStudent.locked ? <LockBox /> : null}
      </div>
    </div>
  );
};

export default DetailPage;
