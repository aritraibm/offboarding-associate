import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';
import { tabSelected, appStore } from '../../store';
import { Button } from '../../components/core';
import { MenuGeneratorProps } from '../type';

const MenuGenerator = (props: MenuGeneratorProps) => {

    const dispatch = useDispatch();
    const store = useSelector(appStore);
    const { activeTab, userDetails: user } = store;
    const isTabActive = (tabName: string) => (activeTab === tabName ? 'active-tab' : '');
    const tabClicked = (tab: string) => dispatch(tabSelected({ tab }));

    return (
        <li className={isTabActive(props.label)}>
            <Link to={props.linkTo} state={props.state}>
                <Button
                    label={props.label}
                    clickHandler={() => tabClicked(props.label)}
                />
            </Link>
        </li>
    );
};

export default MenuGenerator;
