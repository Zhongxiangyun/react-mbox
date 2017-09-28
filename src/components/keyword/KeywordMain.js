/**
 * Created by hldev on 17-6-14.
 */
import React, {Component} from "react";
import {Link} from "react-router-dom";
import {inject, observer} from "mobx-react";
import ReactEchart from "../echart/ReactEchart";
import {Row, Col, Input, Button, Card, Table, Icon, Form, Select} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

@inject("store")
@observer
class KeywordMain extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    option: "bar1",
  };

  option = (option) => {
    switch (option) {
      case "bar1":
        return ({
          style: {
            width: '100%',
            textAlign: "center",
            height: '700px',
          },
          option: {
            tooltip: {
              trigger: 'axis',
              axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
              }
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            xAxis: {
              type: 'value'
            },
            yAxis: {
              type: 'category',
              data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            },
            series: [
              {
                name: '直接访问',
                type: 'bar',
                stack: '总量',
                label: {
                  normal: {
                    show: true,
                    position: 'insideRight'
                  }
                },
                data: [320]
              },
              {
                name: '邮件营销',
                type: 'bar',
                stack: '总量',
                label: {
                  normal: {
                    show: true,
                    position: 'insideRight'
                  }
                },
                data: [120]
              },
              {
                name: '联盟广告',
                type: 'bar',
                stack: '总量',
                label: {
                  normal: {
                    show: true,
                    position: 'insideRight'
                  }
                },
                data: [220, 182, 191, 234, 290, 330, 310]
              },
              {
                name: '视频广告',
                type: 'bar',
                stack: '总量',
                label: {
                  normal: {
                    show: true,
                    position: 'insideRight'
                  }
                },
                data: [150, 212, 201, 154, 190, 330, 410]
              },
              {
                name: '搜索引擎',
                type: 'bar',
                stack: '总量',
                label: {
                  normal: {
                    show: true,
                    position: 'insideRight'
                  }
                },
                data: [820, 832, 901, 934, 1290, 1330, 1320]
              }
            ]
          }
        });
      case "bar2":
        return ({
          style: {
            width: '100%',
            textAlign: "center",
            height: '400px',
          },
          option: {
            tooltip: {
              trigger: 'axis',
              axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
              }
            },
            legend: {
              data: ['利润', '支出', '收入']
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            xAxis: [
              {
                type: 'value'
              }
            ],
            yAxis: [
              {
                type: 'category',
                axisTick: {show: false},
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
              }
            ],
            series: [
              {
                name: '利润',
                type: 'bar',
                label: {
                  normal: {
                    show: true,
                    position: 'inside'
                  }
                },
                data: [200, 170, 240, 244, 200, 220, 210]
              },
              {
                name: '收入',
                type: 'bar',
                stack: '总量',
                label: {
                  normal: {
                    show: true
                  }
                },
                data: [320, 302, 341, 374, 390, 450, 420]
              },
              {
                name: '支出',
                type: 'bar',
                stack: '总量',
                label: {
                  normal: {
                    show: true,
                    position: 'left'
                  }
                },
                data: [-120, -132, -101, -134, -190, -230, -210]
              }
            ]
          }
        });
    }

  };

  render() {

    const columns = [{
      title: '',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '2016-11',
      dataIndex: '2016-11',
      key: '2016-11',
    }, {
      title: '2016-12',
      dataIndex: '2016-12',
      key: '2016-12',
    }, {
      title: '2017-01',
      dataIndex: '2017-01',
      key: '2017-01',
    }, {
      title: '2017-02',
      dataIndex: '2017-02',
      key: '2017-02',
    }, {
      title: '2017-03',
      dataIndex: '2017-03',
      key: '2017-03',
    }, {
      title: '2017-04',
      dataIndex: '2017-04',
      key: '2017-04',
    }, {
      title: '2017-05',
      dataIndex: '2017-05',
      key: '2017-05',
    },];

    const {getFieldDecorator} = this.props.form;

    return (
      <div id="enterpriseMain">
        <Row type="flex" justify="start">
          <Col span={4}>
            <div className={`fgw-tab${this.state.option === "bar1" ? "-select" : ""}`}
                 onClick={() => this.setState({option: "bar1"})}>

              <p>企业信息分类</p>
              {this.state.option === "bar1" ? <div className="fgw-arrow"></div> : null}
            </div>
            <div className={`fgw-tab${this.state.option === "bar2" ? "-select" : ""}`}
                 onClick={() => this.setState({option: "bar2"})}>
              <p>上市公司信息</p>
              {this.state.option === "bar2" ? <div className="fgw-arrow"></div> : null}
            </div>
          </Col>
          <Col span={16}>
            <Card style={{margin: '20px'}}>
              {this.state.option === "bar1" ? <div>
                <Form layout="inline">
                  <FormItem label="公司类型">
                    {getFieldDecorator('area', {
                      initialValue: "全国"
                    })(
                      <Select style={{width:'8rem'}}>
                        <Option value="全国">全国</Option>
                        <Option value="西部地区">西部地区</Option>
                        <Option value="西南地区">西南地区</Option>
                        <Option value="自定义地区">自定义地区</Option>
                      </Select>
                    )}
                  </FormItem>
                  <ReactEchart option={this.option("bar1")}/>
                </Form>
              </div> : null}
              {this.state.option === "bar2" ? <div>
                <Form layout="inline">
                  <FormItem label="财务指标">
                    {getFieldDecorator('target', {
                      initialValue: "china"
                    })(
                      <Select>
                        <Option value="china">固定资产投资（不含农户)</Option>
                        <Option value="use">房地产投资</Option>
                      </Select>
                    )}
                  </FormItem>
                  <FormItem label="季报">
                    {getFieldDecorator('time', {
                      initialValue: "最近3个月"
                    })(
                      <Select>
                        <Option value="最近3个月">最近3个月</Option>
                        <Option value="最近6个月">最近6个月</Option>
                        <Option value="最近12个月">最近12个月</Option>
                      </Select>
                    )}
                  </FormItem>
                </Form>
                <ReactEchart option={this.option("bar2")}/>
                <Table columns={columns} dataSource={[]} pagination={false}/>
              </div> : null}
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

KeywordMain = Form.create()(KeywordMain);
export default  KeywordMain;