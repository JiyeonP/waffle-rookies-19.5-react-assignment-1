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
import API from "../API";
import { PuffLoader } from "react-spinners";
import { css } from "@emotion/react";

const DetailPage = () => {
  const [loading, setLoading] = useState(true);
  const [targetStudent, setTargetStudent] = useState({});
  const [changedStudent, setChangedStudent] = useState(targetStudent);
  const [deleteClicked, setDeleteClicked] = useState(false);
  const params = useParams();
  const history = useHistory();

  const mainLoaderCss = css`
    position: absolute;
    top: 250px;
    left: calc(50% - 75px);
  `;

  useEffect(() => {
    setLoading(true);
    API.get(`student/${params.id}`)
      .then((res) => {
        setTargetStudent(res.data);
        setChangedStudent({
          profile_img: res.data.profile_img,
          email: res.data.email,
          phone: res.data.phone,
          major: res.data.major,
        });
        setLoading(false);
      })
      .catch((error) => {
        if (error.response.status === 400) {
          toast.error(error.response.data.message);
          history.push("/students");
        } else {
          toast.error("오류가 발생하였습니다. 서버에 문의하십시오.");
        }
        setLoading(false);
      });
  }, []);

  const handleEmailChange = (e) => {
    if (e.target.value.includes("@")) {
      toast.error("@는 입력할 수 없습니다.");
      return;
    }
    if (e.target.value.includes(" ")) {
      toast.error("공백은 입력할 수 없습니다.");
      return;
    }
    const newChangedStudent = {
      ...changedStudent,
      email: e.target.value + "@waffle.hs.kr",
    };
    setChangedStudent(newChangedStudent);
  };

  const handlePhoneChange = (e) => {
    let phoneNumber = e.target.value;
    if (!"0123456789".includes(phoneNumber.slice(-1))) {
      phoneNumber = phoneNumber.slice(0, -1);
    }
    if (phoneNumber.length > 13) {
      phoneNumber = phoneNumber.slice(0, 13);
    }
    if (phoneNumber.length === 4 || phoneNumber.length === 9) {
      phoneNumber = phoneNumber.slice(0, -1) + "-" + phoneNumber.slice(-1);
    }
    const newChangedStudent = {
      ...changedStudent,
      phone: phoneNumber,
    };
    setChangedStudent(newChangedStudent);
  };

  const handleMajorChange = (e) => {
    let newChangedStudent = {};
    if (e.target.value === "not assigned") {
      newChangedStudent = { ...changedStudent, major: null };
    } else {
      newChangedStudent = { ...changedStudent, major: e.target.value };
    }
    setChangedStudent(newChangedStudent);
  };

  const handleProfileImgChange = (e) => {
    const newChangedStudent = {
      ...changedStudent,
      profile_img: e.target.value,
    };
    setChangedStudent(newChangedStudent);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await API.patch(`student/${params.id}`, changedStudent);
      const response2 = await API.get(`student/${params.id}`);

      toast.success("저장되었습니다.");
      setTargetStudent(response2.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error.response.status === 400) {
        toast.error(error.response.data.message);
      } else {
        toast.error("오류가 발생하였습니다. 서버에 문의하십시오.");
      }
    }
  };

  const handleConfirm = (v) => {
    setDeleteClicked(v);
  };

  const handleLock = () => {
    if (
      JSON.stringify(targetStudent) !==
      JSON.stringify({ ...targetStudent, ...changedStudent })
    ) {
      toast.error("변경 내용 저장 혹은 취소 후 잠금 버튼을 눌러주세요.");
      return;
    }
    if (!targetStudent.locked) {
      setLoading(true);
      API.post(`student/${params.id}/lock`)
        .then((res) => {
          toast.success(
            "잠금 설정했습니다. 이제 학생 정보를 수정하실 수 없습니다."
          );
          setLoading(false);
        })
        .catch((error) => {
          if (error.response.status === 400) {
            toast.error(error.response.data.message);
          } else {
            toast.error("오류가 발생하였습니다. 서버에 문의하십시오.");
          }
          setLoading(false);
        });
    } else {
      setLoading(true);
      API.post(`student/${params.id}/unlock`)
        .then((res) => {
          toast.success(
            "잠금 해제했습니다. 이제 학생 정보를 수정하실 수 있습니다."
          );
          setLoading(false);
        })
        .catch((error) => {
          if (error.response.status === 400) {
            toast.error(error.response.data.message);
          } else {
            toast.error("오류가 발생하였습니다. 서버에 문의하십시오.");
          }
          setLoading(false);
        });
    }
    setTargetStudent({ ...targetStudent, locked: !targetStudent.locked });
  };

  const handleCancel = () => {
    setChangedStudent(targetStudent);
  };

  const handleDelete = () => {
    setLoading(true);
    API.delete(`student/${params.id}`)
      .then((res) => {
        setLoading(false);
      })
      .catch((error) => {
        if (error.response.status === 400) {
          toast.error(error.response.data.message);
        } else {
          toast.error("오류가 발생하였습니다. 서버에 문의하십시오.");
        }
        setLoading(false);
      });
    history.push("/students");
  };

  return (
    <div className="detailWrapper">
      <div className="detailPage">
        <Buttons
          targetStudent={targetStudent}
          handleCancel={handleCancel}
          handleSave={handleSave}
          handleConfirm={handleConfirm}
          handleLock={handleLock}
        />
        <Profile targetStudent={targetStudent} />
        <Information
          changedStudent={changedStudent}
          handleEmailChange={handleEmailChange}
          handleMajorChange={handleMajorChange}
          handlePhoneChange={handlePhoneChange}
          handleProfileImgChange={handleProfileImgChange}
        />
        <Comments targetStudent={targetStudent} />
        <DeleteConfirm
          deleteClicked={deleteClicked}
          onConfirm={handleDelete}
          onCancel={() => handleConfirm(false)}
        />
        {targetStudent.locked ? <LockBox /> : null}
      </div>
      <PuffLoader
        color="#88dd88"
        loading={loading}
        css={mainLoaderCss}
        size={150}
        speedMultiplier={2}
      />
    </div>
  );
};

export default DetailPage;
