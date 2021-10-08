import "./ViewProfile.css";
import { useHistory } from "react-router-dom";
import API from "../../API";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useAuthContext} from "../../Context/AuthContext";

const ViewProfile = ({selectedStudentId}) => {
  const {setLogin} = useAuthContext();
  const [selectedStudent, setSelectedStudent] = useState(false);

  useEffect(()=>{
    API.get(`/student/${selectedStudentId}`).then((res)=>{
      setSelectedStudent(res.data);
    }).catch((error) => {
      if (error.response.status === 401){
        toast.error("토큰이 만료되었습니다.")
        localStorage.setItem("isLogin", "no");
        localStorage.setItem("token", "none");
        setLogin(false);
      }
      setSelectedStudent(false);
    })
  }, [selectedStudentId])

  const history = useHistory();

  const goDetail = () => history.push(`/student/${selectedStudentId}`);

  return (
    <div className="profile1Wrapper">
      {!selectedStudent ? (
        <div className="emptyView">왼쪽 표에서 학생을 선택해 주세요.</div>
      ) : (
        <div className="profile1Page">
          <div className="profile1Header">
            <img
              className="goDetailImg"
              onClick={goDetail}
              src="https://cdn-icons-png.flaticon.com/512/724/724938.png"
              alt="상세 페이지로"
            />
          </div>
          <div className="profile1ImgWrapper">
            {selectedStudent.profile_img ? (
              <img
                className="profile1Img"
                src={selectedStudent.profile_img}
                alt="profile img"
              />
            ) : (
              <img
                className="profile1Img"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/600px-No_image_available.svg.png"
                alt="no profile img"
              />
            )}
          </div>
          <div className="profile1">
            <div className="profile1Line">
              <p className="profile1Index">이름</p>
              <div className="profile1Value"> {selectedStudent.name}</div>
            </div>
            <div className="profile1Line">
              <p className="profile1Index">학년</p>
              <div className="profile1Value"> {selectedStudent.grade}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewProfile;
