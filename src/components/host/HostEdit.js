/**
 * Created by Administrator on 2017/9/26 0026.
 */
/**
 * Created by hldev on 17-6-14.
 */
import React, {Component} from "react";
import {Link} from "react-router-dom";
import {inject, observer} from "mobx-react";
import {Form, Input, Select, Row, Col, Button, Card, InputNumber, Radio, Modal, Spin} from 'antd';
import HlBreadcrumb from "../common/HlBreadcrumb";
import Panel, {PanelBody, PanelHeader} from '../common/Panel';
import Utils from "../../utils/util"

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

@inject("store")
@observer
class HostEdit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
    this.hostState = this.props.store.hostState;
  }

  componentWillMount() {
    /*this.hostState.getCabinetList();
    if (!this.isAdd()) {
      this.hostState.getHosts(this.props.match.params.id);
    }*/
  }

  isAdd = () => this.props.match.params.id === 'add';

  handClick = (event) => {
    window.history.back();
  };



  isUNumb = (obj) => {
    //根据cabinetId 找到对应的机柜的总的U位数
    //然后对比两个U位和机柜U位之间的关系
    const cabinetList = this.hostState.cabinetList;
    if (!cabinetList || cabinetList.length === 0) {
      return [];
    }
    const cabinet = cabinetList.find(item => item.cabinetId === obj.cabinetId);

    if (obj.startNum > cabinet.unum) {
      Modal.error({
        title: '错误消息',
        content: `开始U位数不能大于机柜的U位数${cabinet.unum}`
      });
      return;

    }
    if (obj.endNum > cabinet.unum) {
      Modal.error({
        title: '错误消息',
        content: `结束U位数不能大于机柜的U位数${cabinet.unum}`
      });
      return;
    }

    if (obj.startNum > obj.endNum) {
      Modal.error({
        title: '错误消息',
        content: `开始U位数不能大于结束U位数`
      });
      return;
    }
    if (obj.startNum <= cabinet.unum && obj.endNum <= cabinet.unum && obj.startNum <= obj.endNum) {
      //处理添加和修改的区别
      this.setState({loading: true});
      let future;
      if (!this.isAdd()) { //修改操作
        future = this.hostState.updateHost(obj)
        //.then((data) => history.push({pathname: `/hostMain`}));
          .then((data) => {
            Utils.goBack();
          })
          .catch(()=>{

          })
      } else {
        future = this.hostState.createHost(obj)
          .then((data) => {
            Utils.goBack();
          })
          .catch(()=>{

          })
        //.then((data) => history.push({pathname: `/hostMain`}));
      }
      future.then( _ => this.setState({loading: false}));
    }
  };


  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        if (this.isAdd()) { //新增/api/cabinet
          //验证主机的开始U位数和结束U位数不能大于 机柜的总的U位数
          this.isUNumb(values)
          //this.hostState.createHost(values);
        } else {
          console.log('修改主机参数: ', values);
          this.isUNumb(values);
          //this.hostState.updateHost(values); //修改
        }

      }
    });
  };


  checkAccount = (rule, value, callback) => {
    let re = /^[0-9]+$/;
    if (re.test(value) && value > 0 && value < 100000) {
      callback();
    } else {
      callback('功率为大于0小于100000的整数');
    }
  };


  renderOptions = () => {
    const cabinetList = this.hostState.cabinetList;
    if (!cabinetList || cabinetList.length === 0) {
      return <Option value="暂无数据" key='-1'>暂无数据</Option>
    }
    return cabinetList.map((doc, idx) => <Option key={idx} value={doc.cabinetId}>{doc.name}——{doc.cabinetId}</Option>);
  };

  render() {
    const {getFieldDecorator} = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: {span: 7},
        sm: {span: 6},
      },
      wrapperCol: {
        xs: {span: 12},
        sm: {span: 14},
      },
    };


    const breadcrumb = [{
      path: '/', name: '首页'
    }, {
      path: '/hostMain', name: '主机管理'
    }, {
      name: this.isAdd() ? '添加主机' : '编辑主机'
    }];

    const optionElement = this.renderOptions();

    return (
      <div className="content-main">
        <HlBreadcrumb breadcrumb={breadcrumb}/>
        <Panel>
          <PanelBody>
            <Spin spinning={this.state.loading}>
              <Form onSubmit={this.handleSubmit}>
                <Row>
                  <Col span={10}>
                    <FormItem
                      {...formItemLayout}
                      label="机柜ID"
                      hasFeedback>
                      {getFieldDecorator('cabinetId', {
                        rules: [{
                          required: true, message: '请输入机柜ID!',
                        }],
                        initialValue: this.isAdd() ? "" : this.hostState.hosts.cabinetId
                      })(
                        <Select showSearch style={{width: '16rem'}}
                                optionFilterProp="children"
                                onChange={this.handleChange}
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                placeholder="--请选择--">
                         {/* {optionElement}*/}
                        </Select>
                      )}
                    </FormItem>
                    <FormItem {...formItemLayout}
                              label="主机名"
                              hasFeedback>
                      {getFieldDecorator('hostName', {
                        rules: [{
                          required: true, max: 256, message: '请输入主机名(最多256个字符)!'
                        }],
                        initialValue: this.isAdd() ? "" : this.hostState.hosts.hostName
                      })(
                        <Input/>
                      )}
                    </FormItem>
                    <FormItem {...formItemLayout}
                              label="CPU参数"
                              hasFeedback>
                      {getFieldDecorator('cpuParameter', {
                        rules: [{
                          required: true,max: 40, message: '请输入CPU参数(最多40个字符)!',
                        }],
                        initialValue: this.isAdd() ? "" : this.hostState.hosts.cpuParameter
                      })(
                        <Input/>
                      )}
                    </FormItem>
                    <FormItem {...formItemLayout}
                              label="主机编号"
                              hasFeedback>
                      {getFieldDecorator('hostId', {
                        rules: [{
                          required: true, message: '请输入主机编号!',
                        }],
                        initialValue: this.isAdd() ? "" : this.hostState.hosts.hostId
                      })(
                        this.isAdd() ? <Input/> : <Input disabled={true}/>
                      )}
                    </FormItem>
                    <FormItem {...formItemLayout}
                              label="内存参数(GB)"
                              hasFeedback>
                      {getFieldDecorator('memoryParameter', {
                        rules: [{
                          required: true, message: '请输入内存参数!',
                        }, {
                          validator: this.checkAccount, whitespace: true,
                        }],
                        initialValue: this.isAdd() ? "" : this.hostState.hosts.memoryParameter
                      })(
                        <Input />
                      )}
                    </FormItem>
                    <FormItem {...formItemLayout}
                              label="硬盘参数(T)"
                              hasFeedback>
                      {getFieldDecorator('diskParameter', {
                        rules: [{
                          required: true, message: '请输入硬盘参数!',
                        },{
                          validator: this.checkAccount, whitespace: true,
                        }],
                        initialValue: this.isAdd() ? "" : this.hostState.hosts.diskParameter
                      })(
                        <Input />
                      )}
                    </FormItem>
                  </Col>
                  <Col span={2}>

                  </Col>

                  <Col span={10}>

                    <FormItem {...formItemLayout}
                              label="起始U位"
                              hasFeedback>
                      {getFieldDecorator('startNum', {
                        rules: [{
                          required: true, message: '请输入起始U位!',
                        }],
                        initialValue: this.isAdd() ? "" : this.hostState.hosts.startNum
                      })(
                        <InputNumber
                          min={1}
                          max={99}
                          formatter={value => parseInt(value) || ""}
                        />
                      )}
                    </FormItem>
                    <FormItem {...formItemLayout}
                              label="终止U位"
                              hasFeedback>
                      {getFieldDecorator('endNum', {
                        rules: [{
                          required: true, message: '请输入终止U位!',
                        }],
                        initialValue: this.isAdd() ? "" : this.hostState.hosts.endNum
                      })(
                        <InputNumber

                          min={1}
                          max={99}
                          formatter={value => parseInt(value) || ""}
                        />
                      )}
                    </FormItem>



                    <FormItem {...formItemLayout}
                              label="主机状态"
                              hasFeedback>
                      {getFieldDecorator('status', {
                        rules: [{
                          required: true, message: '请选择主机状态!',
                        }],
                        initialValue: this.isAdd() ? "" : this.hostState.hosts.status + ''
                      })(
                        <RadioGroup>
                          <Radio value="0">未使用</Radio>
                          <Radio value="1">正常</Radio>
                          <Radio value="2">预警</Radio>
                        </RadioGroup>
                      )}
                    </FormItem>

                    <FormItem {...formItemLayout} label="电源参数(V)"
                              hasFeedback>
                      {getFieldDecorator('powerParameter', {
                        rules: [{
                          required: true, message: '请输入电源参数!',
                        }],
                        initialValue: this.isAdd() ? "" : this.hostState.hosts.powerParameter
                      })(
                        <InputNumber
                          min={1}
                          max={100000}
                          formatter={value => parseInt(value) || ''}
                        />
                      )}
                    </FormItem>

                    <FormItem {...formItemLayout}
                              label="主板参数"
                              hasFeedback>
                      {getFieldDecorator('motherBoardParameter', {
                        rules: [{
                          required: true, max: 256, message: '请输入主板参数(最多256字符)!'
                        }],
                        initialValue: this.isAdd() ? "" : this.hostState.hosts.motherBoardParameter
                      })(
                        <Input/>
                      )}
                    </FormItem>
                  </Col>
                </Row>


                <FormItem style={{textAlign: 'center'}}>
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

HostEdit = Form.create()(HostEdit);
export default HostEdit;