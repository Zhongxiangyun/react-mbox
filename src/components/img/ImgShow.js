/**
 * Created by Administrator on 2017/9/28 0028.
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
class ImgShow extends Component {


  constructor(props) {
    super(props);

  }

  componentDidMount() {

  }


  render() {

    const breadcrumb = [{
      path: '/', name: '首页'
    }, {
      name: '图片展示效果'
    }];

    return (
      <div className="content-main">
        <HlBreadcrumb breadcrumb={breadcrumb}/>
        <Panel>

          <PanelBody>
            <img src="/static/image/react.png" alt="react image" style={{maxWidth: '100%'}}/>
          </PanelBody>
        </Panel>
      </div>);
  }
}

ImgShow = Form.create()(ImgShow);
export default  ImgShow;