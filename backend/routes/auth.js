const express = require("express");
const passport = require("passport");
const bcrypt = require("bcrypt");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares"); // 내가 만든 사용자 미들웨어
const User = require("../models/User");

const router = express.Router();

//* 회원 가입
// 사용자 미들웨어 isNotLoggedIn을 통과해야 async (req, res, next) => 미들웨어 실행
router.post("/join", isNotLoggedIn, async (req, res, next) => {
  const { email, nickName, password } = req.body; // 프론트에서 보낸 폼데이터를 받는다.

  try {
    // 기존에 이메일로 가입한 사람이 있나 검사 (중복 가입 방지)
    const isUser = await User.findOne({ email });
    if (isUser) {
      return res.status(400).json({ message: "이미 가입된 이메일입니다." }); // 에러페이지로 바로 리다이렉트
    }

    // 정상적인 회원가입 절차면 해시화
    const hash = await bcrypt.hash(password, 12);

    // DB에 해당 회원정보 생성
    await User.create({
      email,
      nickName,
      password: hash, // 비밀번호에 해시문자를 넣어준다.
    });

    return res.status(201).json({ message: "회원가입이 완료되었습니다." });
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

//* 로그인 요청
// 사용자 미들웨어 isNotLoggedIn 통과해야 async (req, res, next) => 미들웨어 실행
router.post("/login", isNotLoggedIn, (req, res, next) => {
  //? local로 실행이 되면 localstrategy.js를 찾아 실행한다.
  passport.authenticate("local", (authError, user, info) => {
    //? (authError, user, info) => 이 콜백 미들웨어는 localstrategy에서 done()이 호출되면 실행된다.
    //? localstrategy에 done()함수에 로직 처리에 따라 1,2,3번째 인자에 넣는 순서가 달랐는데 그 이유가 바로 이것이다.

    // done(err)가 처리된 경우
    if (authError) {
      console.error(authError);
      return next(authError); // 에러처리 미들웨어로 보낸다.
    }
    // done(null, false, { message: '비밀번호가 일치하지 않습니다.' }) 가 처리된 경우
    if (!user) {
      // done()의 3번째 인자 { message: '비밀번호가 일치하지 않습니다.' }가 실행
      return res.status(400).json({ message: info.message });
    }

    //? 로그인이 성공되면 (user가 false가 아닌 경우), passport/index.js로 가서 실행시킨다.
    return req.login(user, (loginError) => {
      //? loginError => 미들웨어는 passport/index.js의 passport.deserializeUser((id, done) => 가 done()이 되면 실행하게 된다.
      // 만일 done(err) 가 됬다면,
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      // done(null, user)로 로직이 성공적이라면, 세션에 사용자 정보를 저장해놔서 로그인 상태가 된다.
      return res.status(200).json({ message: "로그인 성공" });
    });
  })(req, res, next); //! 미들웨어 내의 미들웨어에는 콜백을 실행시키기위해 (req, res, next)를 붙인다.
});

//* 로그아웃 (isLoggedIn 상태일 경우)
router.get("/logout", isLoggedIn, (req, res) => {
  // req.user (사용자 정보가 안에 들어있다. 당연히 로그인되어있으니 로그아웃하려는 거니까)
  req.logout();
  req.session.destroy(); // 로그인인증 수단으로 사용한 세션쿠키를 지우고 파괴한다. 세션쿠키가 없다는 말은 즉 로그아웃 인 말.
  res.status(200).json({ message: "로그아웃 성공" });
});

module.exports = router;
