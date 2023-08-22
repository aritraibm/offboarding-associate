import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  IconButton,
  InputAdornment,
  Typography,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../store";
import { LoginResponse } from "../../helper/type";
import "../styles/login.css";
import { LoginValidationSchema } from "./LoginComponent.validation";
import { InputText } from "../core/InputText/InputText";
import React from "react";
import { UIConstants } from "../../helper/constants";
import { Send, Tune, Visibility, VisibilityOff } from "@mui/icons-material";
import config from "../../confi";

interface Lok{
    name:string;
    role: string;
    reviewer: string;
    manager: string;
    empId: string;
    firstName: string;
    lastName: string;
}
const LoginComponent = () => {
  const navigate = useNavigate();
  const [empId, setEmpId] = useState("");
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const [attribteType, setAttribteType] = useState('password');
  const state = { name: "Login" };
  const [Login,setLogin]=useState("Generate OTP");
  const [password, setPassword] = useState('');
  const [showOtpTextField, setShowOtpTextField] = useState(false);
  const [otp, setOTP] = useState('');
  const [readOnly, setReadOnly] = useState(false);
  const [LoginResponse,setLoginResponse]=useState("")
  
  const userDetails: Lok = {
    name:"",
    role: "",
    reviewer: "",
    manager: "",
    empId: "",
    firstName: "",
    lastName: ""
  }
  const [loginData,setLoginData] = useState(userDetails);


// toggle the state variable to show or hide the field
  // const toggleField = () => {
  //   setShowField(!showField);
  // };




  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, type: string) => {
    setError(false);
    if (type === "empId") setEmpId(e.target.value);
    else if (type === "password") setPassword(e.target.value);
    else if (type === "setOTP") setOTP(e.target.value);

  
  };


  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: 'all',
    resolver: yupResolver(LoginValidationSchema),
  });

  const loginOnLoad = (data:any) => {
    if (data && data.role !== 'ROLE_ASSOCIATE') {
      navigate('/');
    } else {
      navigate('/newUser');
    }
  };


  const handleClickShowPassword = () => {

    if (attribteType === "text") {
      setAttribteType('password');
    } else {
      setAttribteType('text');
    }
  };

  const handleLogin = (data: any) =>{
    setReadOnly(!readOnly);
    data.preventDefault();
    if(Login==="Generate OTP"){
      const requestBody = {
        empId: empId,
        password: password,
      };
        axios.post(`${config.CLOUDGATEWAY_HOST}/loginuser/user`,requestBody,{
          
          timeout: 10000
        })
        
        .then((result) => {
          if (result.data.role) {
            setLoginData(result.data);

            console.log("result ==== >"+JSON.stringify(result));
            setLogin("Vefiry OTP");
            setShowOtpTextField(true);
            setError(false);
            // setReadOnly(true);
          } else{
          //   setReadOnly(!readOnly);
            setError(true);
            setShowOtpTextField(false);
          } 
        })
        .catch(error => {
          setError(true);
        });
    }
 }

  const handleVerifyClick = (data: any) =>{
    console.log("result data jhfxuihidufh");
    data.preventDefault();
      //   const requestBody = {
      //     empId: empId,
      //     password: otp,
      // }     
    
         console.log("print the values "+empId,otp);
         axios.get(`${config.CLOUDGATEWAY_HOST}/loginuser/user`,{
          headers: {
            'empId': empId,
            'password': otp
          },
          timeout: 20000,
        })
        .then((result:LoginResponse)=>{
          console.log("OTP Result ==== >"+JSON.stringify(result));
          console.log("result data "+result.data);
          // console.log("Login data ==== >"+JSON.stringify(loginData));
           console.log("OTP Result ==== >"+JSON.stringify(result));
            if(result.data){
              
            dispatch(
              login({
                token: result.data,
                userDetails: {
                  name: loginData.name,
                  firstName: loginData.firstName,
                  lastName:loginData.lastName,
                  role: loginData.role,
                  reviewer: loginData.reviewer,
                  manager: loginData.manager,
                  empId: empId,
                },
              })
            );
            
            // alert("one")
              // console.log("print the out put"+ loginData)
              loginOnLoad(loginOnLoad);
              // navigate("/");
            }else{
              console.log("in else otp ");
              setError(true);
              setShowOtpTextField(true);
            }
        });
   

  
   
  }

  return (
    <div className="login-wrapper">
      <Grid
        className=""
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={12}>
          <Typography variant="h6" color="#fff">
            <strong>Prudential Retirement</strong>
          </Typography>
        </Grid>
        <form onSubmit={handleSubmit(handleLogin,handleVerifyClick)}>
          <>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <>
                    {error && (
                      <p style={{ color: "red" }}>UserName or Password incorrect.</p>
                    )}
                    <InputText
                      autoFocus
                      label="Employee id"
                      value={empId}
                      {...register("empId")}
                      onChange={(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => handleChange(e, "empId")}
                    />
                    <Typography variant="body2" color="text.secondary">
                      Please enter your IBM employee ID in 6 character. Eg: xxxxxx
                    </Typography>
                    <InputText
                      label="Password"
                      type={attribteType} // Set the type based on the attribteType state variable
                      value={password}
                      {...register("password")}
                      onChange={(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => handleChange(e, "password")}
                      helperText={
                        errors.password
                          ? errors?.password.message
                          : null
                      }
                      InputProps={{
                        readOnly: false,
                        endAdornment: (
                          <>
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                edge="end"
                              >
                                {attribteType === 'text' ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          </>
                        ),
                      }}
                    />
                    {/* {errors?.password?.message} */}
                  </>
                {/* </CardContent>
                <CardActions> */}
                  <Button
                    onClick={handleLogin}
                    fullWidth
                    variant="contained"
                    className="login-btn"
                    type="submit"
                  >
                     <Send />
                    Login
                  </Button>
                {/* </CardActions>
                <CardActions> */}
                  { showOtpTextField &&
                    <div>
                      <InputText
                        fullWidth
                       
                        label="OTP"
                        value={otp}
                        {...register("setOTP")}
                        placeholder="Enter OTP "
                        onChange={(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => handleChange(e, "setOTP")}
                        helperText={
                          errors.otp
                            ? errors?.otp.message
                            : null
                        }
                      />
                      <Button
                        onClick={handleVerifyClick}
                        fullWidth
                        variant="contained"
                        className="login-btn"
                         type="submit"
                       
                      >
                        Verify
                      </Button>
                    </div>
                  }
                  </CardContent>
                {/* </CardActions> */}
              </Card>
            </Grid>
          </>
        </form>
      </Grid>
    </div>
  );
};

export default LoginComponent;