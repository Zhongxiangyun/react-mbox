/**
 * Created by Administrator on 2017/6/20 0020.
 * 机柜管理
 */
import {observable, action} from "mobx";
import {request} from "../utils/axios"

export default class HostState {

  @observable hostPage;
  @observable hosts;
  //机柜列表
  @observable cabinetList;

  constructor() {
    this.hostPage = [];
    this.cabinetList = [];
    this.hosts = {};

  }

  /**
   * ******************************function******************************
   * */

  /**
   * 分页查询所有的主机
   * */
  async getHostPage(params) {

    const {data} = await request(
      {method: 'get', url: `/api/host/page`, params},
      {},
      {message: '获取主机列表失败'},
    );
    this.setHostPage(data);
  }

  /**
   * 根据id获取主机详情
   * */
  async getHosts(hostId) {
    const {data} = await request(
      {method: 'get', url: `/api/host/${hostId}`},
      {},
      {message: '获取主机详情失败'},
    );
    this.setHosts(data);
  }

  /**
   * 创建主机
   * */
  async createHost(value) {
    const {data} = await request(
      {
        method: 'post',
        url: '/api/host',
        data: value
      },
      {message: '添加成功'},
      {message: '添加失败'},
    );
    this.getHostPage();
  }

  /**
   * 修改主机
   * */
  async updateHost(value) {
    const {data} = await request(
      {
        method: 'put',
        url: '/api/host',
        data: value
      },
      {message: '保存成功'},
      {message: '保存失败'},
    );
    this.setHosts(data);
  }

  /**
   * 根据主机Id删除主机
   * */
  async deleteHost(hostId) {
    const {data} = await request(
      {method: 'DELETE', url: `/api/host/${hostId}`},
      {message: '删除成功'},
      {message: '删除失败'},
    );
    this.setHosts(data);
    this.getHostPage()
  }

  /**
   * 根据主机Id删除主机与机柜的关机
   * */
  async deleteRemoveHost(hostId) {
    const {data} = await request(
      {method: 'DELETE', url: `/api/host/${hostId}/remove`},
      {message: '移除成功'},
      {message: '移除失败'},
    );
    this.setHosts(data);
    this.getHostPage()
  }

  /**
   * 查找所有机柜
   * */
  async getCabinetList() {
    const {data} = await request(
      {method: 'get', url: `/api/cabinet/list`,},
      {},
      {message: '获取所有机柜列表失败'},
    );
    this.setCabinetList(data);
  }

  /**
   * 主机启用禁用
   * */
  async updateHostStatus(hostId, value, params) {
    const {data} = await request(
      {
        method: 'put',
        url: `/api/host/${hostId}/status?status=${value.status}`,
        data: value
      },
      {message: '保存成功'},
      {message: '保存失败'},
    );
    this.setHosts(data);
    this.getHostPage({page: this.hostPage.number + 1, size: this.hostPage.size, ...params});
  }

  /**
   * ******************************action******************************
   * */

  @action
  setHostPage(data) {
    this.hostPage = data;
  }

  @action
  setHosts(data) {
    this.hosts = data;
  }

  @action
  setCabinetList(data) {
    this.cabinetList = data;
  }

  /**
   * ******************************computed******************************
   * */
}
