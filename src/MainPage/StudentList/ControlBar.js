import "./ControlBar.css";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const ControlBar = () => {
  const history = useHistory();
  const [searchName, setSearchName] = useState("");
  const [searchGrade, setSearchGrade] = useState("");

  const ControlBar = styled.div`
        position: relative;
        width: calc(50% - 30px);
        height: 20px;
        left: 20px;
        top: 100px;
    `;

  const Search = styled.input`
        position: relative;
        width: 80px;
        margin-right: 10px;
    `;

  const SearchButton = styled.button`
        position: absolute;
        width: 50px;
        height: 22px;
        right: 0px;
        top: 2px;
    
        font-size: 10px;
        font-weight: bold;
    `;

  const goSearched = () => {
      if (searchName.length !== 0){
          if (searchGrade.length !== 0){
              history.push({
                  pathname: "/students",
                  search: `?name=${searchName}&grade=${searchGrade}`,
              });
          } else {
              history.push({
                  pathname: "/students",
                  search: `?name=${searchName}`,
              });
          }
      } else {
          if (searchGrade.length !== 0){
              history.push({
                  pathname: "/students",
                  search: `grade=${searchGrade}`,
              });
          } else {
              history.push("/students");
          }
      }

  };

  return (
    <ControlBar>
      <Search
        placeholder="이름"
        value={searchName}
        onChange={(e) => {
          setSearchName(e.target.value);
        }}
      />
      <Search
        placeholder="학년"
        value={searchGrade}
        onChange={(e) => {
          setSearchGrade(e.target.value);
        }}
        type="number"
      />
      <SearchButton onClick={goSearched}>
        검색
      </SearchButton>
    </ControlBar>
  );
};

export default ControlBar;
