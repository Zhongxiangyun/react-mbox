import {observable, action} from "mobx";
import {request} from "../utils/axios"

export default class UserState {

    @observable user;

    constructor() {
        this.user = {};
    }

    async login(value) {
        const {data} = await request(
            {method: 'post', url: '/sign/signin', data: value},
            {message: '登录成功'},
            {message: '登录失败'},
        );
        this.setUser(data);
    }

    async getCurrentUser() {
        const {data} = await request(
            {method: 'get', url: '/api/user'},
            {},
            {},
        );
        this.setUser(data);
    }

    register(value) {
        request(
            {method: 'post', url: '/sign/signup', data: value},
            {message: '注册成功'},
            {message: '注册失败'},
        );
    }

    //修改一条新的数据
    async updataUser(value) {
        const {data} = await request(
            {
                method: 'put',
                url: '/api/user',
                data: value
            },
            {message: '保存成功'},
            {message: '保存失败'},
        );
        this.setUser(data);

    }

    async signout() {
        const {data} = request(
            {method: 'delete', url: '/sign/signout'},
            {},
            {},
        );
        this.setUser({});
        return data;
    }

    @action setUser(data) {
        this.user = data;
    }
}