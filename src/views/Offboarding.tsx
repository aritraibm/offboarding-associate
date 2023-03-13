import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { NEW_USER_TAB, RECORDINGS_TAB, ROLE_ASSOCIATE, ROLE_ONBOARDING_MANAGER, ROLE_ONBOARDING_REVIEWER, SAMPLE_DOCUMENTS_TAB, UPLOAD_DOCUMENTS_TAB } from '../helper/constants';
import { appStore } from '../store';
import MenuGenerator from '../helper/HOC/MenuGenerator';

export default function Offboarding() {
  const store = useSelector(appStore);
  const { userDetails: user } = store || {};


  const loginFormRender = () => {
    return (
      <ul className="nav-links">
        {user &&
          (user.role === ROLE_ONBOARDING_REVIEWER ||
            user.role === ROLE_ONBOARDING_MANAGER) && (
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
                label={SAMPLE_DOCUMENTS_TAB}
                linkTo="/sampleDocuments"
              />
              <MenuGenerator
                label={UPLOAD_DOCUMENTS_TAB}
                linkTo="/uploadDocuments"
                state={{ forAssociate: { empId: user.empId } }}
              />

            </>
          )}
        {user && user.role === ROLE_ASSOCIATE && (
          <>
            <MenuGenerator
              label={NEW_USER_TAB}
              linkTo="/newUser"
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
              label={RECORDINGS_TAB}
              linkTo="/recording"
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
