import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';
import { NEW_USER_TAB, RECORDINGS_TAB, ROLE_ASSOCIATE, ROLE_ONBOARDING_MANAGER, ROLE_ONBOARDING_REVIEWER, SAMPLE_DOCUMENTS_TAB, UPLOAD_DOCUMENTS_TAB } from '../helper/UIConstants';
import { Button } from '../components/core';
import { tabSelected, appStore } from '../store';

export default function Offboarding() {
  const dispatch = useDispatch();
  const store = useSelector(appStore);
  const { activeTab, userDetails: user } = store || {};
  const isTabActive = (tabName: string) => (activeTab === tabName ? 'active-tab' : '');
  const tabClicked = (tab: string) => dispatch(tabSelected({ tab }));

  const loginFormRender = () => {
    return (
      <ul className="nav-links">
        {user &&
          (user.role === ROLE_ONBOARDING_REVIEWER ||
            user.role === ROLE_ONBOARDING_MANAGER) && (
            <>
              <li className={isTabActive(NEW_USER_TAB)}>
                <Link to="/newUser">
                  <Button
                    label={NEW_USER_TAB}
                    clickHandler={() => tabClicked(NEW_USER_TAB)}
                  />
                </Link>
              </li>
              <li className={isTabActive(RECORDINGS_TAB)}>
                <Link to="/recording">
                  <Button
                    label={RECORDINGS_TAB}
                    clickHandler={() => tabClicked(RECORDINGS_TAB)}
                  />
                </Link>
              </li>
              <li className={isTabActive(SAMPLE_DOCUMENTS_TAB)}>
                <Link to="/sampleDocuments">
                  <Button
                    label={SAMPLE_DOCUMENTS_TAB}
                    clickHandler={() => tabClicked(SAMPLE_DOCUMENTS_TAB)}
                  />
                </Link>
              </li>
              <li className={isTabActive(UPLOAD_DOCUMENTS_TAB)}>
                <Link to="/uploadDocuments" state={{ forAssociate: { empId: user.empId } }}>
                  <Button
                    label={UPLOAD_DOCUMENTS_TAB}
                    clickHandler={() => tabClicked(UPLOAD_DOCUMENTS_TAB)}
                  />
                </Link>
              </li>
            </>
          )}
        {user && user.role === ROLE_ASSOCIATE && (
          <>
            <li className={isTabActive(NEW_USER_TAB)}>
              <Link to="/newUser">
                <Button
                  label={NEW_USER_TAB}
                  clickHandler={() => tabClicked(NEW_USER_TAB)}
                />
              </Link>
            </li>
            <li className={isTabActive(SAMPLE_DOCUMENTS_TAB)}>
              <Link to="/sampleDocuments">
                <Button
                  label={SAMPLE_DOCUMENTS_TAB}
                  clickHandler={() => tabClicked(SAMPLE_DOCUMENTS_TAB)}
                />
              </Link>
            </li>
            <li className={isTabActive(UPLOAD_DOCUMENTS_TAB)}>
              <Link to="/uploadDocuments" state={{ forAssociate: {} }}>
                <Button
                  label={UPLOAD_DOCUMENTS_TAB}
                  clickHandler={() => tabClicked(UPLOAD_DOCUMENTS_TAB)}
                />
              </Link>
            </li>
            <li className={isTabActive(RECORDINGS_TAB)}>
              <Link to="/recording">
                <Button
                  label={RECORDINGS_TAB}
                  clickHandler={() => tabClicked(RECORDINGS_TAB)}
                />
              </Link>
            </li>
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
