# Passport 사용법

> Refercence  
> https://www.passportjs.org/

<br><br>

## OAuth 2.0 동작원리

1. 메인 페이지(client)는 인증제공자에게 Authorization Code 요청
2. Auth Code를 서버로 전송
3. 서버는 인증제공자로 부터 Access Token 발급
4. client에게 access token 제공
5. client는 access token으로 인증 성공

<br><br>

## 프로젝트 목차

1. passport-google
2. passport-kakao
3. passport-github
4. passport-local

<br><br>

## 사용법

1. passport 모듈 설치

```
npm install passport passport-google passport-local passport-kakao
```

2. CLIENT_ID / CLIENT_SECRET 발급

3. REACT 설정

<br><br>

## 코드 설명

### passport/index.js

```
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
  )
);
```

### routes/auth.js

```
router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);
```


