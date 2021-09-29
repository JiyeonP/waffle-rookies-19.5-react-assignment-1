import "./LockBox.css";

const LockBox = () => {
  return (
    <div>
      <div className="lockBox" />
      <img
        className="lockImg"
        src="https://cdn-icons-png.flaticon.com/512/3064/3064155.png"
        alt="잠금 사진"
      />
      <p className="lockMessage">수정하려면 잠금을 해제하세요</p>
    </div>
  );
};

export default LockBox;
