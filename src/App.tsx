import React from 'react';
import './App.css';

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { userDetails } from "./store";
import UploadDocument from "./components/document/UploadDocument";
import Recording from "./components/associate-useful/Recording/RecordingMainComponent";
import Welcome from "./components/home/Welcome";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import PageNotFound from "./views/PageNotFound";
import LoginComponent from "./components/auth/LoginComponent";
import "./styles/app.css";
import SampleDocuments from './components/document/SampleDocuments';
import Offboarding from './views/Offboarding';
import NewUserComponent from './components/user/NewUserComponent';
import CommentComponent from './components/comment/CommentComponent';
import OffBoardingCheckList from './components/associate-useful/Off-BoardingCheckList/OffBoardingCheckList';

function App() {
  const user = useSelector(userDetails);
  return (
    <div className="app-container">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Offboarding />}>
            {/* <Route path="/" element={<Welcome />} /> */}
            {user && (
              <>
                <Route path="/newUser" element={<NewUserComponent />} />
                <Route path="uploadDocuments" element={<UploadDocument />} />
                <Route path="sampleDocuments" element={<SampleDocuments />} />
                <Route path="recording" element={<Recording />} />
                <Route path="offboarding-checklist" element={<OffBoardingCheckList />} />
                <Route path="comment" element={<CommentComponent />} />
              </>
            )}
            <Route path="auth/login" element={<LoginComponent />} />
          </Route>
          {/* <Route path="sample" element={<Sample />} /> */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
