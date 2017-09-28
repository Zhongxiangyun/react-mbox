/**
 * Created by hldev on 17-6-14.
 */
import React, {Component} from "react";
import {Link} from "react-router-dom";
import {inject, observer} from "mobx-react";
import {Form, Input, Select, Row, Col, Button, Card} from 'antd';
import HlBreadcrumb from "../common/HlBreadcrumb";
import Panel, {PanelBody, PanelHeader} from '../common/Panel';
import Utils from "../../utils/util"
const FormItem = Form.Item;
const Option = Select.Option;

@inject("store")
@observer
class KeywordEdit extends Component {

    constructor(props) {
        super(props);
        this.keywordState = this.props.store.keywordState;
        this.topicState = this.props.store.topicState;
    }

    componentWillMount() {
        this.topicState.getTopicList();
        if (!this.isAdd()) {
            const keywordId = this.props.match.params.id;
            this.keywordState.getKeyword(keywordId);
            this.keywordState.getKeywordTopicList(keywordId);
        }
    }

    isAdd = () => this.props.match.params.id === 'add';

    handClick = (event) => {
        window.history.back();
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                if (this.isAdd()) {
                    for (const topicId of values.topicIds) {
                        this.keywordState.createKeyword({keyword: values.keyword, topicId: topicId});
                    }
                } else {
                    values.id = this.props.match.params.id;
                    this.keywordState.updataKeyword(values);
                }
                Utils.goBack();
            }
        });
    };

    selectOption = (data) => {
        return (data || []).map(item => <Option key={item.id} value={item.id}>{item.name}</Option>);
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

        const breadcrumb = [{
            path: '/', name: '首页'
        }, {
            path: '/keyword', name: '关键词管理'
        }, {
            name: '关键词明细'
        }];

        return (
            <div className="content-main">
                <HlBreadcrumb breadcrumb={breadcrumb}/>
                <Panel>
                    <PanelBody>
                        <Form onSubmit={this.handleSubmit}>
                            <FormItem label="关键词"
                                      hasFeedback>
                                {getFieldDecorator('name', {
                                    rules: [{
                                        required: true, message: '请输入关键词!',
                                    }],
                                    initialValue: this.isAdd() ? "" : this.keywordState.keyword.name
                                })(
                                    <Input />
                                )}
                            </FormItem>
                            <FormItem label="主题">
                                {getFieldDecorator('topicIds', {
                                    rules: [{required: true, message: '请输入主题!'}],
                                    initialValue: this.keywordState.keywordTopicList.map(item => item.id)
                                })(
                                    <Select mode="multiple">
                                        {this.selectOption(this.topicState.topicList)}
                                    </Select>
                                )}
                            </FormItem>
                            <FormItem>
                                <Button onClick={this.handClick}>取消</Button>
                                <Button type="primary" htmlType="submit">确认</Button>
                            </FormItem>
                        </Form>
                    </PanelBody>
                </Panel>
            </div>
        )
    }
}

KeywordEdit = Form.create()(KeywordEdit);
export default  KeywordEdit;