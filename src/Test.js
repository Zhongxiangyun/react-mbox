/**
 * Created by hldev on 17-6-14.
 */
import React, {Component} from "react";
import {Link} from "react-router-dom";
import {inject, observer} from "mobx-react";
import {Row, Col, Input, Button, Card, Table, Icon, Form, Popconfirm} from 'antd';
import HlPagination from "../common/HlPagination"
import HlBreadcrumb from "../common/HlBreadcrumb";
import Panel, {PanelBody, PanelHeader} from '../common/Panel';
const FormItem = Form.Item;

@inject("store")
@observer
class Test extends Component {


  constructor(props) {
    super(props);

  }

  componentDidMount() {

  }


  render() {

    const breadcrumb = [{
      path: '/', name: '首页'
    }, {
      name: '关键词管理'
    }];

    return (
      <div className="content-main">
        <HlBreadcrumb breadcrumb={breadcrumb}/>
        <Panel>

          <PanelBody>

          </PanelBody>
        </Panel>
      </div>);
  }
}

Test = Form.create()(Test);
export default  Test;