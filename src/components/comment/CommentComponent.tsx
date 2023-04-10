import {
  PeopleAltTwoTone,
  PreviewTwoTone,
  SupportAgentTwoTone
} from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Fab,
  Grid,
  List,
  ListItem,
  ListItemText,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { ChangeEvent, Fragment, useState } from 'react';
import moment from 'moment/moment.js';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { comments, userComments, userDetails, token, invokeAssociatesSaga } from '../../store';
import Loader from '../common/Loader';
import { Dropdown } from '../core/Dropdown/Dropdown';
import { ROLE_ONBOARDING_MANAGER, ROLE_ONBOARDING_REVIEWER, UIConstants } from '../../helper/constants';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { mapAPItoUIDocTypeDropdown } from '../../transformation/reponseMapper';
import { InputText } from '../core/InputText/InputText';
import { CommentValidationSchema, addCommentValidationSchema, addCommentDefaultValues } from './Comment.validation';
import { GlobalStoreType } from '../../helper/type';


const CommentComponent = (props: any) => {
  const BASE_URL = 'http://localhost:9003/';
  const [options, setOptions] = useState<string[]>([]);
  const [optionselect, setOptionselect] = useState('');
  const [allAssoOptionSelect, setAllAssoOptionSelect] = useState('');


  const userToken = useSelector(token);
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState('');
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(userDetails);
  const allComments = useSelector(userComments);
  const empId: any = props.empId ? props.empId : user.empId;
  const [loader, setLoader] = useState(true);
  // const [associateName, setAssociateName] = useState();
  // const [ibmId, setIbmId] = useState('');
  // const [assocaiteList, setAssocaiteList] = useState<any>([]);



  const [showReplies, setShowReplies] = useState(false);
  const [messages, setMessages] = useState([]);

  const handleReply = () => {
    setShowReplies(true);
  }

  const handleBack = () => {
    setShowReplies(false)
  }

  const handleSave = () => {
    // setMessages((prevMessages) => [...prevMessages, message]);
    setShowReplies(true);
  }


  // const allDocumentTypes = useSelector((state: GlobalStoreType) => state.finalDocumentTypeList);
  const allAssociates = useSelector((state: GlobalStoreType) => state.finalAssociatesList);

  useEffect(() => {
    // fetchDocumentTypes();
    fetchAllAssociates();
    if (allAssociates.length === 0) {
      dispatch(invokeAssociatesSaga({ test: "test", id: 1 }));
    }
    // if (allDocumentTypes.length === 0) {
    //   dispatch(invokeDocumentTypeSaga({ test: "test", id: 1 }));
    // }
    // if (allAssociates.length === 0) {
    //   dispatch(invokeAssociatesSaga({ test: "test", id: 1 }));
    // }

    const role = user.role;
    console.log("role >>>>> " + role);
    axios
      .get(BASE_URL + 'document', { headers: { Authorization: 'Bearer ' + userToken } })
      .then((res: any) => {
        // console.log("res >>>>> "+JSON.stringify(res));
        setOptions([...res.data]);
        console.log("options", options)
        setOptionselect('1');
        console.log("optionselect", optionselect)
        setLoader(false);
      })
      .catch((err) => {
        console.log(err);
      });


    axios
      .get('http://localhost:9094/comment/' + empId, {
        headers: { Authorization: 'Bearer ' + userToken },
      })
      .then((result) => {
        if (result.data) {
          dispatch(
            comments({
              comments: result.data,
            })
          );
          setLoader(false);
        }
      }); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [empId]);



  // const fetchDocumentTypes = () => {
  //   const role = user.role;
  //   console.log("role >>>>> " + role);
  //   axios
  //     .get(BASE_URL + 'document', { headers: { Authorization: 'Bearer ' + userToken } })
  //     .then((res: any) => {
  //       // console.log("res >>>>> "+JSON.stringify(res));
  //       setOptions([...res.data]);
  //       console.log("options", options)
  //       setOptionselect('1');
  //       console.log("optionselect", optionselect)
  //       setLoader(false);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };


  const fetchAllAssociates = () => {

    axios
      .get("http://localhost:9092/pru-associate/get-all-associates", { headers: { Authorization: 'Bearer ' + userToken } })
      .then((result: any) => {
        // console.log("result ==== >"+JSON.stringify(result));

        //setAssocaiteList([...result.data]);
        setAllAssoOptionSelect('1');
        console.log("allAssoOptionSelect", allAssoOptionSelect)
        setLoader(false);

      });
  }


  const handleClickOpen = () => {
    setError(false);
    setComment('');
    setOpen(true);
  };



  const handleClose = () => {
    setOpen(false);
    cmtReset(addCommentDefaultValues);
  };



  const convertDate = (date: any) => {
    let updatedDate = moment(new Date(date));
    return updatedDate.calendar(null, {
      lastWeek: '[Last] ddd hh:mm A',
      lastDay: '[Yesterday at] hh:mm A',
      sameDay: function (now) {
        if (moment(date).isSame(moment(new Date()).format())) {
          return '[Now]';
        } else {
          return '[Today at] hh:mm A';
        }
      },
      sameElse: 'YYYY/MM/DD hh:mm A',
    });
  };



  // const handleComment = (event: { target: { value: SetStateAction<string>; }; }) => {
  //   setComment(event.target.value);
  //   console.log("comment",comment)
  // };



  // const handleAddComments = () => {
  //   if (comment === null || comment === '') setError(true);
  //   else {
  //     let updatedComments = {
  //       empId: empId,
  //       who: user.name,
  //       role: user.role,
  //       comments: comment,
  //       date: moment(new Date()).format(),
  //     };
  //     axios
  //       .post('http://localhost:9094/comment/add-comment', updatedComments, {
  //         headers: { Authorization: 'Bearer ' + userToken },
  //       })
  //       .then((result) => {
  //         if (result.data)
  //           dispatch(
  //             comments({
  //               comments: [result.data, ...allComments],
  //             })
  //           );
  //       });
  //     setError(false);
  //     setOpen(false);
  //   }
  // };


  const { register, handleSubmit, getValues, formState: { errors } } = useForm({
    mode: 'all',
    resolver: yupResolver(CommentValidationSchema),
  })

  const cmtForm = useForm({
    mode: 'all',
    resolver: yupResolver(addCommentValidationSchema),
  })
  const cmtRegister = cmtForm.register;
  const cmtHandleSubmit = cmtForm.handleSubmit;
  const cmtErrors = cmtForm.formState.errors;
  // const cmtGetValues = cmtForm.getValues;
  const cmtReset = cmtForm.reset;

  const saveComments = (data: any) => {
    const fullName = user.firstName + user.lastName;
    let updatedComments = {
      // empId: empId,
      who: fullName,
      role: user.role,
      // comments: comment,
      date: moment(new Date()).format(),
    };
    const reqData = { ...data, ...updatedComments };
    console.log("COMMENT SAVE DATA --->" + JSON.stringify(reqData))

    axios
      .post('http://localhost:9094/comment/add-comment', reqData, {
        headers: { Authorization: 'Bearer ' + userToken },
      })
      .then((result) => {
        cmtReset(addCommentDefaultValues);
        callOnchangeAPI(getValues('associateName'));
        // if (result.data)
        //   dispatch(
        //     comments({
        //       comments: [result.data, ...allComments],
        //     })
        //   );
      });

    setOpen(false);
  }

  const callOnchangeAPI = (value: string) => {
    if (value !== null && value !== '') {
      axios
        .get('http://localhost:9094/comment/' + value, {
          headers: { Authorization: 'Bearer ' + userToken },
        })
        .then((result) => {
          if (result.data) {
            dispatch(
              comments({
                comments: result.data,
              })
            );
            setLoader(false);
          }
        }); // eslint-disable-next-line react-hooks/exhaustive-deps
    } else {
      dispatch(
        comments({
          comments: [],
        })
      );
    }
  }

  const handleAssociateDropdownChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, type: string) => {
    // alert(cmtGetValues('comments'))
    const onChangeValue = e.target.value;
    Object.freeze(onChangeValue);

    callOnchangeAPI(onChangeValue);
    //  if(onChangeValue !== null && onChangeValue !== ''){
    //   axios
    //   .get('http://localhost:9094/comment/' + e.target.value, {
    //     headers: { Authorization: 'Bearer ' + userToken },
    //   })
    //   .then((result) => {
    //     if (result.data) {
    //       dispatch(
    //         comments({
    //           comments: result.data,
    //         })
    //       );
    //       setLoader(false);
    //     }
    //   }); // eslint-disable-next-line react-hooks/exhaustive-deps
    //  }else{
    //   dispatch(
    //     comments({
    //       comments: [],
    //     })
    //   );
    //  }
  }



  const handleNewCommentDropdownChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, type: string) => {

  }

  const onSubmit = (data: any) => {
    console.log("COMMENT PAGE DATA --->" + JSON.stringify(data))
  }



  return (
    <div
      style={{
        padding: '20px 20px 0 20px',
        paddingBottom: props.empId ? '10px' : '80px',
      }}
    >
      {props.empId ? <></> : <h2>Comment</h2>}


      {(user.role === ROLE_ONBOARDING_MANAGER ||
        user.role === ROLE_ONBOARDING_REVIEWER) && (
          <Box mb={6}>
            <div className="col-md-12 container">
              <div className="col-md-4 flex-column">


                <form onSubmit={handleSubmit(onSubmit)}>
                  <>
                    <h2>Find Associate</h2>
                    <Grid item md={6} sm={6} xs={12}>
                      <div className="section-border">
                        <Dropdown
                          label={UIConstants.selectAnAssociate}
                          {...register("associateName")}
                          error={!!errors?.associateName}
                          onChange={handleAssociateDropdownChange}
                          options={mapAPItoUIDocTypeDropdown(allAssociates, 'ibmId', 'associateName')}
                          selectAnOption
                          helperText={
                            errors.associateName
                              ? errors?.associateName?.message
                              : null
                          }
                        />

                      </div>
                    </Grid>

                  </>
                </form>

              </div>
            </div>

          </Box>
        )}
      {/* <Box mb={6}>
        <div className="col-md-12 container">
          <div className="col-md-4 flex-column">


            <form onSubmit={handleSubmit(onSubmit)}>
              <>
                <h2>Find Associate</h2>
                <Grid item md={6} sm={6} xs={12}>
                  <div className="section-border">
                    <Dropdown
                      label={UIConstants.selectAnAssociate}
                      {...register("associateName")}
                      error={!!errors?.associateName}
                      onChange={handleAssociateDropdownChange}
                      options={mapAPItoUIDocTypeDropdown(assocaiteList, 'ibmId', 'associateName')}
                      selectAnOption
                      helperText={
                        errors.associateName
                          ? errors?.associateName.message
                          : null
                      }
                    />

                  </div>
                </Grid>

              </>
            </form>

          </div>
        </div>

      </Box> */}










      {loader ? (
        <Loader />
      ) : allComments.length !== 0 ? (
        <List style={{ overflow: 'auto', backgroundColor: 'white' }}>
          {allComments.map((data: any, index: any) => {
            return (
              <Fragment key={`comments-${index}`}>
                <ListItem alignItems="flex-start" key={index}>
                  <ListItemText
                    primary={
                      <>
                        <Typography
                          variant="h6"
                          color="black"
                          style={{ margin: 0 }}
                        >
                          <Grid container direction="row">
                            <Grid item xs={6}>
                              {user.role === data.role ? (
                                <strong>You:</strong>
                              ) : (
                                <>
                                  <Grid
                                    container
                                    textAlign="start"
                                    alignItems="center"
                                  >
                                    <Grid item xs="auto">
                                      <strong>{data.who}:</strong>
                                    </Grid>
                                    <Grid item xs>
                                      <Tooltip
                                        title={data.role}
                                        placement="right"
                                      >
                                        {data.role === 'REVIEWER' ? (
                                          <PreviewTwoTone
                                            style={{ fontSize: 13 }}
                                          />
                                        ) : data.role === 'ASSOCIATE' ? (
                                          <SupportAgentTwoTone
                                            style={{ fontSize: 13 }}
                                          />
                                        ) : (
                                          <PeopleAltTwoTone
                                            style={{ fontSize: 13 }}
                                          />
                                        )}

                                      </Tooltip>

                                    </Grid>

                                  </Grid>
                                </>
                              )}

                            </Grid>
                            <Grid item xs={6} style={{ textAlign: 'end' }}>
                              <span style={{ fontSize: '10px' }}>
                                {convertDate(data.date)}
                              </span>
                            </Grid>
                          </Grid>

                        </Typography>
                      </>
                    }
                    secondary={
                      <Typography
                        sx={{ display: 'inline' }}

                        color="black"
                      >
                        {data.comments}
                      </Typography>
                    }
                  />
                </ListItem>

                <Grid item xs="auto" style={{ paddingLeft: '5px' }}>

                  {showReplies ?
                    <>
                      <TextField
                        key={empId}
                        label="Write a Reply..."
                        variant="standard"
                        style={{ margin: '10px' }}
                      >
                      </TextField>
                      
                      <Button
                        variant="contained"
                        type="submit"
                        style={{ margin: '20px' }}
                        onClick={handleSave}
                      >
                        Save
                      </Button>
                      <Button
                        variant="outlined"
                        style={{ margin: '3px' }}
                        onClick={handleBack}
                      >
                        Back
                      </Button>
                    </>
                    :
                    <Button
                      // key={index}
                      onClick={handleReply}
                      variant="contained"
                      style={{ margin: '10px' }}
                    >
                      Reply
                    </Button>
                  }
                  {/* {messages.map((message, index) => {
                    <div key={index}>{message}</div>
                  })} */}

                </Grid>

                <Divider />
              </Fragment>
            );
          })}
        </List>
      ) : (
        'No comments to display.'
      )}

      {(user.role === ROLE_ONBOARDING_MANAGER ||
        user.role === ROLE_ONBOARDING_REVIEWER) && (

          <Tooltip
            title="Add New comment"
            sx={{ position: 'fixed', bottom: 60, right: 50 }}
          >
            <Fab color="primary" onClick={handleClickOpen}>
              <AddIcon />
            </Fab>
          </Tooltip>

        )}

      <Dialog open={open}>
        <DialogTitle>Add Comment</DialogTitle>

        <form onSubmit={cmtHandleSubmit(saveComments)}>
          <DialogContent>

            <Dropdown
              label={UIConstants.selectAnAssociate}
              {...cmtRegister("empId")}
              error={!!cmtErrors?.empId}
              onChange={handleNewCommentDropdownChange}
              options={mapAPItoUIDocTypeDropdown(allAssociates, 'ibmId', 'associateName')}
              selectAnOption
              helperText={
                cmtErrors.empId
                  ? cmtErrors?.empId.message
                  : null
              }
            />
            <InputText
              // autoFocus
              label="Comment"
              error={!!cmtErrors?.comments}
              {...cmtRegister("comments")}
              helperText={
                cmtErrors.comments
                  ? cmtErrors?.comments.message
                  : null
              }
            // value={comment}
            // onChange={handleComment}
            // error={error}
            />
          </DialogContent>

          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button
              fullWidth
              variant="contained"
              className="login-btn"
              type="submit">Add</Button>
          </DialogActions>

        </form>
      </Dialog>


    </div>
  );
};
export default CommentComponent;
