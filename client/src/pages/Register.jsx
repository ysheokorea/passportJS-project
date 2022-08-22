import { Box, Button, Container, IconButton, Input, Link, Typography } from "@mui/material";
import React, { useState } from "react";
import GoogleIcon from '@mui/icons-material/Google';
import MapsUgcIcon from '@mui/icons-material/MapsUgc';
import DonutSmallIcon from '@mui/icons-material/DonutSmall';
import GitHubIcon from '@mui/icons-material/GitHub';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
axios.withCredentials = true;


export default function Register() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    const register = () => {
        axios({
          url : 'http://localhost:8888/auth/register',
          method : "post",
          headers : {
            'Content-Type' : 'application/json'
          },
          data :{
            username : username, 
            password : password,
          },
          
        })
    }


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
              margin : '30px 0px'
            }}
          >
            <label>Username: </label>
            <Input type="text" onChange={(e)=>{
              return setUsername(e.target.value);
            }}/>
          </Container>
          <Container
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              gap: "3px",
              margin : '30px 0px'
            }}
          >
            <label>Password: </label>
            <Input type="password" onChange={(e)=>{
              return setPassword(e.target.value);
            }}/>
          </Container>
          <Button onClick={register} variant="contained" style={{width:"80%"}}>Register</Button>
          <br />
          <br />
          <Button sytle={{textDecoration:'none', cursor:'pointer'}} onClick={()=>navigate('/login')}>Already have username?</Button>
        </Box>
      </Box>
      <Typography variant="h3">{username}</Typography>
      <Typography variant="h3">{password}</Typography>
    </Box>
  );
}
