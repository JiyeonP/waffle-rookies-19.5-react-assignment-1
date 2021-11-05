import styles from "./Profile.module.css";

const Profile = ({ targetStudent }) => {
  return (
    <div>
      <div className={styles.profile2ImgWrapper}>
        {targetStudent.profile_img ? (
          <img
            className={styles.profile2Img}
            src={targetStudent.profile_img}
            alt="profile img"
          />
        ) : (
          <img
            className={styles.profile2Img}
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/600px-No_image_available.svg.png"
            alt="no profile img"
          />
        )}
      </div>
      <div className={styles.profile2}>
        <div className={styles.profile2Line}>
          <p className={styles.profile2Index}>이름</p>
          <div className={styles.profile2Value}> {targetStudent.name}</div>
        </div>
        <div className={styles.profile2Line}>
          <p className={styles.profile2Index}>학년</p>
          <div className={styles.profile2Value}> {targetStudent.grade}</div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
