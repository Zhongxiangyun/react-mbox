/**
 * Created by hldev on 17-6-14.
 */
import React, {Component} from "react";
import {Link} from "react-router-dom";
import {inject, observer} from "mobx-react";
import {Row, Col, Input, Button, Card, Table, Icon, Form, Alert} from 'antd';
import HlPagination from "../common/HlPagination"
import HlBreadcrumb from "../common/HlBreadcrumb";
import Panel, {PanelBody, PanelHeader} from '../common/Panel';
const FormItem = Form.Item;



const columns = [{
  title: 'Name',
  dataIndex: 'name',
}, {
  title: 'Age',
  dataIndex: 'age',
}, {
  title: 'Address',
  dataIndex: 'address',
}];

const data = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    name: `欧阳晓晓 ${i}`,
    age: 22,
    address: `海洋大道 no. ${i}`,
  });
}




@inject("store")
@observer
class FromMain extends Component {


  constructor(props) {
    super(props);

  }

  componentDidMount() {

  }

  state = {
    selectedRowKeys: [],  // Check here to configure the default column
    loading: false,
    searchText: '',
  };
  start = () => {
    this.setState({ loading: true });
    // ajax request after empty completing
    setTimeout(() => {
      this.setState({
        selectedRowKeys: [],
        loading: false,
      });
    }, 1000);
  };

  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  };

  onInputChange = (e) => {
    this.setState({searchText: e.target.value});
  };

  onSearch = (e) => {
    console.log('输入的值', this.state.searchText);
    console.log('this', this);
    console.log(' e.target.value==========', e);
    console.log(' e.target.value==========', e.target.value);
    //console.log('obj============',obj);
    //console.log('that=============', that);
  };



  render() {

    const breadcrumb = [{
      path: '/', name: '首页'
    }, {
      name: '关键词管理'
    }];
    const { loading, selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;



    return (
      <div className="content-main">
        <HlBreadcrumb breadcrumb={breadcrumb}/>
        <Panel>

          <PanelBody>
            <Alert
              message="Alert警告提示"
              description="Success Description Success Description Success Description"
              type="success"
            />
            <div style={{ marginBottom: 16 }}>
                  <Button
                    type="primary"
                    onClick={this.start}
                    disabled={!hasSelected}
                    loading={loading}
                  >
                    Reload
                  </Button>
                  <span style={{ marginLeft: 8 }}>
                {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
              </span>

              <Button type="primary" style={{float: 'right'}} onClick={this.onSearch.bind(this)}>搜索</Button>
              <Input
                ref={ele => this.searchInput = ele}
                placeholder="请输入用户名称"
                value={this.state.searchText}
                onChange={this.onInputChange}
                onPressEnter={this.onSearch.bind(this)}
                style={{width:'50%',float: 'right'}}
              />
            </div>

            <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
          </PanelBody>
        </Panel>
      </div>);
  }
}

FromMain = Form.create()(FromMain);
export default  FromMain;