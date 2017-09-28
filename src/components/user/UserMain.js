/**
 * Created by hldev on 17-6-19.
 */
import React, {Component} from "react";
import {Link} from "react-router-dom";
import {inject, observer} from "mobx-react";
import {Form, Input, Row, Col, Button, Card, DatePicker, Radio, Select} from 'antd';
import HlBreadcrumb from '../common/HlBreadcrumb'
import Panel, {PanelBody, PanelHeader} from '../common/Panel';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;

@inject("store")
@observer
class UserMain extends Component {

    constructor(props) {
        super(props);
        this.state = {
            confirmDirty: false,
        };
        this.userState = this.props.store.userState;
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                //values.confirm = undefined;
                // values.phone=undefined;
                values.id = this.userState.user.id;
                values.search_at = Number(values.search_at);
                values.search_from = Number(values.search_from);
                values.sex = Number(values.sex);
                values.status = Number(values.status);
                // values.username=undefined;
                this.userState.updataUser(values);//更新用户信息
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

        let optionValue = this.userState.user.search_at + '';
        let radioValue = this.userState.user.search_from + '';
        let sexValue = this.userState.user.sex + '';
        let statusValue = this.userState.user.status + '';

        const breadcrumb = [{
            path: '/',
            name: '首页'
        }, {
            name: '个人信息'
        }];
        return (
            <div id="userMain" className="content-main">
                <HlBreadcrumb breadcrumb={breadcrumb}/>
                <Panel>
                    <PanelBody>
                        <Form onSubmit={this.handleSubmit} layout="vertical">
                            <FormItem label="电子邮箱"
                                      hasFeedback>
                                {getFieldDecorator('email', {
                                    rules: [{
                                        type: 'email', message: '邮箱格式不正确!',
                                    }, {
                                        required: true, message: '邮箱不能为空',
                                    }],
                                    initialValue: this.userState.user.email
                                })(
                                    <Input />
                                )}
                            </FormItem>
                            <FormItem label="用户名"
                                      hasFeedback>
                                {getFieldDecorator('username', {
                                    rules: [{required: true, message: '用户名不能为空!', whitespace: true}],
                                    initialValue: this.userState.user.username
                                })(
                                    <Input />
                                )}
                            </FormItem>
                            <FormItem label="性别">
                                {getFieldDecorator('sex', {
                                    initialValue: sexValue
                                })(
                                    <RadioGroup>
                                        <Radio value="0">女</Radio>
                                        <Radio value="1">男</Radio>
                                    </RadioGroup>
                                )}
                            </FormItem>
                            {/*<FormItem label="状态">*/}
                                {/*{getFieldDecorator('status', {*/}
                                    {/*initialValue: statusValue*/}
                                {/*})(*/}
                                    {/*<RadioGroup>*/}
                                        {/*<Radio value="0">禁用</Radio>*/}
                                        {/*<Radio value="1">启用</Radio>*/}
                                    {/*</RadioGroup>*/}
                                {/*)}*/}
                            {/*</FormItem>*/}
                            <FormItem label="手机号码">
                                {getFieldDecorator('phone', {
                                    rules: [{
                                        required: true, message: '手机号码不能为空!'
                                    },{
                                        validator: this.checkPhone
                                    }],
                                    initialValue: this.userState.user.phone
                                })(
                                    <Input />
                                )}
                            </FormItem>
                            <FormItem>
                                <Button type="primary" htmlType="submit">修改</Button>
                            </FormItem>
                        </Form>
                    </PanelBody>
                </Panel>
            </div>
        );
    }
}

UserMain = Form.create()(UserMain);
export default  UserMain;