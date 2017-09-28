/**
 * Header菜单栏
 * Created by on 2017-06-29.
 */
import React, {Component} from "react";
import {Link, Redirect, Route} from "react-router-dom";
import {inject, observer} from "mobx-react";
import moment from "moment";
import {Col, Dropdown, Icon, Layout, Menu, Row} from "antd";
const {Header, Content, Footer, Sider, Modal} = Layout;
const SubMenu = Menu.SubMenu;

@inject("store")
@observer
export default class AppHeader extends Component {
    constructor(props) {
        super(props);
        this.userState = this.props.store.userState;
    }

    handleLogout = () => {
        this.userState.signout().then(_ => window.location.href = '/', _ => window.location.href = '/');
    };

    handleMenuItemClick = (item) => {
        if (item.key === 'logout') {
            this.handleLogout();
            return;
        }
    };

    renderUserMenus = () => {
        const items = [];
        items.push(
            <Menu.Item key="/user/profile">
                <Link to="/user/profile">个人信息</Link>
            </Menu.Item>);
        items.push(
            <Menu.Item key="/user/search_config">
                <Link to="/user/search_config">搜索设置</Link>
            </Menu.Item>);
        items.push(<Menu.Divider key="divider1"/>);

        if (this.userState.user.username) {
            items.push(
                <Menu.Item key="/website">
                    <Link to="/website">网站管理</Link>
                </Menu.Item>);
            items.push(
                <Menu.Item key="/topic">
                    <Link to="/topic">主题管理</Link>
                </Menu.Item>);
            items.push(<Menu.Divider key="divider2"/>);
        }

        items.push(<Menu.Item key="logout">登出</Menu.Item>);

        return (<Menu onClick={this.handleMenuItemClick}>{items}</Menu>);
    };

    render() {
        const userMenu = this.userState.user.username
            ? <Dropdown key="3" overlay={this.renderUserMenus()}>
                <a className="ant-dropdown-link">
                    {this.userState.user.username}<Icon type="down"/>
                </a>
            </Dropdown>
            : <Link key="3" to="/login">登录</Link>;

        return (
            <Header className="fgw-app-header">
                <Row type="flex" justify="space-around" align="middle">
                    <Col span={20} style={{paddingLeft: '14px'}}>
                        <span>{moment().format('LLLL')}</span>
                    </Col>
                    <Col span={4} style={{paddingRight: '14px', textAlign: 'right'}}>
                        {userMenu}
                    </Col>
                </Row>
            </Header>);
    }
}
