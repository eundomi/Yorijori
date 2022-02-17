import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Dropdown } from "react-dropdown-now";
import { useRecoilValue, useSetRecoilState } from "recoil";
import axios from "axios";
import {
  randomButtonState,
  randomPostState,
  dropDownOptionsState,
  sortState,
} from "../../states/ViewAllAtom";
import dummy from "../../posts.json";

const Buttons = () => {
  const setRandomButton = useSetRecoilState(randomButtonState);
  const setRandomPost = useSetRecoilState(randomPostState);
  const dropDownOptions = useRecoilValue(dropDownOptionsState);
  const setDropDownOptions = useSetRecoilState(dropDownOptionsState);
  const currentSortState = useRecoilValue(sortState);
  const setCurrentSortState = useSetRecoilState(sortState);
  const [recipes, setRecipes] = useState([]);
  const [page, setPage] = useState(1);

  const randompost = () => {
    setRandomButton(true);
  };

  const getRandomIndex = () => {
    let random = parseInt(Math.random() * recipes.length);
    setRandomPost(recipes[random]);
  };

  const clearDropDownOptions = (e) => {
    if (e.target.id === "famous") {
      setCurrentSortState("famous");
    } else {
      setCurrentSortState("recent");
    }
  };

  // const getRecipe = async () => {
  //   try {
  //     const url = `http://localhost:8080/post`;

  //     const fetchData = async () => {
  //       // setLoading(true);
  //       const result = await axios(url);
  //       const resultrecipes = recipes.concat(result.data.limitedSortedPosts);
  //       setRecipes(resultrecipes);
  //       // setLoading(false);
  //     };
  //     fetchData();
  //   } catch {
  //     console.error("에러");
  //   }
  // };

  // useEffect(() => {
  //   if (page <= (Math.ceil(recipes.length) + 10) / 10) {
  //     console.log("page?", page);
  //     getRecipe();
  //   }
  // });

  useEffect(() => {
    const defaultName = document.querySelectorAll(".rdn-control-placeholder");
    const defaultCategory = ["category", "material", "condition", "cook"];
    const defaultNameList = ["종류", "재료", "상황", "방법"];

    defaultName.forEach((item, index) => {
      if (!dropDownOptions[defaultCategory[index]]) {
        item.innerText = defaultNameList[index];
      } else {
        item.innerText = dropDownOptions[defaultCategory[index]];
      }
    });
    // getRecipe();
    // if (page <= (Math.ceil(recipes.length) + 10) / 10) {
    //   console.log("page?", page);
    //   getRecipe();
    // }
  }, [page]);

  return (
    <>
      <Wrapper>
        <ButtonWrapper currentValue={currentSortState}>
          <button id="famous" onClick={clearDropDownOptions}>
            인기순
          </button>
          <button id="recent" onClick={clearDropDownOptions}>
            최신순
          </button>
          <RandomButtonWapper
            onClick={() => {
              randompost();
              getRandomIndex();
            }}
          >
            <div />
            <p>랜덤메뉴</p>
          </RandomButtonWapper>
        </ButtonWrapper>
        <Line />
      </Wrapper>
    </>
  );
};
export default Buttons;

const Wrapper = styled.div`
  text-align: center;
`;

const ButtonWrapper = styled.div`
  margin: 12px 0px;
  & > button {
    width: 95px;
    height: 45px;
    color: white;
    border: 2px solid #feae11;
    border-radius: 50px;
    line-height: 36px;
    font-size: 16px;
    font-weight: 900;

    &:first-child {
      margin-right: 16px;
    }
  }
  #famous {
    background-color: ${(props) => (props.currentValue === "famous" ? "#feae11" : "white")};
    color: ${(props) => (props.currentValue === "famous" ? "white" : "#feae11")};
  }
  #recent {
    background-color: ${(props) => (props.currentValue === "recent" ? "#feae11" : "white")};
    color: ${(props) => (props.currentValue === "recent" ? "white" : "#feae11")};
  }
`;

const RandomButtonWapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  right: 15px;
  top: 89px;
  & > div {
    background-color: transparent;
    background-image: url(${process.env.PUBLIC_URL + "../images/randomButton.png"});
    background-size: cover;
    border: none;
    width: 27px;
    height: 38px;
  }
  & > p {
    width: 44px;
    color: #feae11;
    font-size: 11px;
    font-weight: 900;
    margin: 0;
  }
`;

const Line = styled.div`
  width: 360px;
  height: 1px;
  background-color: rgba(0, 0, 0, 0.14);
`;
