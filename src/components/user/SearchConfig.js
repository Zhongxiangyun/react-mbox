/**
 * Created by hldev on 17-6-19.
 */
import React, {Component} from "react";
import {Link} from "react-router-dom";
import {inject, observer} from "mobx-react";
import {Form, Input, Row, Col, Button, Card, DatePicker, Radio, Select, Spin} from 'antd';
import HlBreadcrumb from '../common/HlBreadcrumb';
import Utils from '../../utils/util'
import Panel, {PanelBody, PanelHeader} from '../common/Panel';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;

@inject("store")
@observer
class SearchConfig extends Component {

    constructor(props) {
        super(props);
        this.state = {
            confirmDirty: false,
            loading: false,
        };
        this.userState = this.props.store.userState;
    }


    componentDidMount() {

    }


    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                //values.confirm = undefined;
                // values.phone=undefined;
                values.id = this.userState.user.id;
                values.searchAt = Number(values.searchAt);
                values.searchFrom = Number(values.searchFrom);
                values.sex = Number(values.sex);
                values.status = Number(values.status);
                // values.username=undefined;
                this.userState.updataUser(values);//更新用户信息
                console.log('Received values of form: ', values);
            }
        });
    };

    /*
    * 为用户设置默认值操作
    * */
    handleClick = (e) =>{
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.setState({loading: true});
                values.id = this.userState.user.id;
                values.searchAt = 1;//全部时间
                values.searchFrom = 1; //标题加正文
                values.sex = Number(values.sex);
                values.status = 1;
                //更新用户信息
                this.userState.updataUser(values).then((value) => {
                    console.log('value',value);
                    this.props.form.setFieldsValue({searchAt: '1'});
                    this.props.form.setFieldsValue({searchFrom: '1'});
                    setTimeout(function () {
                        this.setState({loading: false});
                    }.bind(this), 3000);
                });
                //history.go(0);
                console.log('Received values of form: ', values);
            }
        });
    };

    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({confirmDirty: this.state.confirmDirty || !!value});
    };

    checkPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('输入的两个密码不一致!');
        } else {
            callback();
        }
    };

    checkConfirm = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], {force: true});
        }
        callback();
    };

    //校验手机号码
    checkPhone = (rule, value, callback) => {
        if (!(/^1(3|4|5|7|8)\d{9}$/.test(value)) && value !== "") {
            callback("输入的不是有效的电话号码");
        } else {
            callback();
        }
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        console.log('this.userState',this.userState);
        console.log('this.userState.user.search_at',this.userState.user.searchAt);

        //this.store.financialIndex.length === 0 ? [] : this.store.financialIndex
        const searchAtValue = this.userState.user.searchAt + '';
        //const searchAtValue = this.userState.user.searchAt ? 1 : this.userState.user.searchAt+'';
        const searchFromAt = this.userState.user.searchFrom + '';
        //const searchFromAt = this.userState.user.searchFrom ? 1 : this.userState.user.searchFrom+'';

        const breadcrumb = [{
            path: '/',
            name: '首页'
        }, {
            name: '搜索设置'
        }];
        return (
            <div id="userMain" className="content-main">
                <HlBreadcrumb breadcrumb={breadcrumb}/>
                <Panel>
                    <PanelBody>
                        <Spin spinning={this.state.loading}>
                        <Form onSubmit={this.handleSubmit} layout="vertical">
                            <FormItem label="时间">
                                {getFieldDecorator('searchAt', {
                                    initialValue: searchAtValue
                                })(
                                    <Select>
                                        <Option value="1">全部时间</Option>
                                        <Option value="2">最近一周</Option>
                                        <Option value="3">最近一月</Option>
                                        <Option value="4">最近一年</Option>
                                    </Select>
                                )}
                            </FormItem>
                            <FormItem label="关键词位置">
                                {getFieldDecorator('searchFrom', {
                                    initialValue: searchFromAt
                                })(
                                    <RadioGroup>
                                        <Radio value="2">标题</Radio>
                                        <Radio value="1">标题+正文</Radio>
                                    </RadioGroup>
                                )}
                            </FormItem>
                            <FormItem>
                                <Button type="primary" htmlType="submit">保存更改</Button>
                                <Button type="primary" onClick={this.handleClick}>恢复默认</Button>
                            </FormItem>
                        </Form>
                        </Spin>
                    </PanelBody>
                </Panel>
            </div>
        );
    }
}

SearchConfig = Form.create()(SearchConfig);
export default  SearchConfig;