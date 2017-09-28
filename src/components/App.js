import React, {Component} from "react";
import {Link, Redirect, Route} from "react-router-dom";
import {inject, observer} from "mobx-react";
import routes from "../routes";
import DevTools from "mobx-react-devtools";
import {isProduction} from "../utils/constants";
import {Col, Dropdown, Icon, Layout, Menu, Row} from "antd";
import AppHeader from "./AppHeader";
const {Header, Content, Footer, Sider, Modal} = Layout;
const SubMenu = Menu.SubMenu;

@inject("store")
@observer
export default class App extends Component {

    constructor(props) {
        super(props);
        //this.store = this.props.store.userState;
    }

    state = {
        mode: 'inline',
        loading: false,
        visible: false,
    };

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    render() {
        const pathname = window.location.pathname;
        const selectedKeys = pathname.split('/');

        const PrivateRoute = ({component: Component, ...rest}) => (
            <Route {...rest} render={props => (
                this.store.user.id ? (
                    <Component {...props}/>
                ) : (
                    <Redirect to={{
                        pathname: '/login',
                        state: {from: props.location}
                    }}/>
                )
            )}/>
        );

        return (
            <Layout>
                {isProduction ? null : <DevTools/>}
                <Sider id="sider">
                    <div className="fgw-logo">
                        <Row gutter={16}>
                            <Col span={8}>
                                <Icon type="user" style={{fontSize: 40}} className="fgw-h-img" alt=""/>
                            </Col>
                            <Col span={8} className="fgw-logo-font">LOGO</Col>
                        </Row>
                    </div>
                    <div className="fgw-clear"/>
                    <Menu id="menu" className="fgw-leftbar-color" mode={this.state.mode}
                          selectedKeys={[selectedKeys[1]]} defaultSelectedKeys={['clusterMain']}>


                        <Menu.Item key="clusterMain" className="fgw-menu">
                            <Link to="/clusterMain">
                                <span className="nav-text">集群展示</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="cabinetMain" className="fgw-menu">
                            <Link to="/cabinetMain">
                                <span className="nav-text">机柜管理</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="hostMain" className="fgw-menu">
                            <Link to="/hostMain">
                                <span className="nav-text">主机管理</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="keywordMain" className="fgw-menu">
                            <Link to="/keywordMain">
                                <span className="nav-text">图表展示</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="imgShow" className="fgw-menu">
                            <Link to="/imgShow">
                                <span className="nav-text">图片展示</span>
                            </Link>
                        </Menu.Item>
                      <Menu.Item key="formMain" className="fgw-menu">
                        <Link to="/formMain">
                          <span className="nav-text">表单组件</span>
                        </Link>
                      </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <AppHeader/>
                    <Content id="content">
                        <div>
                            <Route exact path="/" render={() => (<Redirect to="/clusterMain"/>)}/>
                            {routes.map((route, index) => {
                                if (route.protected === 'yes') {
                                    return (
                                        <PrivateRoute key={index}
                                                      path={route.path}
                                                      component={route.component}
                                                      exact={true}/>
                                    )
                                } else {
                                    return (
                                        <Route key={index}
                                               path={route.path}
                                               component={route.component}
                                               exact={true}/>
                                    )
                                }
                            })}
                        </div>
                    </Content>
                    {/*<Footer style={{textAlign: 'center'}}>*/}
                    {/*Ant Design ©2016 Created by Ant UED*/}
                    {/*</Footer>*/}
                </Layout>
            </Layout>
        );
    }
}
