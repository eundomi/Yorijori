import React from "react";
import styled, { css } from "styled-components";
import PostTemplete from "../PostTemplete";
import { StyledP, ContainerDiv } from "../commonStyle";
import { Dropdown } from "react-dropdown-now";
import CategoryDropdown from "./CategoryDropdown";
import CookInfoDropdown from "./CookInfoDropdown";

const PostStepFour = () => {
  return (
    <PostTemplete stepNum={4} page={4} request={"추가정보를 입력해 주세요.(필수)"}>
      <StyledP stepFour>카테고리(필수)</StyledP>
      {/* <ContainerDiv drop> */}
      <CategoryDropdown />
      {/* </ContainerDiv> */}

      <StyledP stepFour>요리정보(필수)</StyledP>
      {/* <ContainerDiv drop small> */}
      <CookInfoDropdown />
      {/* </ContainerDiv> */}
    </PostTemplete>
  );
};

export default PostStepFour;
