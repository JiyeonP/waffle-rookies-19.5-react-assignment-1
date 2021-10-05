import "./PopUp.css";
import React, { useEffect, useState } from "react";

const PopUp = ({closePopUp}) => {
  const [check24, setCheck24] = useState(false);

  const handleClosePopUp = () => {
    closePopUp(check24);
  };

  const handleCheck = () => {
    setCheck24(!check24);
  };

  return (
    <>
      <div className="popUpBox">
        <div className="popUpContents">
          <img className="popUpImg" src="http://img1.tmon.kr/cdn3/deals/2020/10/26/4607121450/4607121450_front_04c1d557af.jpg" alt="빈츠" />
        </div>
        <div className="popUpCloseLine">
          <p className="popUpCheckMessage">24시간 동안 보지 않기</p>
          <input
            type="checkBox"
            className="popUpCheck"
            onChange={handleCheck}
            checked={check24}
          />
          <button className="popUpClose" onClick={handleClosePopUp}>
            닫기
          </button>
        </div>
      </div>
    </>
  );
};

export default PopUp;
