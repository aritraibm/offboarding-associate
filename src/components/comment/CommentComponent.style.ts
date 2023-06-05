import styled from 'styled-components';

let count=1;

export const ReplyWrapper = styled.p`
    width: 90%;
    margin: 0em 0em 2em 5em;
`;

export const ReplyLeftPadding = styled.p`
    margin-left: ${count= count+1}em;
`;

export const ListWrapper = styled.p`
    background-color: white;
    border-radius: 15px;
    text-align: left;
    padding: 1em;
`;

export const TimeWrapper = styled.span`
    color: #fff;
    background-color: #1ab394;
    border-color: #1ab394;
    border-radius: 15px;
    width: 30%;
    height: 16px;
    text-align: center;
    float: inherit;
    font-size: 10px;
    box-shadow: 0px 3px #929598;
`;


export const UserWrapper = styled.span`
    color: #fff;
    background-color: #2677c7;
    border-color: #ffffff;
    border-radius: 6px;
    width: 68%;
    height: 20px;
    text-align: center;
    float: inherit;
    font-size: 12px;
    /* box-shadow: 0px 3px #929598; */
    padding: 7px;
`;

export const NBSP = styled.span`
    color: #fff;
    background-color: #1ab394;
    border-color: #1ab394;
    border-radius: 15px;
    width: 30%;
    height: 16px;
    text-align: center;
    float: inherit;
    font-size: 10px;
    box-shadow: 0px 3px #929598;
`;