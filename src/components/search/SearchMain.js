/**
 * Created by hldev on 17-6-14.
 */
import React, {Component} from "react";
import {Link} from "react-router-dom";
import {inject, observer} from "mobx-react";
import HlPagination from "../common/HlPagination"
import {Row, Col, Input, Button, Card, Table, Icon, Form, Popconfirm, Modal, Spin} from 'antd';
const FormItem = Form.Item;

@inject("store")
@observer
class SearchMain extends Component {


    constructor(props) {
        super(props);
        this.store = this.props.store.searchState;
    }

    state = {visible: false, loading: false};
    //打开模态框的时候，需要判断如果有id值则需要调用后台接口并把值显示到输入框中
    //如果没得id值，那么执行添加操作，输入框应该要清空一次
    showModal = (isId) => {
        console.log('-------------------', isId);
        if (isId) {
            this.setState({loading: true});
            this.store.getTopic(isId).then(() => {
                this.setState({
                    visible: true,
                });
                this.setState({loading: false});
                console.log(this.store.topic)
            });
        } else {

        }
    };
    handleOk = (e) => {
        console.log('this.props', this.props);
        console.log(e);
        let isId = this.props.store.searchState.topic.id;
        if (isId) {
            this.props.form.validateFieldsAndScroll((err, values) => {
                if (!err) {
                    console.log('Received values of form: ', values);
                    values.id = isId;
                    this.store.updataTopic(values);
                }
            });
        } else {
            this.props.form.validateFieldsAndScroll((err, values) => {
                if (!err) {
                    this.store.createTopic(values);
                }
            });
        }
        this.setState({
            visible: false,
        });
        this.store.getTopicPage();
    };
    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };
    //isAdd = () => this.props.match.params.id === 'add';
    isAdd = () => this.props.store.searchState.topic.id === 'add';

    componentDidMount() {
        this.store.getTopicPage();
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this.store.getTopicPage(values);
                // let promise;
                // promise = this.store.createTopic(values);
                // promise.then(data => {
                //     Utils.pushLink(`/topic`);
                // })
            }
        });
    };

    render() {

        const columns = [{
            title: '序号',
            dataIndex: 'id',
            key: 'id',
        }, {
            title: '时间',
            dataIndex: 'time',
            key: '2',
        }, {
            title: '关键词位置',
            dataIndex: 'name',
            key: 'name',
        }, {
            title: '修改',
            key: 'update',
            render: (text, record, index) => <Icon type="edit" onClick={() => {
                this.props.form.setFieldsValue({name: record.name});
                this.showModal(`${record.id}`)
            }}/>
        }, {
            title: '删除',
            key: 'delete',

            render: (text, record, index) => <Popconfirm title="是否确认删除该记录?" onConfirm={() => this.store.deleteTopic(`${record.id}`)}><Icon
                type="delete"/></Popconfirm>
        }];

        const {getFieldDecorator} = this.props.form;
        console.log(this.store.topicPage);
        const params = this.getFieldDecorator;


        const paginationProps = {
            //totalElements: (this.store.totalElements).toString(),
            totalElements: this.store.totalElements,
            params: params,
            state: "searchState",
            method: "getTopicPage"
        };

        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 6},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 14},
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 14,
                    offset: 6,
                },
            },
        };


        return (
            <div id="websiteMain" style={{marginTop: 16}}>
                <Row type="flex" justify="start">
                    <Col span={4}>
                        <Card style={{height: 70, margin: '0 16px 16px 16px'}}>
                            <Icon type="arrow-left"/>返回主页
                        </Card>
                        {/*<Card style={{height: 280, margin: '0 16px 16px 16px'}}>
                            <Form onSubmit={this.handleSubmit} className="login-form">
                                <FormItem label="主题名称">
                                    {getFieldDecorator('name')(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem>
                                    <Button type="primary" htmlType="submit" size="large">
                                        查询
                                    </Button>
                                    <Button type="primary" size="large" onClick={this.showModal}>
                                        新建
                                    </Button>
                                </FormItem>
                            </Form>
                        </Card>*/}
                    </Col>
                    <Col span={20}>
                        <Card title="搜索设置" style={{margin: '0 16px 16px 0'}} extra={ <Button type="primary" onClick={this.showModal} size="large">添加</Button>}>
                            <Table columns={columns} pagination={false} dataSource={[...this.store.topicPage.length === 0 ? [] : this.store.topicPage]}/>
                            <HlPagination paginationProps={paginationProps}/>
                        </Card>
                    </Col>
                </Row>


                {/*=======================================================================*/}
                <Modal
                    title="操作"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}>
                    <Spin spinning={this.state.loading}>
                        <Form onSubmit={this.handleSubmit}>
                            <FormItem
                                {...formItemLayout}
                                label="主题名称"
                                hasFeedback
                            >
                                {getFieldDecorator('name', {
                                    rules: [{
                                        required: true, message: '请输入主题名称!',
                                    }],
                                    initialValue: this.isAdd() ? "" : this.store.topic.name
                                })(
                                    <Input />
                                )}
                            </FormItem>
                        </Form>
                    </Spin>
                </Modal>
               {/* <p>{this.store.topic.name}</p>*/}
            </div>
        )
    }
}

SearchMain = Form.create()(SearchMain);
export default  SearchMain;