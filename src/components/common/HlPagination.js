/**
 * Created by hldev on 17-6-22.
 */
import React, {Component} from "react";
import {Link} from "react-router-dom";
import {inject, observer} from "mobx-react";
import createHistory from 'history/createBrowserHistory'
import {Pagination} from 'antd';
import lodashIsEqual from "lodash/isEqual"
const history = createHistory();

@inject("store")
@observer
export default class HlPagination extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        page: 1,
        size: 10
    };

    shouldComponentUpdate(nextProps, nextState) {
        if (lodashIsEqual(nextState, this.state)) {
            this.setState({page: 1});
        }
        return !lodashIsEqual(nextProps, this.props) || !lodashIsEqual(nextState, this.state);
    }

    showTotal = (total) => {
        return `共 ${total || 0} 条`;
    };

    onShowSizeChange = (current, pageSize) => {
        console.log(current, pageSize);
        this.setState({page: current, size: pageSize});
        this.props.store[this.props.paginationProps.state][this.props.paginationProps.method]({
            ...this.props.paginationProps.params,
            page: current,
            size: pageSize
        });
    };

    onChange = (pageNumber) => {
        console.log('Page: ', pageNumber);
        this.setState({page: pageNumber});
        this.props.store[this.props.paginationProps.state][this.props.paginationProps.method]({
            ...this.props.paginationProps.params,
            page: pageNumber,
            size: this.state.size
        });
    };

    render() {
        return (
            <Pagination
                current={this.state.page}
                className="fgw-pull-right fgw-margin-20 fgw-clear"
                showSizeChanger
                onShowSizeChange={this.onShowSizeChange}
                showQuickJumper
                onChange={this.onChange}
                showTotal={this.showTotal}
                total={this.props.paginationProps.totalElements}/>
        )
    }
}