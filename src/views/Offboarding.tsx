import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { CHECKLIST, COMMENTS, NEW_USER_TAB, RECORDINGS_TAB, ROLE_ASSOCIATE, ROLE_OFFBOARDING_MANAGER, ROLE_OFFBOARDING_REVIEWER, SAMPLE_DOCUMENTS_TAB, UPLOAD_DOCUMENTS_TAB } from '../helper/constants';
import { appStore } from '../store';
import MenuGenerator from '../helper/HOC/MenuGenerator';

export default function Offboarding() {
  const store = useSelector(appStore);
  const { userDetails: user } = store || {};


  const loginFormRender = () => {
    return (
      <ul className="nav-links">
        {user &&
          (user.role === ROLE_OFFBOARDING_REVIEWER ||
            user.role === ROLE_OFFBOARDING_MANAGER) && (
            <>
              <MenuGenerator
                label={NEW_USER_TAB}
                linkTo="/newUser"
              />
              <MenuGenerator
                label={RECORDINGS_TAB}
                linkTo="/recording"
              />
              <MenuGenerator
                label={CHECKLIST}
                linkTo="/offboarding-checklist"
                state={{ forAssociate: { empId: user.empId } }}
              />
              <MenuGenerator
                label={SAMPLE_DOCUMENTS_TAB}
                linkTo="/sampleDocuments"
              />
              <MenuGenerator
                label={UPLOAD_DOCUMENTS_TAB}
                linkTo="/uploadDocuments"
                state={{ forAssociate: { empId: user.empId } }}
              />
              <MenuGenerator
                label={COMMENTS}
                linkTo="/comment"
              />

            </>
          )}
        {user && user.role === ROLE_ASSOCIATE && (
          <>
            {/* <MenuGenerator
              label={NEW_USER_TAB}
              linkTo="/newUser"
            /> */}
            <MenuGenerator
              label={RECORDINGS_TAB}
              linkTo="/recording"
            />
            <MenuGenerator
              label={SAMPLE_DOCUMENTS_TAB}
              linkTo="/sampleDocuments"
            />
            <MenuGenerator
                label={CHECKLIST}
                linkTo="/offboarding-checklist"
                state={{ forAssociate: { empId: user.empId } }}
              />
            <MenuGenerator
              label={UPLOAD_DOCUMENTS_TAB}
              linkTo="/uploadDocuments"
              state={{ forAssociate: { empId: user.empId } }}
            />
            
              <MenuGenerator
                label={COMMENTS}
                linkTo="/comment"
              />
          </>
        )}
      </ul>
    );
  };

  return (
    <>
      <div className="onboarding-wrapper">
        <div className="onboarding-container">
          {user && loginFormRender()}
          <div className="onboarding-body">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
