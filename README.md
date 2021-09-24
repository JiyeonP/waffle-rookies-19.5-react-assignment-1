# waffle-rookies-19.5-react-assignment-1

## **와플고등학교 인원 관리 프로그램 간소화 페이지 만들기**

#### 목표

###### React components를 이해하고 다루는 방법을 익힌다

#### 개발 환경

###### OS: Windows 10 (wsl2)

###### Linux distribution: Ubuntu

###### IDE: Webstorm

---

### 구성 요소

- Header

  - Waffle Logo
    - 클릭 시 https://wafflestudio.com/ 새 탭으로 열기
      ![Header](https://user-images.githubusercontent.com/66158942/132727706-6341fa34-c100-4cbd-96c7-dfbe7c574727.JPG)

- Dash Board

  - 향후 사용할 대시보드 공간
    ![Dash_Board](https://user-images.githubusercontent.com/66158942/132727659-101c34cd-8fed-44d9-876f-c13af147e508.JPG)

- Student List
  - Control Bar + 검색창과 새 학생을 추가하는 버튼![Header]
    ![Control_Bar](https://user-images.githubusercontent.com/66158942/132727728-e89e18f5-c8fd-496d-a5de-da0bbd2b1dc5.JPG) + 추가 버튼 누르면 추가 가능한 모달 서서히 열림
    ![AddModal](https://user-images.githubusercontent.com/66158942/132727746-54d3634f-6c3a-48e8-9936-5692dc9fe955.JPG)
  - List + 현재 등록된 학생 목록 + 선택 시 Profile 창 열림
    ![List](https://user-images.githubusercontent.com/66158942/132727777-22f88aa0-cf50-4ef0-8dfd-6e058cefb4b4.JPG)
- Profile
  - 선택된 학생의 상세 뷰
  - 수정 후 저장 버튼과 삭제 버튼 존재
    ![Profile](https://user-images.githubusercontent.com/66158942/132727793-bc15e920-b49e-462d-ab3f-a29b4fe08583.JPG)

---

### 조건

- 학년은 1, 2, 3만, 이름은 2글자 또는 3글자만 가능
  ![image](https://user-images.githubusercontent.com/66158942/132727918-dfa0a27d-47f8-4580-9a8c-9535bac1cc77.png)
- 같은 학년에 동명이인이 존재할 수 없음
  ![image](https://user-images.githubusercontent.com/66158942/132728113-08de465f-6317-4e8f-9b9e-ef08144dab40.png)
- 학생 수가 많아 리스트 칸 넘어가면 스크롤 기능 추가
- 새로 추가한 학생을 항상 선택
  ![conditionJPG](https://user-images.githubusercontent.com/66158942/132728228-8b487493-19ea-4a7f-b8f3-02ff80b72ac2.JPG)

---
### Problems
- Cannot remove the white border of the PieChart(DashBoard) label
