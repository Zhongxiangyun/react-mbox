/**
 * Created by hldev on 17-5-23.
 */
import React, {Component} from "react";

import WebsiteMain from "./components/website/WebsiteMain";
import WebsiteEdit from "./components/website/WebsiteEdit";
import TopicMain from "./components/topic/TopicMain";
import TopicEdit from "./components/topic/TopicEdit";


import Login from "./components/user/Login"
import Register from "./components/user/Register"
import UserMain from "./components/user/UserMain"
import SearchConfig from "./components/user/SearchConfig"
import HlPagination from "./components/common/TestPage"
import SearchMain from "./components/search/SearchMain";
import TopicShowMain from './components/topic/TopicShowMain';
import ClusterMain from './components/cluster/ClusterMain';
import CabinetMain from './components/cabinet/CabinetMain';
import HostMain from './components/host/HostMain';
import HostEdit from './components/host/HostEdit';
import KeywordMain from "./components/keyword/KeywordMain";
import KeywordEdit from "./components/keyword/KeywordEdit";
import FromMain from "./components/from/FromMain";
import FromEdit from "./components/from/FromEdit";
import ImgShow from "./components/img/ImgShow";

const routes = [
    {
        path: '/topicShow',
        protected: 'no',
        component: TopicShowMain
    },

    /*搜索设置SearchMain*/
    {
        path: '/search',
        protected: 'yes',
        component: SearchMain,
    },
    /*网站*/
    {
        path: '/website',
        protected: 'yes',
        component: WebsiteMain,
    },
    {
        path: '/website/:id',
        protected: 'yes',
        component: WebsiteEdit,
    },
    /*主题*/
    {
        path: '/topic',
        protected: 'yes',
        component: TopicMain,
    },
    {
        path: '/topic/:id',
        protected: 'yes',
        component: TopicEdit,
    },
    // /*关键词*/
    {
        path: '/keywordMain',
        protected: 'no',
        component: KeywordMain,
    },
    {
        path: '/keywordMain/:id',
        protected: 'no',
        component: KeywordEdit,
    },
    /*用户*/
    {
        path: '/login',
        protected: 'no',
        component: Login,
    },
    {
        path: '/register',
        protected: 'no',
        component: Register,
    },

    /**
     * 用户个人相关
     */
    {
        path: '/user/profile',
        protected: 'yes',
        component: UserMain,
    },
    {
        path: '/user/search_config',
        protected: 'yes',
        component: SearchConfig
    },

    {
        path: '/page',
        protected: 'no',
        component: HlPagination,
    },

    /**
     * 集群管理和机柜管理
     */
    {
        path:'/clusterMain',//集群
        protected: 'no',
        component: ClusterMain
    },
    {
        path:'/cabinetMain',//机柜
        protected: 'no',
        component: CabinetMain
    },
  {
    path:'/hostMain',//主机
    protected: 'no',
    component: HostMain
  },
  {
    path: '/hostMain/:id',//主机添加和编辑
    protected: 'no',
    component: HostEdit
  },
  {
    path:'/formMain',//表单组件列表
    protected: 'no',
    component: FromMain
  },
  {
    path: '/fromMain/:id',//表单组件编辑
    protected: 'no',
    component: FromEdit
  },
  {
    path: '/imgShow',//图片展示
    protected: 'no',
    component: ImgShow
  },

];

export default routes