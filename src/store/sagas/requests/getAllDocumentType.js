import React, { useState, useEffect, useRef, ChangeEvent } from 'react';
import axios from "axios";
// import { useSelector, useDispatch } from 'react-redux';
// import { token, userDetails, finalDocumentTypeList, invokeDocumentTypeSaga } from '../../../store';

// export function requestAllDocumentType() {
export const requestAllDocumentType = () => {

  // const userToken = useSelector(token);
  // console.log("userToken :::::: >" + userToken)

  return axios.request({
    method: "get",
    url: "http://localhost:9003/document",
    headers: {
      "Authorization": `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI2Mzg4NWUxNjJjMmE5ZjVhNTk1ZjQ4N2QsdGVzdDFAZ21haWwuY29tIiwiaXNzIjoiT25ib2FyZGluZyBUZWFtIElCTSBQcnVkZW50aWFsIiwicm9sZXMiOiJST0xFX09OQk9BUkRJTkdfUkVWSUVXRVIiLCJpYXQiOjE2NzgzNDUyMzksImV4cCI6MTY3ODQzMTYzOX0.DkmVKaxEAk_KcZDFy4vWtRx5bZhnYgbtC4T5fLcsKVyzO3Nyg3v4Ad59Ez4v8d1FVhirmPM1N6aOiUSVxlspsA`
    },
  });
}
