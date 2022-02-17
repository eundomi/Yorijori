import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { dropDownOptionsState } from "../../states/ViewAllAtom";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import { searchAtom } from "../nav/NavAtom";
import axios from "axios";
import CategoryDropdown from "../post/PostStepFour/CategoryDropdown";
const Postzone = () => {
  const filteredData = useRecoilValue(searchAtom);
  const [page, setPage] = useState(1);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const dropDownOptions = useRecoilValue(dropDownOptionsState);
  const setDropDownOptions = useSetRecoilState(dropDownOptionsState);
  console.log("레시피페이지 렌더링");
  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight) {
      console.log("페이지 끝입니다.");
      setPage((prev) => prev + 1);
    }
  };

  const getRecipe = () => {
    try {
      const query = String(filteredData);
      const urlAll = `http://localhost:8080/post?startIndex=${page}&limit=10`;
      const urlSearch = `http://localhost:8080/post?recipeName=${query}`;

      let url;
      if (query) {
        url = urlSearch;
        const fetchData = async () => {
          // setLoading(true);
          const result = await axios(url);

          setRecipes(result.data);

          // setLoading(false);
        };
        fetchData();
      } else {
        url = urlAll;
        const fetchData = async () => {
          // setLoading(true);
          const result = await axios(url);
          const resultrecipes = recipes.concat(result.data.limitedSortedPosts);
          setRecipes(resultrecipes);
          // setLoading(false);
        };
        fetchData();
      }
    } catch {
      console.error("에러");
    }
  };

  useEffect(() => {
    getRecipe();
    // console.log("1", recipes, filteredData);
    // if (page <= (Math.ceil(recipes.length) + 10) / 10) {
    //   console.log("page?", page);
    //   // console.log(recipes);
    //   // console.log(recipes.length);
    // }
  }, [filteredData, page]);
  // console.log("2", recipes, filteredData);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    // console.log("3", recipes, filteredData);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  if (dropDownOptions.category) {
    console.log(dropDownOptions.category, "카테고리가 생겼어요");
    // const url = `http://localhost:8080/post/withFilter?category=${dropDownOptions.category}`;

    // const fetchData = async () => {
    //   // setLoading(true);
    //   const result = await axios(url);
    //   const resultrecipes = recipes.concat(result.data.limitedSortedPosts);
    //   setRecipes(resultrecipes);
    //   // setLoading(false);
    // };
    // fetchData();
  }
  // else console.log("카테고리가 생겼어요");
  if (dropDownOptions.material) {
    console.log("material가 생겼어요");
  }
  // else console.log("material가 생겼어요");
  if (dropDownOptions.condition) {
    console.log("condition가 생겼어요");
  }
  // else console.log("condition가 생겼어요");
  if (dropDownOptions.cook) {
    console.log("cook가 생겼어요");
  }
  // else console.log("cook가 생겼어요");
  console.log(recipes);
  return (
    <Wrapper>
      <WrapperPost>
        {recipes.map((data, index) => {
          let recipeName = data.recipeName;
          let nickname = data.userId.nickName;
          if (recipeName.length > 20) {
            recipeName = recipeName.substring(0, 19) + "…";
          }
          return (
            <Link
              to={`/detail/${data._id}`}
              style={{ textDecoration: "none", color: "inherit" }}
              nickname={nickname}
              title={recipeName}
              key={index}
            >
              <div>
                <Img src={data.thumbnail} />
                <TextBox>
                  <Title>{recipeName}</Title>
                  <Author>{nickname}</Author>
                  <WrapperHeartComment>
                    <span className="sprite heart" />{" "}
                    <HeartCommentCount>{data.numLikes}</HeartCommentCount>
                    <span className="sprite comment" />{" "}
                    <HeartCommentCount>{data.numComments}</HeartCommentCount>
                  </WrapperHeartComment>
                </TextBox>
              </div>
            </Link>
          );
        })}
      </WrapperPost>
    </Wrapper>
  );
};
export default Postzone;

const Wrapper = styled.div`
  // overflow: scroll;
  text-align: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  .sprite {
    display: inline-block;
    flex-shrink: 0;
    background-image: url(${process.env.PUBLIC_URL + "./images/icons.png"});
    background-repeat: no-repeat;
    background-size: 66.34px 30px;
  }
  .heart {
    width: 16px;
    height: 16px;
    background-position: -16px 3.8px;
  }
  .comment {
    width: 16px;
    height: 16px;
    background-position: -16px -13px;
  }
`;
const WrapperPost = styled.div`
  // overflow: scroll;
  display: grid;
  margin-top: 15px;
  grid: auto-flow 270px / repeat(2, 175px);
  justify-content: center;
  align-items: center;
  justify-items: center;
  & > div {
    width: 160px;
    height: 228px;
  }
`;
const Img = styled.img`
  width: 160px;
  height: 147px;
  border-radius: 10px;
  object-fit: cover;
`;
const TextBox = styled.div`
  width: 160px;
  height: 73px;
  margin-top: 8px;
  font-weight: 900;
  text-align: left;
`;
const Title = styled.p`
  font-size: 16px;
  margin: 0px;
`;
const Author = styled.p`
  font-size: 13px;
  margin: 5px 0 10px 0;
`;
const WrapperHeartComment = styled.div`
  line-height: 15px;
`;
const HeartCommentCount = styled.span`
  font-size: 13px;
  margin-right: 8px;
`;
