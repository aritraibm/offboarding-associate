import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';
import { tabSelected, appStore } from '../../store';
import { SAMPLE_DOCUMENTS_TAB } from '../UIConstants';
import { Button } from '../../components/core';

const MenuGenerator = () => {

    const dispatch = useDispatch();
    const store = useSelector(appStore);
    const { activeTab, userDetails: user } = store;
    const isTabActive = (tabName: string) => (activeTab === tabName ? 'active-tab' : '');
    const tabClicked = (tab: string) => dispatch(tabSelected({ tab }));

    return (
        <li className={isTabActive(SAMPLE_DOCUMENTS_TAB)}>
            <Link to="/sampleDocuments">
                <Button
                    label={SAMPLE_DOCUMENTS_TAB}
                    clickHandler={() => tabClicked(SAMPLE_DOCUMENTS_TAB)}
                />
            </Link>
        </li>
    );
};

export default MenuGenerator;
