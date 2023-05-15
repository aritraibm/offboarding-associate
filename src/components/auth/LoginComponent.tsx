import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  IconButton,
  InputAdornment,
  Typography,
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
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { MaxWidth } from "./LoginComponent.style";

const LoginComponent = () => {
  const navigate = useNavigate();
  const [empId, setEmpId] = useState("");
  const [password, setPswd] = useState("");
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const [attribteType, setAttribteType] = useState('password');

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, type: string) => {
    setError(false);
    if (type === "empId") setEmpId(e.target.value);
    else if (type === "password") setPswd(e.target.value);
  };


  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: 'all',
    resolver: yupResolver(LoginValidationSchema),
  });

  const handleClickShowPassword = () => {

    if (attribteType === "text") {
      setAttribteType('password');
    } else {
      setAttribteType('text');
    }
  };


  const onSubmit = (data: any) => {
    console.log("REACT HOOK FORM DATA ---- >" + JSON.stringify(data));
    axios
      .post("http://localhost:9099/loginuser/user", data)
      .then((result: LoginResponse) => {
        // console.log("result ==== >"+JSON.stringify(result));
        if (result.data.token) {
          dispatch(
            login({
              token: result.data.token,
              userDetails: {
                name: result.data.name,
                firstName: result.data.firstName,
                lastName: result.data.lastName,
                role: result.data.role,
                reviewer: result.data.reviewer,
                manager: result.data.manager,
                empId: result.data.userId,
              },
            })
          );
          navigate("/");
        } else setError(true);


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

        <form onSubmit={handleSubmit(onSubmit)}>
          <>
          <MaxWidth>
            <Grid item xs={12} >
              <Card>
                <CardContent>
                  <>
                    {error && (
                      <p style={{ color: "red" }}>UserName or Password incorrect.</p>
                    )}

                    <InputText
                      autoFocus
                      label="Employee id"
                      //value={empId}
                      {...register("empId")}
                      // onChange={(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => handleChange(e, "empId")}
                      error={!!errors?.empId}
                      helperText={
                        errors.empId
                          ? errors?.empId.message
                          : null
                      }
                    />

                    {/* <Typography variant="body2" color="text.secondary">
                      Please enter your IBM employee ID in 6 character. Eg: xxxxxx
                    </Typography> */}

                    <InputText
                      type={attribteType}
                      label={UIConstants.passwordLabel}
                      //value={password}
                      {...register("password")}
                     // onChange={(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => handleChange(e, "password")}
                      error={!!errors?.password}
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
                </CardContent>
                <CardActions>
                  <Button
                    fullWidth
                    variant="contained"
                    className="login-btn"
                    type="submit"
                  >
                    Login
                  </Button>
                </CardActions>
              </Card>

            </Grid>
            </MaxWidth>
          </>
        </form>
      </Grid>
    </div>
  );
};

export default LoginComponent;
