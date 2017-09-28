/**
 * Created by hldev on 17-6-14.
 * 机柜管理
 */
import React, {Component} from "react";
import {Link} from "react-router-dom";
import {inject, observer} from "mobx-react";
import {Row, Col, Input, Button, Card, Table, Icon, Form, Popconfirm, Popover} from 'antd';
import HlPagination from "../common/HlPagination";
import HlBreadcrumb from "../common/HlBreadcrumb";
import Panel, {PanelBody, PanelHeader} from '../common/Panel';

@inject("store")
@observer
class CabinetMain extends Component {

    constructor(props) {
        super(props);
        //this.topicState = this.props.store.topicState;
    }

    componentDidMount() {
        //this.topicState.getTopicPage();
    }

    renderContent = () => {
        return(
            <div>
                <p>OS: centous7</p>
                <p>IP: 0.7%</p>
                <p>DISK: 192.168.1.101</p>
                <p>CPU: 3.8%</p>
                <p>Memory: 35.5%</p>
            </div>
        )
    }
    ;


    render() {


        const {getFieldDecorator} = this.props.form;

        const content =this.renderContent();



        const breadcrumb = [{
            path: '/',
            name: '首页'
        }, {
            name: '机柜管理'
        }];

        return (
            <div className="content-main">
                <HlBreadcrumb breadcrumb={breadcrumb}/>
                <Panel>
                    <PanelBody>
                        <div>
                            <div className="fgw-p-m-0">
                                <img src="/static/image/heard.png" alt=""/>
                            </div>
                            <div className="fgw-p-m-0">
                                <Popover content={content} title="主机工作参数说明">
                                    <img src="/static/image/green.png" alt=""/>
                                </Popover>
                            </div>
                            <div className="fgw-p-m-0">
                                <img src="/static/image/yellow.png" alt=""/>
                            </div>
                            <div className="fgw-p-m-0">
                                <img src="/static/image/gray.png" alt=""/>
                            </div>
                            <div className="fgw-p-m-0">
                                <img src="/static/image/green.png" alt=""/>
                            </div>
                            <div className="fgw-p-m-0">
                                <img src="/static/image/yellow.png" alt=""/>
                            </div>
                            <div className="fgw-p-m-0">
                                <img src="/static/image/gray.png" alt=""/>
                            </div>
                            <div className="fgw-p-m-0">
                                <img src="/static/image/green.png" alt=""/>
                            </div>
                            <div className="fgw-p-m-0">
                                <img src="/static/image/yellow.png" alt=""/>
                            </div>
                            <div className="fgw-p-m-0">
                                <img src="/static/image/gray.png" alt=""/>
                            </div>
                            <div className="fgw-p-m-0">
                                <img src="/static/image/footer.png" alt=""/>
                            </div>
                        </div>

                    </PanelBody>
                </Panel>
            </div>);
    }
}

CabinetMain = Form.create()(CabinetMain);
export default  CabinetMain;