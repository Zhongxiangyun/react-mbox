/**
 * Created by hldev on 17-5-23.
 */
import React, {Component} from "react";
import {Link, Redirect} from "react-router-dom";
import {inject, observer} from "mobx-react";
import createHistory from 'history/createBrowserHistory'
import {Button, Modal, Form, Input, Icon, Checkbox} from "antd";
const FormItem = Form.Item;
const history = createHistory();

@inject("store")
@observer
class Login extends Component {

    constructor(props) {
        super(props);
        this.store = this.props.store.userState;
    }

    state = {
        visible: true,
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.store.login(values);
            }
        });
    };

    handleCancel = () => {
        history.goBack()
    };

    render() {
        const {visible} = this.state;
        const {getFieldDecorator} = this.props.form;

        const {from} = this.props.location.state || {from: {pathname: '/'}};

        if (this.store.user.id) {
            return (
                <Redirect to={from}/>
            )
        }

        return (
            <div id="login">
                <Modal title="登录"
                       visible={visible}
                       footer={null}
                       onCancel={this.handleCancel}
                >
                    <Form className="login-form" onSubmit={this.handleSubmit}>
                        <FormItem>
                            {getFieldDecorator('account', {
                                rules: [{required: true, message: '请输入您的用户名!'}],
                            })(
                                <Input prefix={<Icon type="user" style={{fontSize: 13}}/>}
                                       placeholder="用户名"/>
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [{required: true, message: '请输入您的密码!'}],
                            })(
                                <Input prefix={<Icon type="lock" style={{fontSize: 13}}/>} type="password"
                                       placeholder="密码"/>
                            )}
                        </FormItem>
                        <FormItem>
                            <a style={{float: 'right'}} href="">忘记密码</a>
                            {/*没有账号? <Link to="/register">现在去注册</Link>*/}
                            <Button type="primary" htmlType="submit" style={{width: '100%'}}>
                                登录
                            </Button>
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        );
    }
}

Login = Form.create()(Login);
export default  Login;