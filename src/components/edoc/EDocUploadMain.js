import React, {Component} from "react";
import {Route, Link, Redirect} from "react-router-dom";
import {inject, observer} from "mobx-react";
import createHistory from 'history/createBrowserHistory'
import {Upload, Icon, message, Card} from "antd";
import HlBreadcrumb from "../common/HlBreadcrumb";
import Panel, {PanelBody, PanelHeader} from '../common/Panel';
const Dragger = Upload.Dragger;

@inject("store")
@observer
export default class EDocUploadMain extends Component {

    render() {
        const props = {
            name: 'file',
            multiple: true,
            showUploadList: false,
            action: '/api/e_doc',
            onChange(info) {
                const status = info.file.status;
                if (status !== 'uploading') {
                    console.log(info.file, info.fileList);
                }
                if (status === 'done') {
                    message.success(`${info.file.name} file uploaded successfully.`);
                } else if (status === 'error') {
                    message.error(`${info.file.name} file upload failed.`);
                }
            },
        };


        const breadcrumb = [{
            path: '/', name: '首页'
        }, {
            path: '/edoc_search', name: '电子文档检索'
        }, {
            name: '上传电子文档'
        }];

        return (
            <div className="content-main">
                <HlBreadcrumb breadcrumb={breadcrumb}/>
                <Panel>
                    <PanelBody>
                        <Dragger {...props}>
                            <p className="ant-upload-drag-icon">
                                <Icon type="inbox"/>
                            </p>
                            <p className="ant-upload-text">点击或拖动文件到此区域进行上传</p>
                            <p className="ant-upload-hint">支持如下文档格式：doc, xls, ppt, docx, xlsx, pptx, pdf</p>
                            <p className="ant-upload-hint">支持单次或批量上传</p>
                        </Dragger>
                    </PanelBody>
                </Panel>
            </div>
        )
    }

}