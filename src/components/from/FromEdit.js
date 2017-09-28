/**
 * Created by hldev on 17-6-14.
 */
import React, {Component} from "react";
import {Link} from "react-router-dom";
import {inject, observer} from "mobx-react";
import {Form, Input, Select, Row, Col, Button, Card, Radio, Spin} from 'antd';
import HlBreadcrumb from "../common/HlBreadcrumb";
import Panel, {PanelBody, PanelHeader} from '../common/Panel';
import Utils from "../../utils/util"

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

@inject("store")
@observer
class FromEdit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
    this.roomState = this.props.store.roomState;
  }

  componentWillMount() {

    if (!this.isAdd()) {
      this.roomState.getRoom(this.props.match.params.id);
    }
  }

  isAdd = () => this.props.match.params.id === 'add';

  handClick = (event) => {
    window.history.back();
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const history = this.props.history;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (err) {
        // XXX logging
        return;
      }

      this.setState({loading: true});
      let future;
      if (this.isAdd()) { //新增
        future = this.roomState.createRoom(values)
          .then((data) => {
            Utils.goBack();
          })
          .catch(()=>{

          })
        // .then((data) => history.push({pathname: `/roomMain/${data.roomId}`}));
      } else {
        values.roomId = this.props.match.params.id;
        future = this.roomState.updataRoom(values)
          .then((data) => {
            Utils.goBack();
          })
          .catch(()=>{

          })

      }
      future.then(_ => this.setState({loading: false}), _ => this.setState({loading: false}));
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
      path: '/roomMain', name: '机房管理'
    }, {
      name: this.isAdd() ? '添加机房' : '编辑机房'
    }];

    return (
      <div className="content-main">
        <HlBreadcrumb breadcrumb={breadcrumb}/>
        <Panel>
          <PanelBody>
            <Spin spinning={this.state.loading}>
              <Form onSubmit={this.handleSubmit}>
                {/*<FormItem label="机房编号"
                 hasFeedback>
                 {getFieldDecorator('roomId', {
                 rules: [{
                 required: true, message: '请输入机房位置!',
                 }],
                 initialValue: this.isAdd() ? "" : this.roomState.room.roomId
                 })(
                 <Input />
                 )}
                 </FormItem>*/}
                <FormItem label="机房位置"
                          hasFeedback>
                  {getFieldDecorator('address', {
                    rules: [{
                      required: true, message: '请输入机房位置!',
                    }],
                    initialValue: this.isAdd() ? "" : this.roomState.room.address
                  })(
                    <Input/>
                  )}
                </FormItem>
                <FormItem label="备注信息"
                          hasFeedback>
                  {getFieldDecorator('description', {
                    rules: [{
                      required: true, message: '请输入备注信息!',
                    }],
                    initialValue: this.isAdd() ? "" : this.roomState.room.description
                  })(
                    <Input/>
                  )}
                </FormItem>

                <FormItem label="机房状态"
                          hasFeedback>
                  {getFieldDecorator('status', {
                    rules: [{
                      required: true, message: '请选择机房状态!',
                    }],
                    initialValue: this.isAdd() ? "" : this.roomState.room.status + ''
                  })(
                    <RadioGroup>
                      <Radio value="0">未使用</Radio>
                      <Radio value="1">使用中</Radio>
                    </RadioGroup>
                  )}
                </FormItem>

                <FormItem>
                  <Button onClick={this.handClick}>取消</Button>
                  <Button type="primary" htmlType="submit">确认</Button>
                </FormItem>
              </Form>
            </Spin>
          </PanelBody>
        </Panel>
      </div>
    )
  }
}

FromEdit = Form.create()(FromEdit);
export default FromEdit;
