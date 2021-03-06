import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { pageStateAtom } from "../../states";
import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";
import { authAtom } from "../../states";
import { userIdAtom } from "../../states";
import swal from "sweetalert";

const BottomNav = ({ post }) => {
  const pageState = useRecoilValue(pageStateAtom);
  const authCheck = useRecoilValue(authAtom);
  const authId = useRecoilValue(userIdAtom);

  const gotoPost = () => {
    if (!authCheck) {
      swal({
        title: "로그인 하러가기",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((res) => {
        if (res) {
          navigate("/login");
        }
      });
      return;
    }
    navigate("/post");
  };

  const navigate = useNavigate();
  return (
    <BottomNavBlock post={post}>
      <IconImg pageState={pageState} post onClick={gotoPost} />
      <IconImg pageState={pageState} home onClick={() => navigate("/")} />
      <IconImg pageState={pageState} recipe onClick={() => navigate("/view_all")} />
      {authCheck ? (
        <IconImg pageState={pageState} mypage onClick={() => navigate(`/user/${authId}/profile`)} />
      ) : (
        <IconImg pageState={pageState} mypage onClick={() => navigate("/login")} />
      )}
    </BottomNavBlock>
  );
};

export default BottomNav;

const BottomNavBlock = styled.div`
  height: 90px;
  width: 100%;
  position: fixed;
  bottom: 0px;
  display: flex;
  /* flex-direction: row; */
  border-top: 1px solid #c5c5c5;
  background-color: white;
  justify-content: center;
`;

const IconImg = styled.div`
  width: 90px;
  background-image: url(../../images/BottomIcon.png);
  background-position: ${({ post, home, recipe, mypage, pageState }) =>
    post
      ? "-30px -15px"
      : home
      ? "-111px -15px"
      : recipe
      ? "-205px -15px"
      : mypage
      ? "-294px -15px"
      : ""};

  background-position: ${({ post, home, recipe, mypage, pageState }) =>
    post && pageState === "post"
      ? "-30px  94px"
      : home && pageState === "home"
      ? "-111px  94px"
      : recipe && pageState === "viewAllPage"
      ? "-205px 94px"
      : mypage && pageState === "myPage"
      ? "-294px  94px"
      : ""};
`;
