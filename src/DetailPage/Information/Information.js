import "./Information.css";
import { useState, useEffect } from "react";
import { useStudentContext } from "../../Context/StudentContext";
import NumberFormat from "react-number-format";

const Information = ({ changedStudent, handlePhoneChange, handleEmailChange, handleMajorChange, handleProfileImgChange }) => {
  return (
    <div>
      <div className="infoHeader">정보</div>
      <div className="infoBox">
        <div className="info">
          <div className="infoLine">
            <p className="infoIndex">전화번호</p>
            <NumberFormat
              className="infoInput"
              value={changedStudent.phone}
              format="###-####-####"
              mask="_"
              onValueChange={(values) => handlePhoneChange(values)}
            />
          </div>
          <div className="infoLine">
            <p className="infoIndex">이메일</p>
            <div className="infoInput">
              <input
                className="emailInput"
                value={changedStudent.email}
                onChange={(e) => handleEmailChange(e)}
              />
              <div className="waffleEmail">@waffle.hs.kr</div>
            </div>
          </div>
          <div className="infoLine">
            <p className="infoIndex">전공</p>
            <select className="infoInput" value={changedStudent.major} onChange={(e) => handleMajorChange(e)}>
              <option value="frontend" >frontend</option>
              <option value="backend">backend</option>
              <option value="android">android</option>
              <option value="iOS">iOS</option>
              <option value="design">design</option>
            </select>
          </div>
          <div className="infoLine">
            <p className="infoIndex">프로필</p>
            <input
              className="infoInput"
              value={changedStudent.profileImg}
              onChange={(e) => handleProfileImgChange(e)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Information;
