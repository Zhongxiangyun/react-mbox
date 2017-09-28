/**
 * Created by Administrator on 2017/9/26 0026.
 */
/**
 * Created by hldev on 17-6-14.
 * 机柜管理
 */
import React, {Component} from "react";
import {Link} from "react-router-dom";
import {inject, observer} from "mobx-react";
import {Button, Col, Form, Dropdown, Input, Row, Table, Tag, Menu, Icon, Modal} from 'antd';
import HlPagination from "../common/HlPagination";
import HlBreadcrumb from "../common/HlBreadcrumb";
import Panel, {PanelBody, PanelHeader} from '../common/Panel';

const confirm = Modal.confirm;

@inject("store")
@observer
class HostMain extends Component {

  constructor(props) {
    super(props);
    this.hostState = this.props.store.hostState;
    this.cabinetState = this.props.store.cabinetState;
  }

  state = {
    params: {},
    selectedRowKeys: [],
    loading: false,
    selectedRows: []
  };

  componentDidMount() {
    //this.topicState.getTopicPage();
  }







  render() {

    const renderContent = (value, row, index) => {
      const obj = {
        children: value,
        props: {},
      };
      if (index === 4) {
        obj.props.colSpan = 0;
      }
      return obj;
    };

    const columns = [{
      title: 'Name',
      dataIndex: 'name',
      render: (text, row, index) => {
        if (index < 4) {
          return <a href="#">{text}</a>;
        }
        return {
          children: <a href="#">{text}</a>,
          props: {
            colSpan: 5,
          },
        };
      },
    }, {
      title: 'Age',
      dataIndex: 'age',
      render: renderContent,
    }, {
      title: 'Home phone',
      colSpan: 2,
      dataIndex: 'tel',
      render: (value, row, index) => {
        const obj = {
          children: value,
          props: {},
        };
        if (index === 2) {
          obj.props.rowSpan = 2;
        }
        // These two are merged into above cell
        if (index === 3) {
          obj.props.rowSpan = 0;
        }
        if (index === 4) {
          obj.props.colSpan = 0;
        }
        return obj;
      },
    }, {
      title: 'Phone',
      colSpan: 0,
      dataIndex: 'phone',
      render: renderContent,
    }, {
      title: 'Address',
      dataIndex: 'address',
      render: renderContent,
    }];

    const data = [{
      key: '1',
      name: 'John Brown',
      age: 32,
      tel: '0571-22098909',
      phone: 18889898989,
      address: 'New York No. 1 Lake Park',
    }, {
      key: '2',
      name: 'Jim Green',
      tel: '0571-22098333',
      phone: 18889898888,
      age: 42,
      address: 'London No. 1 Lake Park',
    }, {
      key: '3',
      name: 'Joe Black',
      age: 32,
      tel: '0575-22098909',
      phone: 18900010002,
      address: 'Sidney No. 1 Lake Park',
    }, {
      key: '4',
      name: 'Jim Red',
      age: 18,
      tel: '0575-22098909',
      phone: 18900010002,
      address: 'London No. 2 Lake Park',
    }, {
      key: '5',
      name: 'Jake White',
      age: 18,
      tel: '0575-22098909',
      phone: 18900010002,
      address: 'Dublin No. 2 Lake Park',
    }];


    const {getFieldDecorator} = this.props.form;

    const operations = (
      <Menu>
        <Menu.Item key="2">
          <p onClick={this.showConfirm} datatype="remove">
            移除主机
          </p>
        </Menu.Item>
        <Menu.Item key="3">
          <p onClick={this.showConfirm} datatype="delete">
            删除主机
          </p>
        </Menu.Item>
        <Menu.Item key="4">
          <p onClick={this.showConfirm} datatype="restart">
            启用主机
          </p>
        </Menu.Item>
        <Menu.Item key="5">
          <p onClick={this.showConfirm} datatype="forbid">
            禁用主机
          </p>
        </Menu.Item>
      </Menu>
    );


    const breadcrumb = [{
      path: '/',
      name: '首页'
    }, {
      name: '机柜管理'
    }];

    return (
      <div className="content-main">
        <HlBreadcrumb breadcrumb={breadcrumb}/>
        <Panel>
          <PanelHeader>
            <Row className="fgw-pull-right search-host-num">
              <Col>
                <Input.Search
                  placeholder="输入主机编号进行搜索"
                  onSearch={value => {
                    this.setState({params: {keyword: value}});
                    this.hostState.getHostPage({keyword: value})
                  }}
                />
              </Col>
            </Row>
            <Dropdown
              trigger={["click"]}
              overlay={operations}
              disabled={true}
            >
              <Button type='primary' >
                服务操作<Icon type="down"/>
              </Button>
            </Dropdown>
            <Link to={`/hostMain/add`} style={{marginLeft:15}}>
              <Button type='primary' htmlType="submit">添加</Button>
            </Link>

          </PanelHeader>

          <PanelBody>
            <div>
              <Table columns={columns} dataSource={data} bordered />
            </div>

          </PanelBody>
        </Panel>
      </div>);
  }
}

HostMain = Form.create()(HostMain);
export default  HostMain;