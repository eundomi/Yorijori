import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { authAtom } from "../states";
import { useUserActions } from "../actions";
import BottomNav from "../Components/nav/BottomNav";
import TopNav_main from "../Components/nav/TopNav_main";
import FileUpload from "@mimoid-prog/react-file-upload";

const ImgWrapper = styled.div`
  position: relative;
  .preview {
    display: flex;
    flex-direction: column;

    width: 100px;
  }
  .fileName {
    display: none;
  }
  .fileSize {
    display: none;
  }
  .deleteBtn {
    position: absolute;
    top: 110px;
    left: 27px;
    color: orange;
  }
`;

const HomeBlock = styled.div`
  position: relative;
`;
const Home = () => {
  console.log("랜더링");
  const userActions = useUserActions();
  const [state, setState] = useState({
    isLogin: false,
  });
  const checkLoginStatus = () => {
    if (JSON.parse(localStorage.getItem("user"))) {
      setState({
        isLogin: true,
      });
    }
  };
  useEffect(() => {
    checkLoginStatus();
  }, []);
  const handleChange = (file) => {
    console.log(file);
  };
  return (
    <HomeBlock>
      <TopNav_main />
      <div style={{ marginTop: "80px", paddingBottom: "90px" }}>
        <Link to="/login">
          <button>login</button>
        </Link>
        <Link to="/users/mypage">
          <button>mypage</button>
        </Link>
        <Link to="/oldpost">
          <button>oldpost</button>
        </Link>
        <Link to="/poststep1">
          <button>poststep1</button>
        </Link>
        <h3>Single file upload</h3>
        <ImgWrapper>
          <FileUpload name="photo3" onChange={handleChange} shape="rounded" size="big" />
        </ImgWrapper>
        {state.isLogin && <button onClick={userActions.logout}>logout</button>}
        <Link to="/view_all">
          <button>전체글 보기</button>
        </Link>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo natus molestiae modi
          similique, odit praesentium cupiditate temporibus in eum totam atque omnis alias quaerat,
          labore rem molestias, tempora dolore accusantium?
        </div>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo natus molestiae modi
          similique, odit praesentium cupiditate temporibus in eum totam atque omnis alias quaerat,
          labore rem molestias, tempora dolore accusantium?
        </div>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo natus molestiae modi
          similique, odit praesentium cupiditate temporibus in eum totam atque omnis alias quaerat,
          labore rem molestias, tempora dolore accusantium?
        </div>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo natus molestiae modi
          similique, odit praesentium cupiditate temporibus in eum totam atque omnis alias quaerat,
          labore rem molestias, tempora dolore accusantium?
        </div>{" "}
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo natus molestiae modi
          similique, odit praesentium cupiditate temporibus in eum totam atque omnis alias quaerat,
          labore rem molestias, tempora dolore accusantium?
        </div>{" "}
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo natus molestiae modi
          similique, odit praesentium cupiditate temporibus in eum totam atque omnis alias quaerat,
          labore rem molestias, tempora dolore accusantium?
        </div>{" "}
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo natus molestiae modi
          similique, odit praesentium cupiditate temporibus in eum totam atque omnis alias quaerat,
          labore rem molestias, tempora dolore accusantium?
        </div>{" "}
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo natus molestiae modi
          similique, odit praesentium cupiditate temporibus in eum totam atque omnis alias quaerat,
          labore rem molestias, tempora dolore accusantium?
        </div>{" "}
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo natus molestiae modi
          similique, odit praesentium cupiditate temporibus in eum totam atque omnis alias quaerat,
          labore rem molestias, tempora dolore accusantium?
        </div>
      </div>
      <BottomNav />
    </HomeBlock>
  );
};

export default Home;
