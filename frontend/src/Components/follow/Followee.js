import styled, { css } from "styled-components";
import { Link, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import BottomNav from "../nav/BottomNav";
import TopNav from "../nav/TopNav";
import { useRecoilValue } from "recoil";
import { userIdAtom } from "../../states";

const MyFollowee = () => {
  const { userId } = useParams();
  const authId = useRecoilValue(userIdAtom);
  const [myFolloweeList, setMyFolloweeList] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/user/${authId}/followee`)
      .then((response) => response.json())
      .then((data) => setMyFolloweeList(data.followees))

      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <TopNav />
      <MainBox>
        <p>나의 팔로워</p>
      </MainBox>
      {myFolloweeList.map((item, index) => {
        return (
          <FolloweeListBox key={index}>
            <Link to={`/user/${item.followeeId.id}/profile`}>
              <FolloweeInfoBtnBox>
                <img
                  src={
                    item.followeeId.profileImage
                      ? item.followeeId.profileImage
                      : "../../images/onlylogo.png"
                  }
                ></img>
                <span>{item.followeeId.nickName}</span>
              </FolloweeInfoBtnBox>
            </Link>
          </FolloweeListBox>
        );
      })}

      <BottomNav />
    </div>
  );
};

const MainBox = styled.div`
  display: flex;
  justify-content: center;
  margin: 40px;
  height: 30px;

  p {
    position: relative;
    top: 10px;
    right: 110px;
    color: #fcad2c;
    font-weight: bold;
  }
`;

const FolloweeListBox = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;

  a {
    text-decoration: none;
  }
`;

const FolloweeInfoBtnBox = styled.button`
  width: 320px;
  height: 50px;
  display: flex;
  align-items: center;
  margin-top: 14px;
  background-color: white;
  border: none;
  border-radius: 14px;
  cursor: pointer;

  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }

  span {
    margin-left: 10px;
    font-size: 14px;
  }

  :hover {
    background-color: #f9f8f8;
  }
`;
export default MyFollowee;
