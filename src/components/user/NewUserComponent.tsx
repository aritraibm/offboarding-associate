import React from 'react';
import { InfoRounded, Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Alert,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  IconButton,
  InputAdornment,
  // MenuItem,
  // Select,
  Snackbar,
  // TextField,
  Tooltip,
  useTheme,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { ChangeEvent, useEffect, useState } from 'react';
import {
  allManagers,
  allReviewers,
  allRoles,
  // createFristName,
  // createLastName,
  createNewUser,
  invokeAllManagerSaga,
  invokeAllReviewerSaga,
  invokeAllRoleSaga,
  invokeDocumentTypeSaga,
  managers,
  resetCreateNewUserDetails,
  reviewers,
  roles,
  token,
} from '../../store';
import '../styles/login.css';
import { generate, validate } from '@wcj/generate-password';
import { InputText } from '../core/InputText/InputText';
import { newUserFormDefaultValues, NewUserValidationSchema } from './NewUserComponent.validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { mapAPItoUIDocTypeDropdown } from '../../transformation/reponseMapper';
import { ROLE_ASSOCIATE, ROLE_OFFBOARDING_REVIEWER, UIConstants } from '../../helper/constants';
import { Dropdown } from '../core/Dropdown/Dropdown';
import { saveNewUser } from '../../services/NewUserService';
import { mapNewUserModel_UItoAPI } from '../../transformation/UserMapper';
import { AllManagerType, AllRoleType, GlobalStoreType } from '../../helper/type';


const NewUserComponent = () => {
  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.down('md'));
  const matchesXL = useMediaQuery(theme.breakpoints.down('xl'));
  const dispatch = useDispatch();
  const userToken = useSelector(token);
  const newUserDetails = useSelector(createNewUser);
  // const allRole = useSelector(allRoles);


  // const [employeeId, setEmployeeId] = useState("");
  // const [email, setEmail] = useState("");
  // const [firstName, setFirstName] = useState("");
  // const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [attribteType, setAttribteType] = useState('password');
  const [userRoleName, setUserRoleName] = useState('');
  //const [openSnakBar, setSnakBarOpen] = useState(false);


  // const isEmail = (email: any) =>
  //   /^[A-Z0-9._%+-]+@[IBM,ibm]+\.[COM,com]{2,4}$/i.test(email);


  const allRoles = useSelector((state: GlobalStoreType) => state.finalRoleList);
  const allManagers = useSelector((state: GlobalStoreType) => state.finalAllManagerList);
  const allReviewers = useSelector((state: GlobalStoreType) => state.finalAllReviewerList);
  // const getRoleName = (roleId: string) => {
  //   allRole.filter((data: any) => {
  //     if (data.id == roleId) {
  //       return data.name;

  //     }
  //   })
  // };

  const getRoleName = (roleId: string): AllRoleType[] => {
    return allRoles.filter((data: AllRoleType) => data.id == roleId)
  }


  // const assosiateRoleId = allRoles.find((data: any) => {
  //   return data.name == ROLE_ASSOCIATE;
  // });
  // const reviewerRoleId = allRoles.find((data: any) => {
  //   return data.name == ROLE_OFFBOARDING_REVIEWER;
  // });
  const allManager = allManagers.filter(
    (item: AllManagerType) => item.empId !== 'N/A'
  );
  const allReviewer = allReviewers.filter(
    (item: any) => item.empId !== 'N/A'
  );
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect((): any => {

    if (allRoles.length === 0) {
      dispatch(invokeAllRoleSaga({ test: "test", id: 1 }));
    }

    if (allManagers.length === 0) {
      dispatch(invokeAllManagerSaga({ test: "test", id: 1 }));
    }

    if (allReviewers.length === 0) {
      dispatch(invokeAllReviewerSaga({ test: "test", id: 1 }));
    }

    // axios.get('http://localhost:9099/roles').then((response) => {
    //   if (response.data) {
    //     dispatch(roles({ roles: response.data }));
    //     console.log("response.data :::::: >>>>> " + JSON.stringify(response.data))
    //   } else console.log('No Roles');
    // });
    // axios.get('http://localhost:9099/managers').then((response) => {
    //   if (response.data) dispatch(managers({ managers: response.data }));
    //   else console.log('No managers');
    // });
    // axios.get('http://localhost:9099/reviewers').then((response) => {
    //   if (response.data) dispatch(reviewers({ reviewers: response.data }));
    //   else console.log('No Reviewers');
    // });

    return () => dispatch(resetCreateNewUserDetails());


  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleUserDropdownChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, type: string) => {
    // do something
    setUserRoleName(getRoleName(e.target.value)[0].name);
    // e.preventDefault();
  };

  const handleReviewerDropdownChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, type: string) => {
    // do something
  };

  const handleManagerDropdownChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, type: string) => {
    // do something
  };



  const generatePassword = () => {

    const randomPasword = generate({ length: 15 });
    const passWordStrength = validate(randomPasword);

    console.log("randomPasword is :: >>>>>>>" + randomPasword);
    console.log("passWordStrength is :: >>>>>>>" + passWordStrength);

    setFocus("password");
    setPassword(randomPasword);

  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  // const handleNewUser = (e: any) => {
  //   e.preventDefault();
  //   let error = {};
  //   // if (newUserDetails.email === '') error = { ...error, errorEmail: true };

  //   // if (!isEmail(newUserDetails.email)) {
  //   //   error = { ...error, errorEmail: true };
  //   // }

  //   // if (newUserDetails.employeeId === '')
  //   //   error = { ...error, errorEmployeeId: true };

  //   // // if (newUserDetails.employeeId) {
  //   // //   error = { ...error, errorEmployeeId: true };
  //   // } 
  //   // else if (newUserDetails.employeeId.length > 6) {
  //   //   error = { ...error, errorEmployeeId: true };
  //   // }

  //   // if (
  //   //   newUserDetails.reviewerName === '' &&
  //   //   newUserDetails.role === assosiateRoleId?.id
  //   // )
  //   //   error = { ...error, errorReviewerName: true };

  //   // if (
  //   //   newUserDetails.managerName === '' &&
  //   //   (newUserDetails.role === assosiateRoleId?.id ||
  //   //     newUserDetails.role === reviewerRoleId?.id)
  //   // )
  //   //   error = { ...error, errorManagerName: true };
  //   // if (newUserDetails.role === '') error = { ...error, errorRole: true };

  //   // if (newUserDetails.userName === '')
  //   //   error = { ...error, errorUserName: true };

  //   // if (newUserDetails.FristName === '')
  //   //   error = { ...error, errorFristName: true };
  //   // if (newUserDetails.FristName)
  //   // error = { ...error, errorFristName: true };

  //   // if (newUserDetails.LastName === '')
  //   //   error = { ...error, errorLastName: true };
  //   // if (newUserDetails.LastName)
  //   // error = { ...error, errorLastName: true };

  //   // if (newUserDetails.password === '')
  //   //   error = { ...error, errorPassword: true };
  //   // if (newUserDetails.employeeId.length > 6) {
  //   //   error = { ...error, errorEmployeeId: true };
  //   // }
  //   dispatch(
  //     createNewUserDetails({
  //       createNewUser: { ...newUserDetails, error },
  //     })
  //   );
  //   // console.log('Error '+JSON.stringify(error));
  //   if (JSON.stringify(error) === '{}') {
  //     if (!newUserDetails.isGeneratedButtonDisabled) {
  //       dispatch(
  //         createNewUserDetails({
  //           createNewUser: {
  //             ...newUserDetails,
  //             error: { errorGeneratebutton: true },
  //           },
  //         })
  //       );
  //     } else {
  //       const requestData = {
  //         employeeId: newUserDetails.employeeId,
  //         email: newUserDetails.email,
  //         // userName: newUserDetails.userName,
  //         FristName: newUserDetails.FristName,
  //         LastName: newUserDetails.LastName,
  //         password: newUserDetails.password,
  //         roleId: newUserDetails.role,
  //         reviewerEmpId:
  //           newUserDetails.role === assosiateRoleId?.id
  //             ? newUserDetails.reviewerName
  //             : 'N/A',
  //         managerEmpId:
  //           newUserDetails.role === assosiateRoleId?.id ||
  //             newUserDetails.role === reviewerRoleId?.id
  //             ? newUserDetails.managerName
  //             : 'N/A',
  //       };
  //       axios
  //         .post('http://localhost:9099/user_add', requestData)
  //         .then((response) => {
  //           if (response.data.role.name === ROLE_ASSOCIATE) {
  //             const saveAssociateReq = {
  //               associateName: response.data.userName,
  //               ibmId: response.data.employeeId,
  //               emailIbm: response.data.email,
  //               FristName: response.data.FristName,
  //               LastName: response.data.LastName,
  //               activeInactive: 'Yet to be started',
  //             };
  //             const associateResponse = axios.post(
  //               'http://localhost:9092/pru-associate/new-associate',
  //               saveAssociateReq,
  //               {
  //                 headers: { Authorization: 'Bearer ' + userToken },
  //               }
  //             );
  //             console.log(associateResponse);
  //           }
  //           setSnackbarOpen(true);
  //           dispatch(resetCreateNewUserDetails());
  //         });
  //     }
  //   } else console.log('Error');
  // };

  const handleClickShowPassword = () => {

    if (attribteType === "text") {
      setAttribteType('password');
    } else {
      setAttribteType('text');
    }
  };


  const resetForm = () => {

    reset(newUserFormDefaultValues);
    setPassword(newUserFormDefaultValues.password);
    // setValue('roleId', '');
    resetField('roleId')
    // trigger('roleId');
  }

  const { register, trigger, reset, resetField, getValues, setFocus, handleSubmit, formState: { errors } } = useForm({
    mode: 'all',
    defaultValues: newUserFormDefaultValues,
    resolver: yupResolver(NewUserValidationSchema),
  });


  const onSubmit = (data: any) => {
    const UIData = { ...data, 'userName': getValues('firstName') + " " + getValues('lastName') };
    console.log("REACT HOOK FORM DATA FINAL ---- >" + JSON.stringify(UIData));

    console.log("REACT HOOK errors  ---- >" + JSON.stringify(errors));

    const apiData = mapNewUserModel_UItoAPI(UIData);

    try {
      saveNewUser(apiData, userToken);
      resetForm();
    } catch {
      console.log("something went wrong!!!");
    }


    // axios.post('http://localhost:9099/user_add', requestData)
    //   .then((response) => {
    //     console.log("response is ::::: >>>>" + JSON.stringify(response));
    //     setSnakBarOpen(true);

    //     if (response.data.role.name === ROLE_ASSOCIATE) {
    //       const saveAssociateReq = {
    //         associateName: response.data.userName,
    //         ibmId: response.data.employeeId,
    //         emailIbm: response.data.email,
    //         FristName: response.data.FristName,
    //         LastName: response.data.LastName,
    //         activeInactive: 'Yet to be started',
    //       };
    //       const associateResponse = axios.post(
    //         'http://localhost:9092/pru-associate/new-associate',
    //         saveAssociateReq,
    //         {
    //           headers: { Authorization: 'Bearer ' + userToken },
    //         }
    //       );
    //       console.log("associateResponse ::: >>>" + JSON.stringify(associateResponse));
    //     }
    //     // setSnackbarOpen(true);
    //     // dispatch(resetCreateNewUserDetails());
    //   });

  }

  return (
    <div
      style={{
        textAlign: 'center',
        width: matchesMD ? '80%' : matchesXL ? '40%' : '30%',
        margin: 'auto',
      }}
    >
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        className="pt-3"
        style={{ marginBottom: '10rem' }}
      >
        <Grid item xs={12}>
          <Typography variant="h6">
            <strong>{UIConstants.addNewUserLabel}</strong>
          </Typography>
        </Grid>
        <Grid item xs={12} className="pt-2">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Card>
              <CardContent>

                <InputText
                  label={UIConstants.employeeIdLabel}
                  autoFocus
                  // value={employeeId}
                  error={!!errors?.employeeId}
                  {...register("employeeId")}
                  // onChange={(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => handleInputChange(e, "employeeId")}
                  helperText={
                    errors.employeeId
                      ? errors?.employeeId.message
                      : null
                  }
                />

                <InputText
                  label={UIConstants.emailIdLabel}
                  type="email"
                  // value={email}
                  error={!!errors?.email}
                  {...register("email")}
                  placeholder="Please enter email, for exapmle 'xyz@ibm.com'"
                  //onChange={(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => handleInputChange(e, "email")}
                  helperText={
                    errors.email
                      ? errors?.email.message
                      : null
                  }
                />

                <InputText
                  label={UIConstants.firstNameLabel}
                  // value={firstName}
                  {...register("firstName")}
                  error={!!errors?.firstName}
                  //onChange={(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => handleInputChange(e, "firstName")}
                  helperText={
                    errors.firstName
                      ? errors?.firstName.message
                      : null
                  }
                />

                <InputText
                  label={UIConstants.lastNameLabel}
                  // value={lastName}
                  {...register("lastName")}
                  error={!!errors?.lastName}
                  //onChange={(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => handleInputChange(e, "lastName")}
                  helperText={
                    errors.lastName
                      ? errors?.lastName.message
                      : null
                  }
                />


                <InputText
                  label={UIConstants.passwordLabel}
                  value={password}
                  disable
                  type={attribteType}
                  {...register("password")}
                  error={!!errors?.password}
                  //onChange={(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => handleInputChange(e, "password")}
                  helperText={
                    errors.password
                      ? errors?.password.message
                      : null
                  }
                  InputProps={{
                    readOnly: true,
                    endAdornment: (
                      <>
                        <InputAdornment position="end">
                          <Tooltip
                            title={UIConstants.newUserPasswordTooltip}
                          >
                            <IconButton>
                              <InfoRounded />
                            </IconButton>
                          </Tooltip>
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


               
                <Button
                  fullWidth
                  variant="contained"
                  disabled={newUserDetails.isGeneratedButtonDisabled}
                  onClick={generatePassword}
                  style={{ marginTop: '10px' }}
                >
                  {UIConstants.generatePasswordBtnLabel}
                </Button>
                {/* <Typography
                  variant="caption"
                  color={
                    newUserDetails.error.errorGeneratebutton ? 'red' : 'black'
                  }
                >
                  Please generate password
                </Typography> */}
                {allRoles && (
                  <>

                    <Dropdown
                      label={UIConstants.selectUser}
                      {...register("roleId")}
                      error={!!errors?.roleId}
                      onChange={handleUserDropdownChange}
                      options={mapAPItoUIDocTypeDropdown(allRoles, 'id', 'name')}
                      selectAnOption
                      helperText={
                        errors.roleId
                          ? errors?.roleId.message
                          : null
                      }
                    />

                  </>
                )}
                {/* {newUserDetails.role === assosiateRoleId?.id && allReviewer && ( */}
                <>

                  {userRoleName === "ROLE_ASSOCIATE" && (
                    <Dropdown
                      label={UIConstants.selectReviewer}
                      {...register("reviewerEmpId")}
                      error={!!errors?.reviewerEmpId}
                      onChange={handleReviewerDropdownChange}
                      options={mapAPItoUIDocTypeDropdown(allReviewer, 'empId', 'reviewerName')}
                      selectAnOption
                      helperText={
                        errors.reviewerEmpId
                          ? errors?.reviewerEmpId.message
                          : null
                      }
                    />
                  )}
                  
                </>
                
                
                <>

                  {/* ---{userRoleName}--- */}
                  {(userRoleName === "ROLE_OFFBOARDING_REVIEWER" || userRoleName === "ROLE_ASSOCIATE") && (
                    <Dropdown
                      label={UIConstants.selectManager}
                      {...register("managerEmpId")}
                      error={!!errors?.managerEmpId}
                      onChange={handleManagerDropdownChange}
                      options={mapAPItoUIDocTypeDropdown(allManager, 'empId', 'managerName')}
                      selectAnOption
                      helperText={
                        errors.managerEmpId
                          ? errors?.managerEmpId.message
                          : null
                      }
                    />
                  )}
                  
                </>
                {/* )} */}
              </CardContent>
              <CardActions>
                <Button
                  fullWidth
                  variant="contained"
                  className="login-btn"
                  type="submit"
                >
                  Add
                </Button>

              </CardActions>
            </Card>
          </form>
        </Grid>
      </Grid>
      <Snackbar
        sx={{ height: '20%' }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: '100%' }}
        >
          New User created!!!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default NewUserComponent;
