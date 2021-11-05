import { useHistory } from "react-router-dom";
import styled from "styled-components";

const ViewProfile = ({ selectedStudentId, studentList }) => {
  const selectedStudent = studentList.find((student) => student.id === selectedStudentId);
  const history = useHistory();

  const goDetail = () => history.push(`/student/${selectedStudent.id}`);

  const Profile1Wrapper = styled.div`
    position: absolute;
    top: 272px;
    left: calc(50% + 13px);
    width: 346px;
    height: 404px;

    border: 1px solid #c7c7c7;
    box-sizing: border-box;
  `;

  const EmptyView = styled.div`
    text-align: center;
    font-size: 12px;
    line-height: 400px;
  `;

  const Profile1Page = styled.div`
    position: relative;
    width: 100%;
    height: 100%;

    box-sizing: border-box;
  `;

  const Profile1Header = styled.div`
    margin: 10px;
    height: 25px;
  `;

  const GoDetailImg = styled.img`
    position: relative;
    left: calc(100% - 20px);
    width: 20px;
    height: 20px;
    &:hover {
      transform: scale(1.1);
    }
  `;

  const Profile1ImgWrapper = styled.div`
    position: relative;
    width: 200px;
    height: 200px;
    top: calc(50% - 185px);
    left: calc(50% - 100px);
  `;

  const Profile1Img = styled.img`
    width: 200px;
    height: 200px;

    border: 1px solid #5d5d5d;
    border-radius: 50%;
  `;

  const Profile1 = styled.div`
    position: absolute;
    width: 300px;
    height: 100px;
    left: calc(50% - 150px);
    top: 270px;
    display: table;
    padding: 10px;

    background-color: white;
    box-sizing: border-box;
  `;

  const Profile1Line = styled.div`
    margin: 5px;
    width: 100%;
    height: 20px;

    display: flex;
  `;

  const Profile1Index = styled.p`
    position: relative;
    width: 60px;
    left: 10px;
    line-height: 0px;

    font-size: 10px;
  `;

  const Profile1Value = styled.div`
    position: relative;
    width: 200px;
    height: 20px;
    left: 0px;
    padding: 2px;

    color: #7d7d7d;
    font-size: 10px;
    background: #f4f4f4;
    border: 1px solid #c2c2c2;
    box-sizing: border-box;
  `;

  return (
    <Profile1Wrapper>
      {selectedStudent === null || selectedStudent === undefined ? (
        <EmptyView>왼쪽 표에서 학생을 선택해 주세요.</EmptyView>
      ) : (
        <Profile1Page>
          <Profile1Header>
            <GoDetailImg
              onClick={goDetail}
              src="https://cdn-icons-png.flaticon.com/512/724/724938.png"
              alt="상세 페이지로"
            />
          </Profile1Header>
          <Profile1ImgWrapper>
            {selectedStudent.profile_img ? (
              <Profile1Img
                src={selectedStudent.profile_img}
                alt="profile img"
              />
            ) : (
              <Profile1Img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/600px-No_image_available.svg.png"
                alt="no profile img"
              />
            )}
          </Profile1ImgWrapper>
          <Profile1>
            <Profile1Line>
              <Profile1Index>이름</Profile1Index>
              <Profile1Value> {selectedStudent.name}</Profile1Value>
            </Profile1Line>
            <Profile1Line>
              <Profile1Index>학년</Profile1Index>
              <Profile1Value> {selectedStudent.grade}</Profile1Value>
            </Profile1Line>
          </Profile1>
        </Profile1Page>
      )}
    </Profile1Wrapper>
  );
};

export default ViewProfile;
