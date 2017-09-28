/**
 * Created by hldev on 17-6-22.
 */
import React, {Component} from "react";
import {Link} from "react-router-dom";
import {inject, observer} from "mobx-react";
import createHistory from 'history/createBrowserHistory'
import {Pagination} from 'antd';
import HlPagination from "./HlPagination"
const history = createHistory();

@inject("store")
@observer
export default class TestPage extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const paginationProps = {
            totalElements: 100,
            params: {name: "bb"},
            state: "websiteState",
            method: "getWebsitePage"
        };

        return (
            <HlPagination paginationProps={paginationProps}/>
        )
    }
}