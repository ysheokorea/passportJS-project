const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const passportSetup = require('./passport');
const authRoute = require('./routes/auth');

const { sequelize } = require("./models");

dotenv.config();
const cookieSession = require("cookie-session");

const app = express();


sequelize
  .sync({ force: false })
  .then(() => {
    console.log("DB 연결 성공");
  })
  .catch((err) => {
    console.error(err);
  });

app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  cookieSession({
    name: "teset",
    keys: ["about"],
    maxAge: 24 * 60 * 60 * 100,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(cors({
    origin : "http://localhost:3000",
    methods : "GET, POST,PUT,DELETE",
    credentials:true,
}))

app.get("/", (req, res) => {
  res.json("hello client");
});

app.use("/auth", authRoute);

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT} ...`);
});
