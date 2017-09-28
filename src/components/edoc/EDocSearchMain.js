import React, {Component} from "react";
import {Route, Link, Redirect} from "react-router-dom";
import {inject, observer} from "mobx-react";
import createHistory from 'history/createBrowserHistory'
import {Table, Icon, Pagination, Button, Input} from 'antd';
import lodashIsEqual from 'lodash/isEqual'
import HlBreadcrumb from "../common/HlBreadcrumb";
import Panel, {PanelBody, PanelHeader} from '../common/Panel';

const Search = Input.Search;

@inject("store")
@observer
export default class EDocSearchMain extends Component {

    constructor(props) {
        super(props);
        this.state = {
            params: {
                page: 1,
                size: 10,
                word: undefined
            }
        };
        this.edocState = this.props.store.edocState;
    }

    // componentWillMount() {
    //     this.edocState.getFilePage()
    // }

    componentDidUpdate(_, prevState) {
        if (!lodashIsEqual(prevState.params, this.state.params)) {
            this.edocState.getFilePage(this.state.params);
        }
    }

    setParams = (value) => {
        const params = {...this.state.params, ...value};
        if (!lodashIsEqual(params, this.state.params)) {
            this.setState({params});
        }
    };

    handleShowSizeChange = (value) => {
        this.setParams({size: value});
    };

    handleSearch = (value) => {
        this.setParams({word: value});
    };

    render() {
        const filePage = this.edocState.filePage;

        const columns = [{
            title: '文件名',
            dataIndex: 'fileName',
            key: 'fileName',
            render: (text, record) => {
                return (
                    <div>
                        <div>
                            <a href={`/api/e_doc/file/${record.sha}`}>
                                <div className="search-content" dangerouslySetInnerHTML={{__html: text}}/>
                            </a>
                        </div>
                        <div>
                            <small>{record.keywords.join(', ')}</small>
                        </div>
                    </div>);
            }
        }, {
            title: '摘要',
            dataIndex: 'summary',
            key: 'summary',
            render: (text) => <div className="search-content"
                                   dangerouslySetInnerHTML={{__html: text}}
                                   style={{maxWidth: '50rem'}}/>
        }, {
            title: '文件类型',
            dataIndex: 'format',
            key: 'format',
        }, {
            title: '大小（字节）',
            dataIndex: 'size',
            key: 'size',
            render: (item) => <div style={{textAlign: 'right'}}>{item}</div>
        }];

        const paginationProps = {
            onShowSizeChange: this.handleShowSizeChange,
            total: filePage.totalElements || 0,
            current: filePage.page || 1,
            pageSize: filePage.pageSize || 10,
            onChange: page => this.setParams({page: page})
        };

        const dataSource = (filePage.content || []).map(item => ({...item, key: item.sha}));

        const breadcrumb = [{
            path: '/', name: '首页'
        }, {
            name: '电子文档检索'
        }];

        return (
            <div className="content-main">
                <HlBreadcrumb breadcrumb={breadcrumb}/>
                <Panel>
                    <PanelHeader>
                        <Link to="/edoc_upload" className="fgw-pull-right">上传文档</Link>
                        <Search placeholder="输入搜索词检索电子文档"
                                style={{width: '20rem'}}
                                onSearch={this.handleSearch}/>
                    </PanelHeader>
                    <PanelBody className="edoc-search-panel">
                        <Table bordered={true}
                               size="small"
                               columns={columns}
                               dataSource={dataSource}
                               pagination={false}/>
                        <div style={{height: '14px'}}/>
                        <Pagination {...paginationProps}/>
                    </PanelBody>
                </Panel>
            </div>
        )
    }
}