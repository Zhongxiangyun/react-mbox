/**
 * Created by hldev on 17-6-14.
 */
import React, {Component} from "react";
import {Link} from "react-router-dom";
import {inject, observer} from "mobx-react";
import {Form, Input, Select, Row, Col, Button, Card} from 'antd';
const FormItem = Form.Item;

@inject("store")
@observer
class SearchEdit extends Component {

    constructor(props){
        super(props);
        this.store = this.props.store.topicState;
    }

    componentWillMount(){
        if(!this.isAdd()){
            this.store.getTopic(this.props.match.params.id);
        }
    }


    isAdd = () => this.props.match.params.id === 'add';

    handClick = (event) =>{
        window.history.back();
    };


    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                if(this.isAdd()){
                    this.store.createTopic(values);
                }else{
                    values.id = this.props.match.params.id;
                    this.store.updataTopic(values);
                }

                /*let promise;
                 promise = this.store.createTopic(values);
                 promise.then(data => {
                 Utils.pushLink(`/topic`);
                 })*/
            }
        });
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

        return (
            <div id="websiteEdit" style={{margin: 16}}>
                <Card>
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
                                initialValue: this.isAdd()? "" : this.store.topic.name
                            })(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem {...tailFormItemLayout}>
                            <Button type="primary" htmlType="submit" size="large">确认</Button>
                            <Button type="primary" onClick={this.handClick} size="large">取消</Button>
                        </FormItem>
                    </Form>
                </Card>
            </div>
        )
    }
}

SearchEdit = Form.create()(SearchEdit);
export default  SearchEdit;