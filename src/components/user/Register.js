/**
 * Created by hldev on 17-5-26.
 */
import React, {Component} from "react";
import {Link} from "react-router-dom";
import {inject, observer} from "mobx-react";
import HlBreadcrumb from '../common/HlBreadcrumb'
import {Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete} from 'antd';
const FormItem = Form.Item;

@inject("store")
@observer
class Register extends Component {

    constructor(props) {
        super(props);
        this.store = this.props.store.userState;
    }

    state = {
        confirmDirty: false,
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                values.confirm=undefined;
                // values.phone=undefined;
                // values.username=undefined;
                this.store.register(values);
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

        const breadcrumb = [
            {name:'首页',path:'/'},
            {name:'注册',path:''},
        ];


        return (
            <div id="nlp">
                <div style={{width: '1100px', margin: '0 auto'}}>
                    <HlBreadcrumb breadcrumb={breadcrumb}/>
                    <Form onSubmit={this.handleSubmit}>
                        <FormItem
                            {...formItemLayout}
                            label="用户"
                            hasFeedback
                        >
                            {getFieldDecorator('account', {
                                rules: [{
                                    required: true, message: '请输入您的用户!',
                                }],
                            })(
                                <Input  placeholder="注册用户可以为邮箱,电话或用户名!"/>
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="密码"
                            hasFeedback
                        >
                            {getFieldDecorator('password', {
                                rules: [{
                                    required: true, message: '请输入您的密码!',
                                }, {
                                    validator: this.checkConfirm,
                                }],
                            })(
                                <Input type="password"/>
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="确认密码"
                            hasFeedback
                        >
                            {getFieldDecorator('confirm', {
                                rules: [{
                                    required: true, message: '请确认您的密码!',
                                }, {
                                    validator: this.checkPassword,
                                }],
                            })(
                                <Input type="password" onBlur={this.handleConfirmBlur}/>
                            )}
                        </FormItem>
                        <FormItem {...tailFormItemLayout}>
                            <Button type="primary" htmlType="submit" size="large" style={{width: '100%'}}>注册</Button>
                        </FormItem>
                    </Form>
                </div>
            </div>
        );
    }
}

Register = Form.create()(Register);
export default  Register;