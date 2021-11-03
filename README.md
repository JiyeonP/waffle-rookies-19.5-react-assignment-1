# waffle-rookies-19.5-react-assignment-3

## **와플고등학교 인원 관리 페이지 만들기**

## 개발 환경

- OS
  - Windows 10 (wsl2)
- Linux distribution
  - Ubuntu
- IDE
  - Webstorm

---

## 배포

- [go here](https://d3arh86hafsfhz.cloudfront.net)

---

## Notice

- 메인 페이지(MainPage)에 `logout` 버튼 추가

  - 누를 시 localStorage의 token과 isLogin, 그리고 context의 login state가 초기화 되어, `'/login'`으로 redirect
    ![image](https://user-images.githubusercontent.com/66158942/136619326-195de75c-566d-4a13-9323-865fb0a4022e.png)

- 학생 상세 페이지(DetailPage)에서 `취소` 버튼 추가

  - 취소 버튼 누르면 (저장 이후) 지금까지 변경한 내용 되돌림
    ![image](https://user-images.githubusercontent.com/66158942/136619399-28f069c5-9449-4e04-b636-ec25bcad1b0f.png)

- 학생 상세 페이지(DetailPage)에서 `잠금` 버튼 누를 때 조건 추가
  - 변경한 내용이 있으면 잠금되지 않으며, 취소 혹은 저장을 요구하는 토스트를 띄움
    ![image](https://user-images.githubusercontent.com/66158942/136619448-5b7d24e7-2def-4d79-8f1f-9bb137e4e586.png)
- 학생 상세 페이지(DetailPage)에서 저장`, `잠금`, `해제` 수행 시에 토스트 띄움
  - 저장
    ![image](https://user-images.githubusercontent.com/66158942/136619752-ed75c8c3-7db8-414f-a66c-5691aa9b66ec.png)
  - 잠금
    ![image](https://user-images.githubusercontent.com/66158942/136619657-d1bd74cf-0b49-4396-b9a2-ed1bd5014a6d.png)
  - 해제
    ![image](https://user-images.githubusercontent.com/66158942/136619683-a593a073-a764-49b5-bbbf-d31040d7813e.png)
- 학생 추가, 코멘트 입력 시에 input 창에서 `Enter` 키를 누르면 저장/작성 실행

- 토큰 만료 시 서버와 통신하는 작업을 수행하려고 하면, axios의 error code 401을 받아와 자동 로그아웃

- axios에서 catch로 error code 400, 401 이외의 다른 에러를 받을 시에 서버에 문의하라는 에러 토스트 띄움

- 댓글에서 시간 표시할 때에, `dayjs` Library 사용
  - 사용 이유: Library size가 작고, format이 쉬움
