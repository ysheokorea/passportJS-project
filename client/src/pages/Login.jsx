import {
  Box,
  Button,
  Container,
  IconButton,
  Input,
  Link,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import GoogleIcon from "@mui/icons-material/Google";
import MapsUgcIcon from "@mui/icons-material/MapsUgc";
import DonutSmallIcon from "@mui/icons-material/DonutSmall";
import GitHubIcon from "@mui/icons-material/GitHub";
import ExtensionIcon from '@mui/icons-material/Extension';
import { useNavigate } from "react-router-dom";
import axios from "axios";
axios.withCredentials = true;

export default function Login({setUser}) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const google = () => {
    window.open("http://localhost:8888/auth/google", "_self");
  };

  const github = () => {
    window.open("http://localhost:8888/auth/github", "_self");
  };

  const kakao = () => {
    window.open("http://localhost:8888/auth/kakao", "_self");
  };

  const local = () => {
    axios({
      url: "http://localhost:8888/auth/local",
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        username: username,
        password: password,
      },
    }).then(result=>{
      if(result.status === 200){
        console.log(result);
        const newUser ={
          displayName : result.data.user.username
        }
        setUser(newUser);

        navigate('/')
      }else{
        navigate('/login')
      }
    })
  };

  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "30px",
      }}
    >
      <Typography variant="h2">This is login</Typography>
      <Box
        style={{
          width: "300px",
          height: "350px",
          backgroundColor: "#DFC",
          border: "1px solid black",
          boxShadow: "5px 5px",
          borderRadius: "7px",
          gap: "40px",
          padding: "10px",
          testAlign: "center",
        }}
      >
        <Box style={{ marginTop: "50px", gap: "15px" }}>
          <Container
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              gap: "3px",
              margin: "30px 0px",
            }}
          >
            <label>Username: </label>
            <Input type="text" onChange={(e)=>setUsername(e.target.value)}/>
          </Container>
          <Container
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              gap: "3px",
              margin: "30px 0px",
            }}
          >
            <label>Password: </label>
            <Input type="password" onChange={(e)=>setPassword(e.target.value)}/>
          </Container>
          <Button onClick={local} variant="contained" style={{ width: "80%" }}>
            Login
          </Button>
          <br />
          <br />
          <Button
            sytle={{ textDecoration: "none", hover: "pointer" }}
            onClick={() => navigate("/register")}
          >
            Don' have username?
          </Button>
          <Container
            style={{
              display: "flex",
              justifyContent: "space-around",
              width: "100%",
              marginTop: "30px",
            }}
          >
            <IconButton onClick={google}>
              <GoogleIcon />
            </IconButton>
            <IconButton onClick={github}>
              <GitHubIcon />
            </IconButton>
            <IconButton>
              <DonutSmallIcon />
            </IconButton>
            <IconButton onClick={kakao}>
              <ExtensionIcon />
            </IconButton>
          </Container>
          
        </Box>
      </Box>
      <Typography variant="h3">{username}</Typography>
      <Typography variant="h3">{password}</Typography>
    </Box>
  );
}
