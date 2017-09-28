/**
 * Created by hldev on 17-6-21.
 */

import React, {Component} from "react";
import { Button, Modal, Form, Icon, Input, Radio } from 'antd';
import {inject, observer} from "mobx-react";
import axios from  "axios";
const FormItem = Form.Item;


let uuid = 0;
let uuidcbr = 0;//承办人

@inject("store")
@observer
class FeedbackMain extends Component {

    state = {
        autoCompleteResult: [],
    };

    remove = (k) => {
        const { form } = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        // We need at least one passenger
        //if (keys.length === 1) {
            //return;
        //}

        // can use data-binding to set
        form.setFieldsValue({
            keys: keys.filter(key => key !== k),
        });
    }

    removecbr = (k) => {
        const { form } = this.props;
        // can use data-binding to get
        const keyscbr = form.getFieldValue('keyscbr');
        // We need at least one passenger
        //if (keys.length === 1) {
        //return;
        //}

        // can use data-binding to set
        form.setFieldsValue({
            keyscbr: keyscbr.filter(key => key !== k),
        });
    }

    add = () => {
        uuid++;
        const { form } = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        const nextKeys = keys.concat(uuid);
        // can use data-binding to set
        // important! notify form to detect changes
        form.setFieldsValue({
            keys: nextKeys,
        });
    }

    addcbr = () => {
        uuidcbr++;
        const { form } = this.props;
        // can use data-binding to get
        const keyscbr = form.getFieldValue('keyscbr');
        const nextKeys = keyscbr.concat(uuidcbr);
        // can use data-binding to set
        // important! notify form to detect changes
        form.setFieldsValue({
            keyscbr: nextKeys,
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        //this.props.form.validateFields((err, values) => {
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                axios.post('/doc/feedBackDemo', {
                    swid: values.swid,
                    cbcs: [1,2,3],

                })
                    .then(function (response) {

                        //debugger;
                        alert("反馈提交成功");
                    })
                    .catch(function (error) {
                        debugger;
                        //console.log(data);
                        alert("提交反馈失败：" + error.message);
                    });
            }
        });
    }

    //校整形
    checkInteger = (rule, value, callback) => {
        if (!(/^[1-9]+[0-9]*]*$/.test(value)) && value !== "") {
            callback("输入的不是有效的ID(数字)！");
        } else {
            callback();
        }
    };

    render() {
        const {autoCompleteResult} = this.state;

        const { getFieldDecorator, getFieldValue } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 20 },
            },
        };
        const formItemLayoutWithOutLabel = {
            wrapperCol: {
                xs: { span: 24, offset: 0 },
                sm: { span: 20, offset: 4 },
            },
        };
        getFieldDecorator('keys', { initialValue: [] });
        const keys = getFieldValue('keys');
        const formItems = keys.map((k, index) => {
            return (
                <FormItem
                    {...(formItemLayout)}
                    label={'承办处室' + (index+1) + ':'}
                    required={false}
                    key={k}
                >
                    {getFieldDecorator(`names-${k}`, {
                        validateTrigger: ['onChange', 'onBlur'],
                        rules: [{
                            required: true, message: "请输入承办处室ID或删除这条信息.",
                        },{
                            validator: this.checkInteger,
                        }],
                    })(
                        <Input placeholder="承办处室ID" style={{ width: '30%', marginRight: 8 }} />
                    )}
                    <Icon
                        className="dynamic-delete-button"
                        type="minus-circle-o"
                        disabled={keys.length === 1}
                        onClick={() => this.remove(k)}
                    />
                </FormItem>
            );
        });

        getFieldDecorator('keyscbr', { initialValue: [] });
        const keyscbr = getFieldValue('keyscbr');
        const formItemscbr = keyscbr.map((k, index) => {
            return (
                <FormItem
                    {...(formItemLayout)}
                    label={'承办人' + (index+1) + ':'}
                    required={false}
                    key={k}
                >
                    {getFieldDecorator(`namescbr-${k}`, {
                        validateTrigger: ['onChange', 'onBlur'],
                        rules: [{
                            required: true, message: "请输入承办人ID或删除这条信息.",
                        },{
                            validator: this.checkInteger,
                        }],
                    })(
                        <Input placeholder="承办人ID" style={{ width: '30%', marginRight: 8 }} />
                    )}
                    <Icon
                        className="dynamic-delete-button"
                        type="minus-circle-o"
                        disabled={keyscbr.length === 1}
                        onClick={() => this.removecbr(k)}
                    />
                </FormItem>
            );
        });

        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem
                    {...formItemLayout}
                    label="公文ID"
                    hasFeedback
                >
                    {getFieldDecorator('swid', {
                        rules: [{
                            required: true, message: '请输入公文ID!',
                        },{
                            validator: this.checkInteger,
                        }],
                    })(
                        <Input placeholder="公文ID" style={{ width: '30%', marginRight: 8 }} />
                    )}
                </FormItem>
                {formItems}
                <FormItem {...formItemLayoutWithOutLabel}>
                    <Button type="dashed" onClick={this.add} style={{ width: '30%' }}>
                        <Icon type="plus" /> 添加承办处室
                    </Button>
                </FormItem>

                {formItemscbr}
                <FormItem {...formItemLayoutWithOutLabel}>
                    <Button type="dashed" onClick={this.addcbr} style={{ width: '30%' }}>
                        <Icon type="plus" /> 添加承办人
                    </Button>
                </FormItem>


                <FormItem {...formItemLayoutWithOutLabel}>
                    <Button type="primary" htmlType="Submit" size="large">提交反馈</Button>
                </FormItem>
            </Form>
        );
    }
}



FeedbackMain = Form.create()(FeedbackMain);
export default  FeedbackMain;