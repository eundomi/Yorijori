import "./App.css";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PostAemdPage from "./pages/PostAemdPage";
// import OldPostPage from "./pages/OldPostPage";
import MyPage from "./pages/MyPage";
import MyPageEdit from "./pages/MyPageEdit";
import ViewAllPage from "./pages/ViewAllPage";
import PostDetailPage from "./pages/PostDetailPage";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import Home from "./pages/Home";
import PostPage from "./pages/PostPage";
import MoreComments from "./Components/postDetail/MoreComments";
import KakaoAuth from "./pages/KakaoAuth";
import Followee from "./pages/Followee";
import Follower from "./pages/Follower";

function App() {
  return (
    <RecoilRoot>
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<LoginPage />} path="/login" />
        <Route element={<KakaoAuth />} path="/oauth/kakao/callback" />
        <Route element={<RegisterPage />} path="/register" />
        {/* <Route element={<OldPostPage />} path="/oldpost" /> */}
        <Route element={<ViewAllPage />} path="/view_all" />
        {/* <Route path="detail" element={<PostDetailPage />}>
          <Route path="comments" element={<MoreComments />} />
        </Route> */}
        <Route path="/post/:postId" element={<PostAemdPage />} />
        <Route path="detail/:postId" element={<PostDetailPage />} />
        <Route path="detail/:postId/comments" element={<MoreComments />} />
        <Route element={<MyPage />} path="/user/:userId/profile" />
        <Route element={<MyPageEdit />} path="/user/:userId/edit" />
        <Route element={<Follower />} path="/user/:userId/Follower" />
        <Route element={<Followee />} path="/user/:userId/Followee" />
        <Route element={<PostPage />} path="/post" />
      </Routes>
    </RecoilRoot>
  );
}

export default App;
