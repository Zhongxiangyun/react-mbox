/**
 * Created by hldev on 17-6-14.
 * 集群俯视管理
 */
import React, {Component} from "react";
import {Link} from "react-router-dom";
import {inject, observer} from "mobx-react";
import {Row, Col, Input, Button, Card, Table, Icon, Form, Popconfirm} from 'antd';
import HlPagination from "../common/HlPagination";
import HlBreadcrumb from "../common/HlBreadcrumb";
import Panel, {PanelBody, PanelHeader} from '../common/Panel';

@inject("store")
@observer
class ClusterMain extends Component {

    constructor(props) {
        super(props);
        //this.topicState = this.props.store.topicState;
    }

    componentDidMount() {
       // this.topicState.getTopicPage();
    }

    render() {

        const {getFieldDecorator} = this.props.form;


        const breadcrumb = [{
            path: '/',
            name: '首页'
        }, {
            name: '集群管理'
        }];

        return (
            <div className="content-main">
                <HlBreadcrumb breadcrumb={breadcrumb}/>
                <Panel>
                    <PanelBody style={{position: 'relative'}}>
                        <Row gutter={24} className='fgw-margin-bottom-20'>
                            <Link to={`/cabinetMain`}>
                                <Col span={4} className='fgw-cluster-size fgw-margin-left-20'>
                                    <p>
                                        <span className="fgw-status-span-green">&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                        A003
                                    </p>
                                </Col>
                            </Link>
                            <Col span={4} className='fgw-cluster-size'>
                                <p>
                                    <span className="fgw-status-span-green">&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                    B003
                                </p>
                            </Col>
                            <Col span={4} className='fgw-cluster-size'>
                                <p>
                                    <span className="fgw-status-span-yellow">&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                    A001
                                </p>
                            </Col>
                            <Col span={4} className='fgw-cluster-size'>
                                <p>
                                    <span className="fgw-status-span-yellow">&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                    A001
                                </p>
                            </Col>
                            <Col span={4} className='fgw-cluster-size'>
                                <p>
                                    <span className="fgw-status-span-gray">&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                    A001
                                </p>
                            </Col>
                            <Col span={4} className='fgw-cluster-size'>
                                <p>
                                    <span className="fgw-status-span-gray">&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                    A001
                                </p>
                            </Col>
                            <Col span={4} className='fgw-cluster-size'>
                                <p>
                                    <span className="fgw-status-span-yellow">&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                    A001
                                </p>
                            </Col>
                            <Col span={4} className='fgw-cluster-size'>
                                <p>
                                    <span className="fgw-status-span-gray">&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                    A001
                                </p>
                            </Col>
                            <Col span={4} className='fgw-cluster-size'>
                                <p>
                                    <span className="fgw-status-span-gray">&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                    A001
                                </p>
                            </Col>
                            <Col span={4} className='fgw-cluster-size'>
                                <p>
                                    <span className="fgw-status-span-green">&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                    A001
                                </p>
                            </Col>
                            <Col span={4} className='fgw-cluster-size'>
                                <p>
                                    <span className="fgw-status-span-yellow">&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                    A001
                                </p>
                            </Col>
                            <Col span={4} className='fgw-cluster-size'>
                                <p>
                                    <span className="fgw-status-span-yellow">&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                    A001
                                </p>
                            </Col>

                        </Row>
                        <Row gutter={24} className='fgw-margin-bottom-20'>
                            <Link to={`/cabinetMain`}>
                                <Col span={4} className='fgw-cluster-size fgw-margin-left-20'>
                                    <p>
                                        <span className="fgw-status-span-green">&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                        A002
                                    </p>
                                </Col>
                            </Link>
                            <Col span={4} className='fgw-cluster-size'>
                                <p>
                                    <span className="fgw-status-span-green">&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                    B002
                                </p>
                            </Col>
                            <Col span={4} className='fgw-cluster-size'>
                                <p>
                                    <span className="fgw-status-span-yellow">&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                    A001
                                </p>
                            </Col>
                            <Col span={4} className='fgw-cluster-size'>
                                <p>
                                    <span className="fgw-status-span-yellow">&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                    A001
                                </p>
                            </Col>
                            <Col span={4} className='fgw-cluster-size'>
                                <p>
                                    <span className="fgw-status-span-gray">&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                    A001
                                </p>
                            </Col>
                            <Col span={4} className='fgw-cluster-size'>
                                <p>
                                    <span className="fgw-status-span-gray">&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                    A001
                                </p>
                            </Col>
                            <Col span={4} className='fgw-cluster-size'>
                                <p>
                                    <span className="fgw-status-span-yellow">&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                    A001
                                </p>
                            </Col>
                            <Col span={4} className='fgw-cluster-size'>
                                <p>
                                    <span className="fgw-status-span-gray">&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                    A001
                                </p>
                            </Col>
                            <Col span={4} className='fgw-cluster-size'>
                                <p>
                                    <span className="fgw-status-span-gray">&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                    A001
                                </p>
                            </Col>
                            <Col span={4} className='fgw-cluster-size'>
                                <p>
                                    <span className="fgw-status-span-green">&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                    A001
                                </p>
                            </Col>
                            <Col span={4} className='fgw-cluster-size'>
                                <p>
                                    <span className="fgw-status-span-yellow">&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                    A001
                                </p>
                            </Col>
                            <Col span={4} className='fgw-cluster-size'>
                                <p>
                                    <span className="fgw-status-span-yellow">&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                    A001
                                </p>
                            </Col>

                        </Row>
                        <Row gutter={24} className='fgw-margin-bottom-20'>
                            <Link to={`/cabinetMain`}>
                                <Col span={4} className='fgw-cluster-size fgw-margin-left-20'>
                                    <p>
                                        <span className="fgw-status-span-green">&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                        A001
                                    </p>
                                </Col>
                            </Link>
                            <Col span={4} className='fgw-cluster-size'>
                                <p>
                                    <span className="fgw-status-span-green">&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                    B001
                                </p>
                            </Col>
                            <Col span={4} className='fgw-cluster-size'>
                                <p>
                                    <span className="fgw-status-span-yellow">&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                    A001
                                </p>
                            </Col>
                            <Col span={4} className='fgw-cluster-size'>
                                <p>
                                    <span className="fgw-status-span-yellow">&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                    A001
                                </p>
                            </Col>
                            <Col span={4} className='fgw-cluster-size'>
                                <p>
                                    <span className="fgw-status-span-gray">&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                    A001
                                </p>
                            </Col>
                            <Col span={4} className='fgw-cluster-size'>
                                <p>
                                    <span className="fgw-status-span-gray">&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                    A001
                                </p>
                            </Col>
                            <Col span={4} className='fgw-cluster-size'>
                                <p>
                                    <span className="fgw-status-span-yellow">&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                    A001
                                </p>
                            </Col>
                            <Col span={4} className='fgw-cluster-size'>
                                <p>
                                    <span className="fgw-status-span-gray">&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                    A001
                                </p>
                            </Col>
                            <Col span={4} className='fgw-cluster-size'>
                                <p>
                                    <span className="fgw-status-span-gray">&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                    A001
                                </p>
                            </Col>
                            <Col span={4} className='fgw-cluster-size'>
                                <p>
                                    <span className="fgw-status-span-green">&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                    A001
                                </p>
                            </Col>
                            <Col span={4} className='fgw-cluster-size'>
                                <p>
                                    <span className="fgw-status-span-yellow">&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                    A001
                                </p>
                            </Col>
                            <Col span={4} className='fgw-cluster-size'>
                                <p>
                                    <span className="fgw-status-span-yellow">&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                    A001
                                </p>
                            </Col>

                        </Row>



                        <PanelHeader>
                            <Row>
                                <Col span={8}>
                                    <p>
                                        <span className="fgw-status-span-green">&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                        ——正常工作状态
                                    </p>
                                </Col>
                                <Col span={8}>
                                    <p>
                                        <span className="fgw-status-span-yellow">&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                        ——预警状态
                                    </p>
                                </Col>
                                <Col span={8}>
                                    <p>
                                        <span className="fgw-status-span-gray">&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                        ——未使用状态
                                    </p>
                                </Col>
                            </Row>
                        </PanelHeader>
                    </PanelBody>
                </Panel>
            </div>);
    }
}

ClusterMain = Form.create()(ClusterMain);
export default  ClusterMain;